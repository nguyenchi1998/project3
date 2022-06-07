<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issue\LinkIssueRequest;
use App\Http\Requests\Project\AddProjectRequest;
use App\Http\Requests\Project\FilterIssueRequest;
use App\Http\Requests\Project\ProjectStoreRequest;
use App\Models\Issue;
use App\Models\IssueHistory;
use App\Models\Project;
use App\Models\TargetVersion;
use App\Models\Tracker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['type', 'keyword']);

        $auth = auth()->user();
        return Project::when(
            $this->checkIsDirectorPosition($auth),
            function ($query) {
                $query->get();
            },
            function ($query) use ($auth) {
                $query->whereHas('members', function ($query) use ($auth) {
                    $query->where('users.id', $auth->id);
                });
            }
        )
            ->when(isset($filters['type']), function ($query) use ($filters) {
                $query->where('type', $filters['type']);
            })
            ->when(isset($filters['keyword']), function ($query) use ($filters) {
                $query->where('name', 'like', '%' . $filters['keyword'] . '%');
            })
            ->with([
                'members' => function ($query) {
                    $query->orderBy('role', 'DESC')
                        ->orderBy('created_at', 'DESC');
                },
                'languages',
                'targetVersions',
            ])
            ->orderBy('id', 'desc')
            ->get();
    }

    private function checkIsDirectorPosition($auth)
    {
        return $auth->position === config('constant.position.director');
    }

    public function store(ProjectStoreRequest $request)
    {
        $project = Project::create($request->all());
        $project->languages()->attach($request->get('languages'));
        $project->members()->attach([
            auth()->id() => [
                'role' => config('constant.project_member_role.pm')
            ]
        ]);

        return $project->load(['members' => function ($query) {
            $query->orderBy('role', 'DESC')
                ->orderBy('created_at', 'DESC');
        }, 'languages']);
    }


    public function show($id)
    {
        $project = Project::findOrFail($id)
            ->load([
                'members' => function ($query) {
                    return $query->orderBy('role', 'DESC');
                }, 'members.group.division', 'languages',
                'customer',
                'issues.author',
                'issues.assignee',
                'issues.tracker'
            ]);

        return $project;
    }


    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $project->update($request->all());

        $project->languages()->sync($request->get('languages'));

        return $project->load(['members', 'languages']);
    }


    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        if ($project->delete()) {
            return response()->json([
                'message' => 'Success',
            ], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => 'Error',
        ], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function addMember(AddProjectRequest $request, $id)
    {
        $employeeData = $request->only(
            'role',
            'effort'
        );
        $project = Project::find($id);
        $project->members()->attach(
            $request->get('employeeId'),
            $employeeData
        );
        return $project->members()
            ->orderBy('role', 'desc')
            ->orderBy('id', 'desc')->get();
    }

    public function removeMember($projectId, $memberId)
    {
        $project = Project::find($projectId);
        $project->members()->detach($memberId);
        return $project->members()
            ->orderBy('role', 'desc')
            ->orderBy('id', 'desc')->get();
    }

    public function trackerIssuesStatistic($id)
    {
        $trackers = Tracker::with(['issues' => function ($query) use ($id) {
            $query->where('project_id', $id);
        }])->get()->toArray();
        return array_map(function ($tracker) {
            $issues = array_reduce($tracker['issues'], function ($totalIssue, $issue) {
                if ($issue['status'] === config('constant.issue_status.closed')) {
                    $totalIssue['closed'] = $totalIssue['closed'] + 1;
                } else {
                    $totalIssue['open'] = $totalIssue['open'] + 1;
                }

                return $totalIssue;
            }, ['closed' => 0, 'open' => 0, 'total' => 0]);
            $issues['total'] = count($tracker['issues']);
            $tracker['issues'] = $issues;

            return $tracker;
        }, $trackers);
    }

    public function priorityIssuesStatistic($id, Request $request)
    {
        $filters = $request->only(['trackerId']);
        $data =   Issue::where('project_id', $id)
            ->when(isset($filters['trackerId']), function ($query) use ($filters) {
                $query->where('tracker_id', $filters['trackerId']);
            })
            ->get()
            ->groupBy('priority');
        $priorities = [];
        foreach (config('constant.issue_priority') as $key => $value) {
            if (isset($data[$value])) {
                $priorities[$value] = $data[$value];
            } else {
                $priorities[$value] = [];
            }
        }

        return response()->json($priorities);
    }

    public function getMembers($id, Request $request)
    {
        $filters = $request->only(['keyword']);
        $project = Project::find($id)
            ->load(['members' => function ($query) use ($filters) {
                $query->when(isset($filters['keyword']), function ($query) use ($filters) {
                    $query->where('name', 'like', '%' . $filters['keyword'] . '%');
                })->orderBy('role', 'desc')->orderBy('id', 'desc');
            }]);
        if ($request->groupByRole) {
            return  $project->members->groupBy('pivot.role');
        }

        return $project->members;
    }

    public function findMember($projectId, $memberId)
    {
        $member = User::where('id', $memberId)
            ->whereHas('projects', function ($query) use ($projectId) {
                $query->where('project_id', $projectId);
            })->first();

        return $member;
    }

    public function updateMember($id, $memberId, Request $request)
    {
        $updateData = $request->only(['effort', 'role']);
        $project = Project::find($id)->load(['members' => function ($query) {
            $query->orderBy('role', 'desc')
                ->orderBy('id', 'desc');
        }]);
        $project->members()->updateExistingPivot(
            $memberId,
            $updateData
        );
        return $project->members()
            ->orderBy('role', 'desc')
            ->orderBy('id', 'desc')->get();
    }

    public function getIssues($id, FilterIssueRequest $request)
    {
        $ignoreIds = $request->get('ignoreIds');
        $filters = $request->only([
            'name',
            'assigneeId',
            'authorId',
            'trackerId',
            'status',
            'priority',
            'startDate',
            'dueDate',
        ]);
        return Issue::where('project_id', $id)
            ->when(isset($ignoreIds), function ($query) use ($ignoreIds) {
                $query->whereNotIn('id', $ignoreIds);
            })
            ->when(count($filters), function ($query) use ($filters) {
                $query->where(function ($query) use ($filters) {
                    $query->when(isset($filters['keyword']), function ($query) use ($filters) {
                        $query->where('name', 'like', '%' . $filters['name'] . '%');
                    })->when(isset($filters['assigneeId']), function ($query) use ($filters) {
                        $query->where('assign_user_id', $filters['assigneeId']);
                    })->when(isset($filters['authorId']), function ($query) use ($filters) {
                        $query->where('created_user_id', $filters['authorId']);
                    })->when(isset($filters['trackerId']), function ($query) use ($filters) {
                        $query->where('tracker_id', $filters['trackerId']);
                    })->when(isset($filters['status']) && $filters['status'] != 'all', function ($query) use ($filters) {
                        $query->where('status', $filters['status']);
                    })->when(isset($filters['priority']) && $filters['priority'] != 'all', function ($query) use ($filters) {
                        $query->where('priority', $filters['priority']);
                    })->when(isset($filters['startDate']), function ($query) use ($filters) {
                        $query->whereDate('start_date', '>=', $filters['startDate']);
                    })->when(isset($filters['dueDate']), function ($query) use ($filters) {
                        $query->whereDate('due_date', '<=', $filters['dueDate']);
                    });
                });
            })
            ->orderBy('id', 'desc')
            ->get()
            ->load([
                'tracker',
                'author',
                'assignee',
                'lastHistory',
            ]);
    }

    public function getTargetVersions($projectId)
    {
        return TargetVersion::where('project_id', $projectId)
            ->get();
    }

    public function getMemberActivities($projectId, $memberId, Request $request)
    {
        return IssueHistory::where('updated_user_id', $memberId)
            ->whereHas('issue', function ($query) use ($projectId) {
                $query->where('project_id', $projectId);
            })
            ->with('detailHistories', 'issue')
            ->orderBy('updated_date', 'desc')
            ->get()
            ->groupBy('updated_date');
    }

    public function toggleLinkRelativeIssue($issueId, LinkIssueRequest $request)
    {
        $action = $request->get('action');
        $relativeIssueId = $request->get('relative_issue_id');

        $issue = Issue::find($issueId)->load('project.issues');

        $checkIssueBelongedToProject = $issue->project->issues->search(function ($issue) use ($relativeIssueId) {
            return $issue->id == $relativeIssueId;
        });

        if (!$checkIssueBelongedToProject) {
            return response()->json([
                'message' => 'Issue not be long to project',
            ], ResponseAlias::HTTP_FORBIDDEN);
        }
        if ($action == config('constant.relative_issue_action.link')) {
            $issue->relativeIssues()->create([
                'relative_issue_id' => $relativeIssueId
            ]);
        } else {
            $issue->relativeIssues()->where([
                'relative_issue_id' => $relativeIssueId
            ])->delete();
        }

        return $issue->load([
            'author',
            'assignee',
            'tracker',
            'histories.detailHistories',
            'histories.updatedUser',
            'parentIssue',
            'relativeIssues.issue.tracker',
            'subIssues.tracker',
        ]);
    }

    public function removeLinkSubIssue($issueId, Request $request)
    {
        $deletedStatus = Issue::where('id', $request->get('subIssueId'))
            ->where('parent_issue_id', $issueId)
            ->delete();
        if ($deletedStatus) {
            return Issue::find($issueId)
                ->load([
                    'author',
                    'assignee',
                    'tracker',
                    'histories.detailHistories',
                    'histories.updatedUser',
                    'parentIssue',
                    'relativeIssues.issue.tracker',
                    'subIssues.tracker',
                    'targetVersion',
                ]);
        }

        return response()->json([
            'message' => 'Error',
        ], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
    }
}
