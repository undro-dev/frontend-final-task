import React from 'react';
import Form from 'react-bootstrap/Form';

const FormCheck = ({ text }) => {
	return (
		<div className='mb-3'>
			<p>{text}</p>
			<Form.Check inline label='yes' name='group1' type='radio' />
			<Form.Check inline label='no' name='group1' type='radio' />
		</div>
	);
};

export default FormCheck;
