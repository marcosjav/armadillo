import React from 'react';
import { Row, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Field from '../Field';
import Button from '../Button';

/**
 * User registration form
 * 
 * @param {Function} onSubmit On form submit callback
 * @param {boolean} busy Indicates when an api call is running, to disable it
 */
const SignUpForm = ({onSubmit, busy}) => {
  const nameRef = React.useRef();
  const lastnameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const dateRef = React.useRef();

  const handleSubmit = e => {
      e.preventDefault();
      onSubmit({
        'name': nameRef.current.value,
        'lastname': lastnameRef.current.value,
        'email': emailRef.current.value,
        'password': passwordRef.current.value,
        'password_confirmation': passwordConfirmRef.current.value,
        'birthday': dateRef.current.state.selectedDate?.format('YYYY-MM-DD'),
    });
  };
  return (
    <>
      <h3 className="mb-3">Crear cuenta</h3>
      <Form className="text-start" onSubmit={handleSubmit} controlid="loginForm">

        <Field reference={nameRef} label="Nombres" type="text" id='nameInput' busy={busy} />
        <Field reference={lastnameRef} label="Apellidos" type="text" id='lastnameInput' busy={busy} />
        <Field reference={emailRef} label="Correo" type="email" id='emailInput' busy={busy} />
        <Field reference={passwordRef} label="Contraseña" type="password"  id='passwordInput' busy={busy} />
        <Field reference={passwordConfirmRef} label="Repetir contraseña" type="password"  id='passwordConfirmInput' busy={busy} />
        <Field reference={dateRef} label="Fecha de nacimiento" type="datepicker"  id='dateInput' busy={busy} />

        <Row className='mt-5'>
          <Button busy={busy} text='Registrarme' />
        </Row>
      </Form>
    </>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  busy: PropTypes.bool,
}

SignUpForm.defaultProps = {
  errors: [],
  busy: false,
}


/**
 * Simple name, lastname, email, password and birthdate form
 *
 */
export default SignUpForm;
