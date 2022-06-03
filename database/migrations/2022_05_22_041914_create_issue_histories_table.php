<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssueHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('updated_user_id');
            $table->text('note')->nullable();
            $table->unsignedInteger('issue_id');
            $table->date('updated_date');
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
        Schema::dropIfExists('issue_histories');
    }
}
