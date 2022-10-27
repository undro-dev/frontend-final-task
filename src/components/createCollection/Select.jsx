import Form from 'react-bootstrap/Form';

const Select = () => {
	const arrayWithFields = ['text', 'number', 'textarea', 'checkbox', 'date'];
	return (
		<Form.Select aria-label='Additional fields'>
			<option value='0'>Without additional settings</option>
			{arrayWithFields.map(el => (
				<option value='el'>{el}</option>
			))}
		</Form.Select>
	);
};

export default Select;
