import React from 'react';
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';

const Comment = ({ userName, createdAt, text }) => {
	return (
		<Card className='mt-3 mb-3'>
			<Card.Header>
				{userName}{' '}
				<span className='text-muted'>
					<Moment format='YYYY-MM-DD HH:mm'>{createdAt}</Moment>
				</span>
			</Card.Header>
			<Card.Body className='d-flex justify-content-between'>
				<Card.Text>{text}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Comment;
