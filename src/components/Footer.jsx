import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

export const Footer = () => {
	const theme = useSelector(selectTheme);
	return (
		<>
			<Navbar className='fixed-bottom' bg={theme} variant={theme}>
				<Container>
					<Navbar.Brand href='https://www.linkedin.com/in/vitali-undro/'>
						Vitaly Undro
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
};
