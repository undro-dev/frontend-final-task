import React from 'react';
import Form from 'react-bootstrap/Form';

const FormText = props => {
	return (
		<Form.Group className='mb-3' controlId='formBasicEmail'>
			<Form.Label>{props.text}</Form.Label>
			<Form.Control type={props.select} />
		</Form.Group>
	);
};

export default FormText;
