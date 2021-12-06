import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * User information Row
 *
 * @param {Object}   user     The user data
 * @param {Function} onClick  On row click callback
 */
export const UserRow = ({user, onClick}) => (
    <tr onClick={onClick}>
        <td>{user.name}</td>
        <td>{user.lastname}</td>
        <td>{user.birthday}</td>
    </tr>
);

UserRow.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

/**
 * Simple row with spinner to loading state
 *
 */
export const Loading = () => {
    return(
        <tr>
            <td colSpan={4}>
                <Spinner animation="border" variant="dark" size='sm'/>
            </td>
        </tr>
    );
};