<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class LoginUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|string|email|',
            'password' => 'required|string|min:8'
        ];
    }

    /**
     * Set attributes names
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'email' => 'email',
            'password' => 'contraseña',
        ];
    }

    /**
     * Validation error messages
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'El :attribute es obligatorio',
            'password.required' => 'La :attribute es obligatoria',
        ];
    }
}
