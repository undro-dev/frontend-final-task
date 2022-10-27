import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Field = ({ text, removeField, id }) => {
	return (
		<Badge
			className='ms-2 mb-2 text-light w-25 d-flex'
			bg='secondary'
			text='light'
		>
			<p className='m-0 flex-grow-1'>{text} </p>
			<IoIosCloseCircleOutline onClick={() => removeField(id)} />
		</Badge>
	);
};

export default Field;
