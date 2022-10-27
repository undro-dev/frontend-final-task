import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from 'react-hook-form';

const countTypeField = {
	number: 0,
	text: 0,
	textarea: 0,
	checkbox: 0,
	date: 0,
};
const FormForFields = ({ onChangeFields, additionalFields }) => {
	const arrayWithFields = ['text', 'number', 'textarea', 'checkbox', 'date'];

	const { register, handleSubmit } = useForm();

	const onSubmit = data => {
		if (data.select) countTypeField[data.select]++;
		if (countTypeField[data.select] <= 3)
			onChangeFields({ ...data, id: Date.now() });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className='mb-3' controlId='titleFields'>
				<Form.Label>Title fields</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter field`s title'
					{...register('text', { required: 'Enter your title' })}
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='typeOfField'>
				<Form.Label>Type of field</Form.Label>
				<Form.Select
					type='select'
					{...register('select', { required: 'Enter your title' })}
				>
					{arrayWithFields.map(el => (
						<option key={el} value={el}>
							{el}
						</option>
					))}
				</Form.Select>
			</Form.Group>
			<Button variant='dark' type='submit'>
				Submit
			</Button>
		</Form>
	);
};

export default FormForFields;
