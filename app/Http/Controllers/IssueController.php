<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Issue;
use App\Models\Tracker;
use App\Models\IssueHistory;
use Illuminate\Http\Request;
use App\Models\TargetVersion;
use Illuminate\Http\Response;
use App\Models\IssueHistoryDetail;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Issue\LinkIssueRequest;
use App\Http\Requests\Issue\IssueStoreRequest;

class IssueController extends Controller
{

    public function index(Request $request)
    {
        return Issue::all();
    }

    public function store(IssueStoreRequest $request)
    {
        $issue = Issue::create(
            array_merge(
                $request->all(), [
                'created_user_id' => auth()->user()->id
                ]
            )
        );

        if ($request->get('parent_issue_id')) {
            return Issue::find($request->get('parent_issue_id'))->load(
                [
                'author',
                'assignee',
                'tracker',
                'histories.detailHistories',
                'histories.updatedUser',
                'parentIssue',
                'relativeIssues.issue.tracker',
                'subIssues.tracker',
                ]
            );
        }

        return  $issue->load(
            [
            'author',
            'assignee',
            'tracker',
            'histories.detailHistories',
            'histories.updatedUser',
            'parentIssue',
            'relativeIssues.issue.tracker',
            'subIssues.tracker',
            ]
        );
    }

    public function show($id)
    {
        return Issue::find($id)
            ->load(
                [
                'author',
                'assignee',
                'tracker',
                'histories.detailHistories',
                'histories.updatedUser',
                'parentIssue',
                'relativeIssues.issue.tracker',
                'subIssues.tracker',
                'targetVersion',
                ]
            );
    }


    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $issue = Issue::find($id)
                ->load(
                    [
                    'project.members',
                    'project.targetVersions',
                    'author',
                    'assignee',
                    'tracker',
                    'histories.detailHistories',
                    'histories.updatedUser',
                    ]
                );

            $detailHistories = $this->createDetailHistories($issue, $request->all());

            if (count($detailHistories)) {
                $issueHistory = IssueHistory::create(
                    [
                    'note' => $request->get('note'),
                    'issue_id' => $issue->id,
                    'updated_user_id' => auth()->id(),
                    'updated_date' => Carbon::now()->format('y/m/d'),
                    ]
                );
                foreach ($detailHistories as $detailHistory) {
                    IssueHistoryDetail::create(
                        array_merge(
                            $detailHistory, [
                            'issue_history_id' => $issueHistory->id
                            ]
                        )
                    );
                }
            } else {
                if ($request->get('note')) {
                    $issueHistory = IssueHistory::create(
                        [
                        'note' => $request->get('note'),
                        'issue_id' => $issue->id,
                        'updated_user_id' => auth()->id()
                        ]
                    );
                }
            }
            $issue->update(
                $request->only(
                    [
                    'name',
                    'tracker_id',
                    'project_id',
                    'description',
                    'priority',
                    'assign_user_id',
                    'parent_issue_id',
                    'start_date',
                    'due_date',
                    'estimate_time',
                    'actual_time',
                    'progress_percent',
                    'status',
                    'target_version_id',
                    ]
                )
            );
            DB::commit();

            return $issue->load(
                [
                'author',
                'assignee',
                'tracker',
                'histories.detailHistories',
                'histories.updatedUser',
                'parentIssue',
                'relativeIssues.issue.tracker',
                'subIssues.tracker',
                'targetVersion',
                ]
            );
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    protected function createDetailHistories($issue, $newData)
    {
        $members = $issue->project->members->pluck('name', 'id')->toArray();
        $targetVersions = $issue->project->targetVersions->pluck('name', 'id')->toArray();
        $detailHistoriesKey = [
            'description' => 'Description',
            'due_date' => 'Due date',
            'estimate_time' => 'Estimate time',
            'name' => 'Name',
            'priority' => 'Priority',
            'progress_percent' =>  'Progress percent',
            'start_date' => 'Start date',
            'status' => 'Status',
            'tracker_id' => 'Tracker',
            'parent_issue_id' => 'Parent issue',
            'assign_user_id' => 'Assignee',
            'target_version_id' => 'Target version',
        ];
        $values = [
            'progress_percent' => array_map(
                function ($percent) {
                    return $percent . '%';
                }, range(0, 100, 1)
            ),
            'priority' => array_flip(config('constant.issue_priority')),
            'status' => array_flip(config('constant.issue_status')),
            'tracker_id' => Tracker::all()->pluck('name', 'id')->toArray(),
            'assign_user_id' => $members,
            'target_version_id' => $targetVersions,
        ];
        unset($newData['note']);
        $detailHistories = [];
        foreach ($newData as $key => $value) {
            if ($issue[$key] != $value) {
                $detailHistories[] =  [
                    'key' => $detailHistoriesKey[$key],
                    'old_value' => isset($values[$key]) && isset($issue[$key])
                        ? ucfirst(str_replace('_', ' ', $values[$key][$issue[$key]]))
                        : $issue[$key],
                    'new_value' => isset($values[$key]) ? ucfirst(str_replace('_', ' ', $values[$key][$value])) : $value,
                ];
            }
        }

        return $detailHistories;
    }


    public function destroy($id)
    {
        //
    }
}
