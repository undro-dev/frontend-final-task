import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'https://esm.sh/react-markdown@7';

import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CardItem = ({
	_id,
	theme,
	title,
	imageUrl,
	description,
	removeCollection,
	user,
}) => {
	const themeApp = useSelector(selectTheme);
	const { data, status } = useSelector(state => state.auth);

	const navigate = useNavigate();

	let currentUserId;

	status === 'loaded'
		? (currentUserId = data._id)
		: (currentUserId = undefined);

	if (!imageUrl) {
		imageUrl =
			'https://res.cloudinary.com/dcugxsihk/image/upload/v1665834021/no-image_tfznfa.png';
	}

	return (
		<Card
			className='mb-1'
			bg={themeApp}
			text={themeApp === 'dark' ? 'light' : 'dark'}
		>
			<Card.Body className='d-flex justify-content-between flex-wrap'>
				<img
					src={imageUrl}
					alt='img'
					className=' rounded'
					style={{ height: '100px', width: '125px', objectFit: 'cover' }}
				/>
				<div className='flex-grow-1 flex-shrink-1 flex-wrap ps-3 align-items-center'>
					<h5>{theme.toUpperCase()}</h5>
					<h6>{title}</h6>
					<span>
						<ReactMarkdown children={description} />
					</span>
				</div>
				<div>
					{currentUserId === user ? (
						<div>
							<Link to={`/my-collections/${_id}`}>
								<Button
									variant={themeApp === 'dark' ? 'light' : 'dark'}
									className='me-1'
								>
									Items
								</Button>
							</Link>

							<Button
								variant={themeApp === 'dark' ? 'light' : 'dark'}
								className='me-1'
								onClick={() => navigate(`/my-collections/${_id}/edit`)}
							>
								Edit
							</Button>
							<Button variant='danger' onClick={() => removeCollection(_id)}>
								Delete
							</Button>
						</div>
					) : (
						<Link to={`/my-collections/${_id}`}>
							<Button
								variant={themeApp === 'dark' ? 'light' : 'dark'}
								className='me-1'
							>
								Items
							</Button>
						</Link>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default CardItem;
