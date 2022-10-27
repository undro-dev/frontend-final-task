import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';

import { toggleLike } from '../../redux/slices/currentItem.js';
import { AiFillLike } from 'react-icons/ai';

import axios from '../../axios.js';

const Like = ({ likes }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { data } = useSelector(state => state.auth);

	const handleLike = async () => {
		dispatch(toggleLike(data._id));
		await axios.post(`/items/${id}/like`, data._id);
	};

	return (
		<Button className='ms-auto' variant='danger' onClick={handleLike}>
			<AiFillLike />
			<span>{likes.length}</span>
		</Button>
	);
};

export default Like;
