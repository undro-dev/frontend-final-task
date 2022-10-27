import React from 'react';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';

import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { selectTheme } from '../../redux/slices/themeSlice';

const Tr = ({
	index,
	_id,
	fields,
	createdAt,
	removeItem,
	isOwnerCollection,
}) => {
	const navigate = useNavigate();
	const theme = useSelector(selectTheme);
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{_id}</td>
			<td>{fields.title}</td>
			<td>
				<Moment format='YYYY-MM-DD HH:mm'>{createdAt}</Moment>
			</td>
			<td>
				{!isOwnerCollection ? (
					<Link to={`/items/${_id}`}>
						<Button variant={theme === 'dark' ? 'light' : 'dark'}>
							<FiMoreHorizontal />
						</Button>
					</Link>
				) : (
					<>
						<Button
							onClick={() => removeItem(_id)}
							className='me-3'
							variant={theme === 'dark' ? 'light' : 'dark'}
						>
							<MdDeleteForever />
						</Button>
						<Button
							variant={theme === 'dark' ? 'light' : 'dark'}
							onClick={() => navigate(`/items/${_id}/edit`)}
							className='me-3'
						>
							<MdEdit />
						</Button>
						<Link to={`/items/${_id}`}>
							<Button variant={theme === 'dark' ? 'light' : 'dark'}>
								<FiMoreHorizontal />
							</Button>
						</Link>
					</>
				)}
			</td>
		</tr>
	);
};

export default Tr;
