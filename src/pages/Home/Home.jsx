import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import TableItems from '../../components/Home/TableItems';
import CardItem from '../../components/CardItem';

import {
	fetchAllCollections,
	fetchRemoveCollection,
} from '../../redux/slices/collectionsSlice';
import { fetchAllItems } from '../../redux/slices/itemsSlice';

const Home = () => {
	const dispatch = useDispatch();
	const { data, status } = useSelector(state => state.items);
	const { data: dataCollections, status: statusCollections } = useSelector(
		state => state.collections
	);

	let topLongestCollections;

	if (statusCollections === 'loaded') {
		topLongestCollections = [...dataCollections]
			.sort((a, b) => b.countItems.length - a.countItems.length)
			.splice(0, 5);
	}

	const removeCollection = id => {
		dispatch(fetchRemoveCollection(id));
	};

	useEffect(() => {
		dispatch(fetchAllItems());
		dispatch(fetchAllCollections());
	}, []);

	return (
		<>
			<Header />
			<div className='container'>
				<div>
					<h3>Items</h3>
					{status === 'loaded' ? <TableItems items={data.slice(0, 5)} /> : null}
				</div>
				<div>
					<h3>Collections</h3>
					{statusCollections === 'loaded' ? (
						<div className='d-flex flex-column'>
							{topLongestCollections.map(col => (
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

export default Home;
