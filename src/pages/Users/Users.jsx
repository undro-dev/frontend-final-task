import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import TableUsers from '../../components/Users/TableUsers';
import { fetchAuthMe, fetchUsers } from '../../redux/slices/authSlice';

import {
	fetchToggleAdmin,
	fetchToggleBlockUser,
	removeUsers,
} from '../../redux/slices/usersSlice';

const Users = () => {
	const dispatch = useDispatch();
	const { data, status } = useSelector(state => state.users);

	const userControl = {
		async removeUser(id) {
			dispatch(removeUsers(id));
			dispatch(fetchAuthMe());
		},
		async toggleBlockUser(id) {
			dispatch(fetchToggleBlockUser(id));
		},
		async toggleAdmin(id) {
			dispatch(fetchToggleAdmin(id));
		},
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<>
			<Header />
			<div className='container'>
				{status === 'loaded' ? (
					<TableUsers users={data} userControl={userControl} />
				) : null}
			</div>
		</>
	);
};

export default Users;
