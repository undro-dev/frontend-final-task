import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsById } from '../../redux/slices/commentsSlice';

import Moment from 'react-moment';

import Card from 'react-bootstrap/Card';
import AddComment from './AddComent';
import Comment from './Comment';
import Like from './Like';
import Tag from './Tag';

const Item = ({ userName, createdAt, fields, id, likes }) => {
	const dispatch = useDispatch();
	const { data, status } = useSelector(state => state.comments);

	useEffect(() => {
		dispatch(fetchCommentsById(id));
	}, []);

	return (
		<>
			<Card style={{ width: '100%' }}>
				<Card.Body className='text-dark'>
					<div className='d-flex mb-4 justify-content-between bg-light p-2 rounded-pill'>
						<p className='mb-1 h5'>{userName}</p>
						<span className='text-muted'>
							<Moment format='YYYY-MM-DD HH:mm'>{createdAt}</Moment>
						</span>
					</div>
					<Card.Title>{fields.title}</Card.Title>
					<div className='d-flex'>
						{!!fields.tags === true
							? fields.tags
									.split(' ')
									.map((tag, index) => <Tag key={tag + index} tag={tag} />)
							: null}
						<Like likes={likes} />
					</div>
					<p className='mb-1 h5'>Comments:</p>
					{status === 'loaded' && data.length !== 0 ? (
						data.map(comment => <Comment key={comment._id} {...comment} />)
					) : (
						<p>No comments</p>
					)}
				</Card.Body>
			</Card>
			<AddComment />
		</>
	);
};

export default Item;
