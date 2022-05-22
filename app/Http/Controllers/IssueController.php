<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issue\IssueStoreRequest;
use App\Models\Issue;
use App\Models\IssueHistory;
use App\Models\IssueHistoryDetail;
use Exception;
use Illuminate\Http\Request;
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
                'histories.updatedUser'
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
                ->load(['author', 'assignee', 'tracker', 'histories.detailHistories']);
            $detailHistories = $this->createHistory($issue, $request->all());
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

            return $issue;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    protected function createHistory($issue, $newData)
    {
        $detailHistories = [];
        foreach ($newData as $key => $value) {
            if ($issue[$key] != $value) {
                $detailHistories = array_merge($detailHistories, [
                    [
                        'key' => $key,
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
}
