import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Footer } from '../components/Footer';

import { selectTheme } from '../redux/slices/themeSlice';
import { fetchUserAuth, selectIsAuth } from '../redux/slices/authSlice';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const theme = useSelector(selectTheme);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async values => {
		const data = await dispatch(fetchUserAuth(values));

		if (!data.payload) return toast.error('Failed to login!!!');

		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};

	if (isAuth) navigate('/my-collections');
	return (
		<>
			<Header />
			<div className='container-sm d-flex justify-content-center'>
				<Form className='w-50' onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className='mb-3 mt-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							{...register('email', { required: 'Enter your email' })}
						/>

						<div className='d-flex flex-column'>
							{errors.email ? (
								<Form.Text className='text-danger'>
									{errors.email.message}
								</Form.Text>
							) : null}
						</div>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							{...register('password', { required: 'Enter your password' })}
						/>
						<div className='d-flex flex-column'>
							{errors.password ? (
								<Form.Text className='text-danger'>
									{errors.password.message}
								</Form.Text>
							) : null}
						</div>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='formBasicCheckbox'
					></Form.Group>
					<Button variant={theme} type='submit'>
						Login
					</Button>
				</Form>
			</div>
			<Footer />
		</>
	);
};
