import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ColorSwitches from './Switcher';

import { logout, selectIsAuth } from '../redux/slices/authSlice';
import { selectTheme } from '../redux/slices/themeSlice';

const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const theme = useSelector(selectTheme);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClickLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<Navbar collapseOnSelect expand='lg' bg={theme} variant={theme}>
			<Container>
				<Navbar.Brand as={Link} to={'/'}>
					Collections
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						{isAuth ? (
							<>
								<Nav.Link as={Link} to={'/new-collection'}>
									New collection
								</Nav.Link>
								<Nav.Link as={Link} to={'/my-collections'}>
									My collections
								</Nav.Link>
								<Nav.Link className='link' as={Link} to={'/collections'}>
									Collections
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link className='link' as={Link} to={'/registration'}>
									Registration
								</Nav.Link>
								<Nav.Link className='link' as={Link} to={'/collections'}>
									Collections
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
				<ColorSwitches />
				{isAuth ? (
					<Button variant='danger' onClick={onClickLogout}>
						Exit
					</Button>
				) : (
					<Button as={Link} to={'/login'} variant='dark'>
						Login
					</Button>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
