import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

import Header from '../../components/Header';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import SelectAutoWidth from './Select';
import SimpleMDE from 'react-simplemde-editor';
import FormForFields from '../../components/createCollection/Form';
import AddField from '../../components/createCollection/AddField';

import { toast } from 'react-toastify';

import styles from './CreateCollection.module.scss';
import 'easymde/dist/easymde.min.css';

import axios from '../../axios.js';

const CreateCollection = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [themeCollection, setThemeCollection] = useState('books');
	const [image, setImage] = useState('');
	const inputFileRef = useRef(null);

	const [additionalFields, setAdditionalFields] = useState([]);

	const onChangeFields = obj => {
		setAdditionalFields([...additionalFields, obj]);
	};

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '200px',
			autofocus: true,
			placeholder: 'Enter text...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	useEffect(() => {
		if (id) {
			axios.get(`/my-collections/${id}`).then(({ data }) => {
				setThemeCollection(data.theme);
				setTitle(data.title);
				setDescription(data.description);
				setImage(data.imageUrl);
			});
		}
		setTitle('');
		setDescription('');
	}, [id]);

	const handleChangeFile = async e => previewFiles(e.target.files[0]);

	const previewFiles = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	};

	const onChange = useCallback(value => {
		setDescription(value);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		const dataCollection = {
			themeCollection,
			description,
			title,
			image,
			additionalFields,
		};

		if (title === '' || description === '') {
			return toast.error('Fill in all the fields!!!');
		}
		if (title.length < 3 || description.length < 5) {
			return toast.error('Short title or description!!!');
		}

		id
			? await axios.patch(`/collection/${id}`, dataCollection)
			: await axios.post('/collection', dataCollection);

		navigate('/my-collections');
	};

	const removeField = id =>
		setAdditionalFields(fields => fields.filter(field => field.id !== id));

	return (
		<>
			<Header />
			<div className='container-sm pt-4 pb-4 bg-light rounded'>
				<Button
					className='me-4  mb-4'
					onClick={() => inputFileRef.current.click()}
					variant='dark'
				>
					Download image
				</Button>
				{image === '' ? null : (
					<Button
						variant='danger'
						onClick={() => setImage('')}
						className='mb-4'
					>
						Delete image
					</Button>
				)}
				<input
					ref={inputFileRef}
					type='file'
					onChange={handleChangeFile}
					hidden
				/>
				<SelectAutoWidth
					setThemeCollection={setThemeCollection}
					themeCollection={themeCollection}
				/>
				<TextField
					classes={{ root: styles.title }}
					variant='standard'
					placeholder='Collection title...'
					fullWidth
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				{image === '' ? null : (
					<img
						src={image}
						alt='emblem'
						className='rounded mx-auto d-block w-25 h-25'
					/>
				)}
				<div>
					<FormForFields
						additionalFields={additionalFields}
						onChangeFields={onChangeFields}
					/>
				</div>
				<div>
					<AddField
						additionalFields={additionalFields}
						removeField={removeField}
					/>
				</div>
				<SimpleMDE
					className={styles.editor}
					value={description}
					onChange={onChange}
					options={options}
				/>
				<div className='mt-4'>
					<Button
						variant='dark'
						onClick={e => handleSubmit(e)}
						className='me-4'
					>
						{id ? 'Edit' : 'Create'}
					</Button>
					<Button variant='dark'>Cancel</Button>
				</div>
			</div>
		</>
	);
};

export default CreateCollection;
