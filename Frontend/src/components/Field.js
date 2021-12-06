import React from 'react';
import { Form } from 'react-bootstrap';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';

/**
 * Login/register form input
 * 
 * @param {number}  id Input field id 
 * @param {string}  label Label to show
 * @param {object}  reference Form control reference
 * @param {string}  type The data input type
 * @param {boolean} busy Indicate when an api call is running to disabe it
 * @returns 
 */
const Field = ({ id, label, reference, type, busy}) => {
    return(
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}:</Form.Label>
            {
                type !== 'datepicker'
                    ? <Form.Control type={type} placeholder={label} ref={reference} readOnly={busy} />
                    : <Datetime ref={reference} timeFormat={false} inputProps={{disabled: busy}} />
            }
        </Form.Group>
    );
}

Field.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    reference: PropTypes.object,
    type: PropTypes.string,
    busy: PropTypes.bool,
}

Field.defaultProps = {
    busy: false,
    type: 'text',
    label: 'label',
}

export default Field;