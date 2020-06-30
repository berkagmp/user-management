<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\ResponseController;
use App\Http\Traits\TokenTrait;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends ResponseController
{
    use TokenTrait;

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentials)) {
            $user = Auth::user();
            $token['token'] = $this->generate_token($user);
            $response = self::HTTP_OK;

            return $this->get_http_response("success", $token, $response);
        } else {
            $error = "Unauthorized Access";
            $response = self::HTTP_UNAUTHORIZED;

            return $this->get_http_response("Error", $error, $response);
        }
    }

    public function logout(Request $request)
    {
        $token = Auth::user()->token();
        $token->revoke();
        
        return response()->json(null, self::HTTP_NO_CONTENT);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|max:50|unique:user,user_id,',
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'email' => 'required|email|max:50|unique:user,email,',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
            'is_admin' => 'nullable|integer|max:1',
        ]);

        if ($validator->fails()) {
            return $this->get_http_response("error", $validator->errors(), self::HTTP_UNPROCESSABLE_ENTITY);
        }

        $data = $request->all();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $success['user_id'] =  $user->user_id;
        $success['email'] =  $user->email;
        $success['first_name'] =  $user->first_name;
        $success['last_name'] =  $user->last_name;
        $success['token'] = $this->generate_token($user);
        $response =  self::HTTP_CREATED;

        return $this->get_http_response("success", $success, $response);
    }

    public function get_my_info()
    {
        $user = Auth::user();
        $response =  self::HTTP_OK;

        return $user ? $this->get_http_response("success", $user, $response)
            : $this->get_http_response("Unauthenticated user", $user, $response);
    }
}
