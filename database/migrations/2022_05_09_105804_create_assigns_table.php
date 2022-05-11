<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('project_id');
            $table->tinyInteger('assign_type')->default(config('constants.assign_type.main'));
            $table->unsignedFloat('standard_assign_hour');
            $table->unsignedFloat('assign_hour');
            $table->unsignedInteger('language_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->tinyInteger('status')->default(config('constants.assign_status.active'));
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
        Schema::dropIfExists('assigns');
    }
}
