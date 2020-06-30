<?php

namespace App\Http\Traits;

trait TokenTrait
{
  public function delete_tokens($user)
  {
    if (isset($user->tokens) && !empty($user->tokens)) {
      $user->tokens->each(function ($token, $key) {
        $token->delete();
      });
    }
  }

  public function generate_token($user, string $token_name = null)
  {
    $this->delete_tokens($user);

    return $user->createToken($token_name)->accessToken;
  }
}
