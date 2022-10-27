import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Accord from '../../components/itemOfCollection/createItem';
import Tr from '../../components/itemOfCollection/tr';
import Table from 'react-bootstrap/Table';

import { fetchItemsById, fetchRemoveItem } from '../../redux/slices/itemsSlice';
import { selectTheme } from '../../redux/slices/themeSlice';
import { fetchCollectionsById } from '../../redux/slices/collectionsSlice';

const Collection = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const theme = useSelector(selectTheme);
	const { data, status } = useSelector(state => state.items);
	const { data: authData, status: authStatus } = useSelector(
		state => state.auth
	);
	const { data: collectionsUser, status: statusCollectionsUser } = useSelector(
		state => state.collections
	);

	let currentCollection;

	if (statusCollectionsUser === 'loaded') {
		currentCollection = collectionsUser.find(col => col._id === id);
	}

	useEffect(() => {
		dispatch(fetchCollectionsById());
		dispatch(fetchItemsById(id));
	}, []);

	let isOwnerCollection = false;

	if (
		status === 'loaded' &&
		authStatus === 'loaded' &&
		statusCollectionsUser === 'loaded'
	) {
		const currentCollection = collectionsUser.find(col => col._id === id);
		if (currentCollection) {
			currentCollection.user !== authData._id
				? (isOwnerCollection = false)
				: (isOwnerCollection = true);
		}
	}

	const removeItem = id => dispatch(fetchRemoveItem(id));

	return (
		<>
			<Header />
			<div className='container-sm'>
				<Table className='mt-4' striped hover variant={theme}>
					<thead>
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>Title</th>
							<th>Date</th>
							<th>Control</th>
						</tr>
					</thead>
					<tbody>
						{status === 'loaded' && authStatus === 'loaded'
							? data.map((item, index) => (
									<Tr
										key={item._id}
										{...item}
										index={index}
										removeItem={removeItem}
										isOwnerCollection={isOwnerCollection}
									/>
							  ))
							: null}
					</tbody>
				</Table>
				{isOwnerCollection ? (
					<Accord currentCollection={currentCollection} id={id} />
				) : null}
			</div>
		</>
	);
};

export default Collection;
