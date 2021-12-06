import React from 'react';
import { Button as BButton, Spinner } from 'react-bootstrap';

/**
 * Simple form button
 * 
 * @param {boolean} disabled Enable or disable button
 * @param {string} type Button type
 * @param {string} text Text to display in button
 * @param {boolean} busy Indicate when an api call is running to disable it
 */
export default class Button extends React.Component {
    render() {
        return(
            <BButton 
            variant={this.props.disabled? "secondary" : "primary"} 
            type={this.props.type? this.props.type : 'submit'} 
            disabled={this.props.disabled || this.props.busy}>
                {
                 this.props.busy
                    ? <Spinner animation="border" variant="light" size='sm'/>
                    : this.props.text
                }
            </BButton>
        );
    }
}