import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * User information modal
 * 
 * @param {Function} onClose Close modal callback
 * @param {Object}   user    User data object
 */
const UserModal = ({onClose, user}) => {
    return (
      <>
        <Modal show={user != null} onHide={onClose}>
          <Modal.Header >
            <Modal.Title>Usuario #{user?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Table bordered size="sm">
                  <tbody>
                      <tr>
                          <th>Nombres:</th>
                          <td>{user?.name}</td>
                      </tr>
                      <tr>
                          <th>Apellidos:</th>
                          <td>{user?.lastname}</td>
                      </tr>
                      <tr>
                          <th>Email:</th>
                          <td>{user?.email}</td>
                      </tr>
                      <tr>
                          <th>Fecha de Nac.:</th>
                          <td>{user?.birthday}</td>
                      </tr>
                  </tbody>
              </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

UserModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

export default UserModal;