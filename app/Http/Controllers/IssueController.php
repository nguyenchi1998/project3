<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issue\IssueStoreRequest;
use App\Http\Requests\Issue\LinkIssueRequest;
use App\Models\Issue;
use App\Models\IssueHistory;
use App\Models\IssueHistoryDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Issue::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IssueStoreRequest $request)
    {
        $issue =  Issue::create(array_merge($request->all(), [
            'created_user_id' => auth()->user()->id
        ]));

        return $issue->load(['author', 'tracker', 'assignee']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Issue::find($id)
            ->load([
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $issue = Issue::find($id)
                ->load([
                    'author',
                    'assignee',
                    'tracker',
                    'histories.detailHistories',
                    'histories.updatedUser'
                ]);

            $detailHistories = $this->createDetailHistories($issue, $request->all());

            if (count($detailHistories)) {
                $issueHistory = IssueHistory::create([
                    'note' => $request->get('note'),
                    'issue_id' => $issue->id,
                    'updated_user_id' => auth()->id()
                ]);
                foreach ($detailHistories as $detailHistory) {
                    IssueHistoryDetail::create(array_merge($detailHistory, [
                        'issue_history_id' => $issueHistory->id
                    ]));
                }
            } else {
                if ($request->get('note')) {
                    $issueHistory = IssueHistory::create([
                        'note' => $request->get('note'),
                        'issue_id' => $issue->id,
                        'updated_user_id' => auth()->id()
                    ]);
                }
            }
            $issue->update($request->only([
                'name',
                'tracker_id',
                'project_id',
                'description',
                'priority',
                'assign_user_id',
                'parent_issue_id',
                'start_date',
                'end_date',
                'estimate_time',
                'actual_time',
                'progress_percent',
                'status',
            ]));
            DB::commit();

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
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    protected function createDetailHistories($issue, $newData)
    {
        $detailHistoriesKey = [
            'description' => 'Description',
            'end_date' => 'End date',
            'estimate_time' => 'Estimate time',
            'name' => 'Name',
            'priority' => 'Priority',
            'progress_percent' =>  'Progress percent',
            'start_date' => 'Start date',
            'status' => 'Status',
            'tracker_id' => 'Tracker',
            'parent_issue_id' => 'Parent issue',
            'assign_user_id' => 'Assignee',
        ];
        unset($newData['note']);
        $detailHistories = [];
        foreach ($newData as $key => $value) {
            if ($issue[$key] != $value) {
                $detailHistories = array_merge($detailHistories, [
                    [
                        'key' => $detailHistoriesKey[$key],
                        'old_value' => $issue[$key],
                        'new_value' => $value,
                    ]
                ]);
            }
        }

        return $detailHistories;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function toggleLinkIssue($id, LinkIssueRequest $request)
    {
        $action = $request->get('action');
        $relativeIssueId = $request->get('relative_issue_id');

        $issue = Issue::find($id)->load('project.issues');

        $checkIssueBelongedToProject = $issue->project->issues->search(function ($issue) use ($relativeIssueId) {
            return $issue->id == $relativeIssueId;
        });

        if (!$checkIssueBelongedToProject) {
            return response()->json([
                'message' => 'Issue not be long to project',
            ], Response::HTTP_FORBIDDEN);
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
}
