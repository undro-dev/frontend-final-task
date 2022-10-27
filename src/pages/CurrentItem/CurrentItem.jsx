import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Item from '../../components/currentItem/Item';

import { fetchGetOneItem } from '../../redux/slices/currentItem';

const CurrentItem = () => {
	const { id } = useParams();
	const { data, status } = useSelector(state => state.currentItem);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetOneItem(id));
	}, []);

	return (
		<>
			<Header />
			<div className='container-sm pt-5 pb-5'>
				{status === 'loaded' ? <Item {...data} id={id} /> : <h1>Loading...</h1>}
			</div>
		</>
	);
};

export default CurrentItem;
