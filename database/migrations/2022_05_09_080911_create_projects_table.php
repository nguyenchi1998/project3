<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('note', 256)->nullable();
            $table->tinyInteger('priority')->default(config('constant.project_priority.normal'));
            $table->unsignedSmallInteger('group_id')->nullable();
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->smallInteger('status')->nullable();
            $table->string('source_control', 256)->nullable();
            $table->tinyInteger('type')->default(config('constant.project_type.business'));
            $table->tinyInteger('customer_id')->nullable();
            $table->unsignedInteger('created_user_id');
            $table->unsignedInteger('current_target_version_id')->nullable();
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
        Schema::dropIfExists('projects');
    }
}
