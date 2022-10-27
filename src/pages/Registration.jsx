import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Footer } from '../components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { selectTheme } from '../redux/slices/themeSlice';
import { fetchRegister, selectIsAuth } from '../redux/slices/authSlice';

export const Registration = () => {
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
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister(values));

		if (!data.payload) return toast.error('Failed to register!!!');

		if ('token' in data.payload)
			window.localStorage.setItem('token', data.payload.token);
	};

	if (isAuth) navigate('/');
	return (
		<>
			<Header />
			<div className='container-sm d-flex justify-content-center'>
				<Form onSubmit={handleSubmit(onSubmit)} className='w-50'>
					<Form.Group className='mb-3 mt-3' controlId='formBasicEmail'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your name'
							{...register('fullName', { required: 'Enter your name' })}
						/>
						<div className='d-flex flex-column'>
							{errors.fullName ? (
								<Form.Text className='text-danger'>
									{errors.fullName.message}
								</Form.Text>
							) : null}
						</div>
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
						{errors.password ? (
							<Form.Text className='text-danger'>
								{errors.password.message}
							</Form.Text>
						) : null}
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='formBasicCheckbox'
					></Form.Group>
					<Button variant={theme} type='submit'>
						Register
					</Button>
				</Form>
			</div>
			<Footer />
		</>
	);
};
