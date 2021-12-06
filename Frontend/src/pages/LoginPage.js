import React, { useState } from 'react';
import { Col, Row, Container, Card, Button, Alert } from 'react-bootstrap';

import SignInForm from '../components/forms/SignInForm'
import SignUpForm from '../components/forms/SignUpForm';
import UserProfile from '../models/UserProfile'
import LoginHelper from '../helper/login_helper';

const LoginPage = () => {
  // States
  const [newUserState, setNewUserState] = useState(false);
  const [errorState, setErrorState] = useState([]);
  const [busyState, setBusyState] = useState(false);
  
  // Check if user is logged
  if (UserProfile.get()) {
    document.location.href = "/";
  }

  // Handlers
  const handleSwitchUserState = () => {
    setErrorState([]);
    setNewUserState( s => !s);
  }

  const handleSubmit = async (data) => {
    setBusyState(true);
    setErrorState([]);
    const response = await LoginHelper.loginApiCall(data, newUserState); 
    if (response) {
      setErrorState(response);
    }
    setBusyState(false);
  }

  return (
    <>
      <Container className="h-100 py-5">
        <Row flex='true' className="justify-content-center align-items-center h-100">
          <Col md={8} lg={6} xl={5}>
            <Card className='shadow-2-strong'>
              <Card.Body className="p-5 pb-3 text-center">
                {
                  newUserState
                  ? <SignUpForm busy={busyState} onSubmit={handleSubmit}/>
                  : <SignInForm busy={busyState} onSubmit={handleSubmit}/>
                }

                <Alert variant="danger" className="mt-3 pb-0" hidden={!errorState.length}>
                    <ul>
                        {
                            errorState.map(line => (
                                <li>{line}</li>
                            ))
                        }
                    </ul>
                </Alert>

                <Row className='mt-4'>
                  <p>{newUserState? "Ya tienes cuenta?" : "Sin cuenta?"} <Button variant="link" onClick={handleSwitchUserState}>{newUserState? "Iniciar sesión" : "Crear cuenta"}</Button></p>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
