<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = ['admin', 'admin@example.com', 'Admin', 'Park', 'password', true, true];
        $idx = 0;

        DB::table('user')->insert([
            'user_id'       => $data[$idx++],
            'email'         => $data[$idx++],
            'firstName'     => $data[$idx++],
            'lastName'      => $data[$idx++],
            'password'      => bcrypt($data[$idx++]),
            'created_at'    => \Carbon\Carbon::now(),
            'is_admin'      => $data[$idx++],
            'active'        => $data[$idx++],
        ]);
    }
}
