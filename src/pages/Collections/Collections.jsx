import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardItem from '../../components/CardItem';
import Header from '../../components/Header';

import {
	fetchAllCollections,
	fetchRemoveCollection,
} from '../../redux/slices/collectionsSlice';

const Collections = () => {
	const dispatch = useDispatch();
	const { data: dataCollections, status: statusCollections } = useSelector(
		state => state.collections
	);

	const removeCollection = id => {
		dispatch(fetchRemoveCollection(id));
	};

	useEffect(() => {
		dispatch(fetchAllCollections());
	}, []);
	return (
		<>
			<Header />
			<div className='container'>
				<div className='mt-2'>
					<h3>
						{statusCollections === 'loaded' && dataCollections.length === 0
							? 'No collections'
							: 'Collections'}
					</h3>
					{statusCollections === 'loaded' ? (
						<div className='d-flex flex-column'>
							{dataCollections.map(col => (
								<CardItem
									key={col._id}
									{...col}
									removeCollection={removeCollection}
								/>
							))}
						</div>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Collections;
