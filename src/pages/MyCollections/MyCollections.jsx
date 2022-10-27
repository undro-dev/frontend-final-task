import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchCollectionsById,
	fetchRemoveCollection,
} from '../../redux/slices/collectionsSlice';

import Form from 'react-bootstrap/Form';
import Header from '../../components/Header';
import CardItem from '../../components/CardItem';

import { sort } from '../../redux/slices/collectionsSlice';

export const MyCollections = () => {
	const dispatch = useDispatch();
	const { data, status } = useSelector(state => state.collections);

	const removeCollection = id => {
		dispatch(fetchRemoveCollection(id));
	};

	useEffect(() => {
		dispatch(fetchCollectionsById());
	}, []);

	return (
		<>
			<Header />

			<div className='container-sm pt-4 pb-4'>
				<div>
					<p>Sort by:</p>
					<Form.Select
						className='mb-3'
						size='sm'
						onChange={e => dispatch(sort(e.target.value))}
					>
						<option value='dateDsc'>Date DSC</option>
						<option value='dateAsc'>Date ASC</option>
						{/* <option value='popularDsc'>Popular DSC</option>
						<option value='popularAsc'>Popular ASC</option> */}
					</Form.Select>
				</div>
				{status === 'loaded' ? (
					<div className='d-flex flex-column'>
						{data.length === 0 ? (
							<h1>You don't have your own collections</h1>
						) : (
							data.map(col => (
								<CardItem
									key={col._id}
									{...col}
									removeCollection={removeCollection}
								/>
							))
						)}
					</div>
				) : null}
			</div>
		</>
	);
};
