import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { selectTheme } from '../../redux/slices/themeSlice';
import { fetchItemsById } from '../../redux/slices/itemsSlice';

import axios from '../../axios.js';

const FormForItem = ({ id, currentItem, currentCollection }) => {
	const { id: idItem } = useParams();

	let additionalFields = [];

	if (currentItem) {
		additionalFields = currentItem.additionalFields;
	} else {
		additionalFields = currentCollection.additionalFields;
	}

	const theme = useSelector(selectTheme);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');

	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		if (currentItem) {
			await axios.patch(`/items/${id}`, { data, additionalFields });
			navigate(`/items/${idItem}`);
		} else {
			await axios.post(`/my-collections/${id}`, { data, additionalFields });
		}
		dispatch(fetchItemsById(id));
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					{...register('title', { required: 'Enter title' })}
					type='text'
					placeholder='Enter title'
					onChange={e => setTitle(e.target.value)}
					value={title}
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Tags</Form.Label>
				<Form.Control
					type='text'
					placeholder='Horrors, comedy'
					{...register('tags', { required: 'Enter tags' })}
				/>
			</Form.Group>

			{additionalFields.map(item =>
				item.select === 'text' ? (
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>{item.text}</Form.Label>
						<Form.Control
							type={item.select}
							{...register(`${item.text}`, { required: true })}
						/>
					</Form.Group>
				) : null
			)}
			{additionalFields.map(item =>
				item.select === 'textarea' ? (
					<>
						<p>{item.text}</p>
						<FloatingLabel
							className='mb-3'
							controlId='floatingTextarea2'
							label={item.text}
						>
							<Form.Control
								as='textarea'
								placeholder='Leave a comment here'
								style={{ height: '100px' }}
								{...register(`${item.text}`, { required: true })}
							/>
						</FloatingLabel>
					</>
				) : null
			)}
			{additionalFields.map(item =>
				item.select === 'number' ? (
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>{item.text}</Form.Label>
						<Form.Control
							type={item.select}
							{...register(`${item.text}`, { required: true })}
						/>
					</Form.Group>
				) : null
			)}
			{additionalFields.map(item =>
				item.select === 'checkbox' ? (
					<Form.Group className='mb-3'>
						<p>{item.text}</p>
						<Form.Check
							inline
							label='yes'
							name='group1'
							type='radio'
							value='yes'
							{...register(`${item.text}`)}
						/>
						<Form.Check
							inline
							label='no'
							name='group1'
							type='radio'
							value='no'
							{...register(`${item.text}`)}
						/>
					</Form.Group>
				) : null
			)}
			{additionalFields.map(item =>
				item.select === 'date' ? (
					<Form.Group
						controlId='validationFormik03'
						className='mb-3 d-flex flex-column'
					>
						<Form.Label>{item.text}</Form.Label>
						<input type='date' {...register(`${item.text}`)} />
					</Form.Group>
				) : null
			)}

			<Button onClick={e => handleSubmit(e)} variant={theme} type='submit'>
				{Boolean(currentItem) !== false ? 'Edit item' : 'Create item'}
			</Button>
		</Form>
	);
};

export default FormForItem;
