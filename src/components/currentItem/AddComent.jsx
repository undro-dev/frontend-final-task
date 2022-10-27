import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCommentsById } from '../../redux/slices/commentsSlice';
import { selectTheme } from '../../redux/slices/themeSlice.js';

import axios from '../../axios.js';

const AddComment = () => {
	const dispatch = useDispatch();
	const theme = useSelector(selectTheme);
	const [comment, setComment] = useState('');
	const { id } = useParams();

	const handleSubmit = async e => {
		e.preventDefault();

		await axios.post(`/items/${id}`, { comment });
		dispatch(fetchCommentsById(id));
		setComment('');
	};

	return (
		<>
			<Form>
				<FloatingLabel
					className='mt-3 mb-3'
					controlId='floatingTextarea2'
					label='Comments'
				>
					<Form.Control
						onChange={e => setComment(e.target.value)}
						as='textarea'
						placeholder='Leave a comment here'
						style={{ height: '100px' }}
						value={comment}
					/>
				</FloatingLabel>
				<Button
					onClick={e => handleSubmit(e)}
					variant={theme === 'dark' ? 'light' : 'dark'}
					type='submit'
				>
					Add comment
				</Button>
			</Form>
		</>
	);
};

export default AddComment;
