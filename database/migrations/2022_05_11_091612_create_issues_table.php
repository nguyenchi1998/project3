<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('tracker_id');
            $table->text('description')->nullable();
            $table->unsignedInteger('priority')->default(config('constant.issue_priority.normal'));
            $table->unsignedInteger('assign_user_id')->nullable();
            $table->unsignedInteger('created_user_id');
            $table->unsignedInteger('parent_issue_id')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->unsignedFloat('estimate_time')->nullable();
            $table->unsignedFloat('actual_time')->nullable();
            $table->unsignedFloat('progress_percent')->default(0);
            $table->tinyInteger('status')->default(config('constant.issue_status.new'));
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
}
