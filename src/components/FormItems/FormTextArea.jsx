import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const FormTextArea = ({ text }) => {
	return (
		<>
			<p>{text}</p>
			<FloatingLabel
				className='mb-3'
				controlId='floatingTextarea2'
				label={text}
			>
				<Form.Control
					as='textarea'
					placeholder='Leave a comment here'
					style={{ height: '100px' }}
				/>
			</FloatingLabel>
		</>
	);
};

export default FormTextArea;
