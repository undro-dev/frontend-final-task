import React from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

export const Tr = ({
	_id,
	fields,
	collectionName,
	userName,
	index,
	createdAt,
}) => {
	const navigate = useNavigate();

	return (
		<tr className='cursor-pointer' onClick={() => navigate(`/items/${_id}/`)}>
			<td>{index}</td>
			<td>{fields.title}</td>
			<td>{collectionName}</td>
			<td>{userName}</td>
			<td>
				<Moment format='YYYY-MM-DD HH:mm'>{createdAt}</Moment>
			</td>
		</tr>
	);
};
