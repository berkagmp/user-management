<?php

namespace App\Http\Controllers;

use App\Http\Traits\TokenTrait;
use App\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends ResponseController
{
    use TokenTrait;

    public function get_users()
    {
        return $this->get_http_response("success", User::all(), self::HTTP_OK);
    }

    public function get_user(int $user_id)
    {
        return User::findOrFail($user_id);
    }

    public function update(int $user_id, Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
        ]);

        if(Auth::user()->isAdmin()){
            $user = $this->get_user($user_id);
            $user->update($data);
        }else{
            return $this->get_http_response("error", null, self::HTTP_UNAUTHORIZED);
        }

        return $this->get_http_response("success", $user, self::HTTP_OK);
    }

    public function delete(int $user_id)
    {
        $user = $this->get_user($user_id);

        DB::transaction(function () use ($user) {
            $this->delete_tokens($user);
            $user->delete();
        });

        return $this->get_http_response("success", null, self::HTTP_NO_CONTENT);
    }
}
