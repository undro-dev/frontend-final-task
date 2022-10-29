import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';
import { TrUsers } from './TrUsers';

const TableUsers = ({ users, removeUser, toggleBlockUser, userControl }) => {
	const theme = useSelector(selectTheme);

	return (
		<Table className='mt-3' variant={theme}>
			<thead>
				<tr className='text-center'>
					<th>#</th>
					<th>Name</th>
					<th>Email</th>
					<th>Admin</th>
					<th>Controls</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => (
					<TrUsers
						key={user._id}
						{...user}
						index={index + 1}
						theme={theme}
						userControl={userControl}
					/>
				))}
			</tbody>
		</Table>
	);
};

export default TableUsers;
