<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class ApiController extends Controller
{

    /**
     * Return generic json response with the given data.
     *
     * @param $data
     * @param int $statusCode
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respond($data, $statusCode = 200, $headers = [])
    {
        return response()->json($data, $statusCode, $headers);
    }

    /**
     * Respond with success.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondSuccess()
    {
        return $this->respond(null);
    }

    /**
     * Respond with created.
     *
     * @param User $user
     * @param $created boolean that indicates if user was created
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondLogguedUser(User $user, $created = false)
    {
        $user['token'] = $user->createToken('tokens')->plainTextToken;

        return $this->respond($user, $created ? 201 : 200);
    }

    /**
     * Respond with error.
     *
     * @param $message
     * @param $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondError($message, $statusCode = 400)
    {
        return $this->respond([
            'errors' => [
                'message' => $message,
                'status_code' => $statusCode
            ]
        ], $statusCode);
    }

    /**
     * Renponse to unsuccess login
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondFailedLogin()
    {
        return $this->respond([
            'errors' => [
                'message' => 'Nombre de usuario o contraseña incorrecta',
                'status_code' => 401
            ]
        ], 401);
    }
}
