<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $role = new Role();
        $role->name = 'Admin';
        $role->save();

        $role = new Role();
        $role->name = 'User';
        $role->save();

        $admin = new User();
        $admin->role_id = 1;
        $admin->name = 'Reuel Dave Cardines';
        $admin->email = 'admin@example.com';
        $admin->password = bcrypt('admin');
        $admin->save();

        $user = new User();
        $user->role_id = 2;
        $user->name = 'Reuel Dave Cardines';
        $user->email = 'user@example.com';
        $user->password = bcrypt('user');
        $user->save();
    }
}
