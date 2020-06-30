<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResponseController extends Controller
{
    const HTTP_OK = Response::HTTP_OK;
    const HTTP_CREATED = Response::HTTP_CREATED;
    const HTTP_UNAUTHORIZED = Response::HTTP_UNAUTHORIZED;
    const HTTP_NO_CONTENT = Response::HTTP_NO_CONTENT;
    const HTTP_CONFLICT = Response::HTTP_CONFLICT;
    const HTTP_UNPROCESSABLE_ENTITY = Response::HTTP_UNPROCESSABLE_ENTITY;

    public function get_http_response(string $status = null, $data = null, $response)
    {
        return response()->json([
            'status' => $status,
            'data' => $data,
        ], $response);
    }
}
