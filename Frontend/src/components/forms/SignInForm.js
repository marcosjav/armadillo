import React from 'react';
import { Row, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from '../Button';
import Field from '../Field';

/**
 * Simple email, password form
 * 
 * @param {Function} onSubmit On form submit callback
 * @param {boolean} busy Indicates when an api call is running, to disable it
 */
const SignInForm = ({onSubmit, busy}) => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      'email': emailRef.current.value, 
      'password': passwordRef.current.value,
    })
  };

  return (
    <>
      <h3 className="mb-3">Iniciar Sesión</h3>
      <Form className="text-start" onSubmit={handleSubmit} controlid="loginForm">

        <Field reference={emailRef} label="Correo" type="email" id='emailInput' busy={busy} />
        <Field reference={passwordRef} label="Contraseña" type="password"  id='passwordInput' busy={busy} />

        <Row className='mt-5'>
          <Button busy={busy} text='Login' onSubmit={handleSubmit}/>
        </Row>
      </Form>
    </>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  busy: PropTypes.bool,
}

SignInForm.defaultProps = {
  busy: false,
}

export default SignInForm;
