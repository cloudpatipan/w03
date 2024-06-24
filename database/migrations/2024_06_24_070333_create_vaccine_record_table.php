<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVaccineRecordTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vaccine_record', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('std_id');
            $table->unsignedBigInteger('vac_id');
            $table->date('vaccined_date');
            $table->timestamps();

            $table->foreign('std_id')->references('id')->on('student');
            $table->foreign('vac_id')->references('id')->on('vaccine');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vaccine_record');
    }
}
