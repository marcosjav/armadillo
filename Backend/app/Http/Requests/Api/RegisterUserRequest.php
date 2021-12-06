<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
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
            'name' => 'required|string|max:50|min:4',
            'lastname' => 'required|string|max:50|min:4',
            'birthday' => 'required|date',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Get attributes names
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'name' => 'nombres',
            'lastname' => 'apellidos',
            'birthday' => 'fecha de nacimiento',
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
            // name
            'name.required' => 'Los :attribute son obligatorios',
            'name.min' => 'Los :attribute debe ser más largo',
            'name.max' => 'Los :attribute es mayor a 50 carácteres',
            //lastname
            'lastname.required' => 'Los :attribute son obligatorios',
            'lastname.min' => 'Los :attribute debe ser más largo',
            'lastname.max' => 'Los :attribute es mayor a 50 carácteres',
            // birthday
            'birthday.required' => 'La :attribute es obligatoria',
            'birthday.date' => 'La :attribute no tiene un formato válido',
            // email
            'email.required' => 'El :attribute es obligatorio',
            'email.unique' => 'El :attribute ya se encuentra en uso',
            'email.email' => 'El :attribute debe ser válido',
            // password
            'password.required' => 'La :attribute es obligatoria',
            'password.confirmed' => 'La :attribute no coincide',
            'password.min' => 'La :attribute es muy corta',
        ];
    }
}
