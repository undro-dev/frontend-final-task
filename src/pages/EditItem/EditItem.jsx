import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Accordion from 'react-bootstrap/Accordion';
import FormForItem from '../../components/itemOfCollection/form';

const EditItem = () => {
	const { id } = useParams();

	let currentItem;

	const { data, status } = useSelector(state => state.items);

	if (status === 'loaded') currentItem = data.find(item => item._id === id);

	return (
		<>
			<Header />
			<div className='container-sm'>
				<Accordion defaultActiveKey='1' className='mt-4'>
					<Accordion.Item eventKey='1'>
						<Accordion.Header>Edit item of collection</Accordion.Header>
						<Accordion.Body>
							<FormForItem id={id} currentItem={currentItem} />
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</div>
		</>
	);
};

export default EditItem;
