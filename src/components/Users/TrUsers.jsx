import React from 'react';
import Button from 'react-bootstrap/Button';

export const TrUsers = ({
	index,
	fullName,
	email,
	isAdmin,
	theme,
	userControl,
	isBlock,
	_id,
}) => {
	return (
		<tr className='text-center'>
			<td>{index}</td>
			<td>{fullName}</td>
			<td>{email}</td>
			<td>
				<Button
					onClick={e => userControl.toggleAdmin(_id)}
					variant={theme === 'dark' ? 'light' : 'dark'}
				>
					{isAdmin ? 'Delete' : 'Add'}
				</Button>
			</td>
			<td className='d-flex justify-content-around'>
				<Button
					variant={theme === 'dark' ? 'light' : 'dark'}
					onClick={() => userControl.toggleBlockUser(_id)}
					className='w-25'
				>
					{isBlock ? 'Unlock' : 'Block'}
				</Button>
				<Button
					variant={theme === 'dark' ? 'light' : 'dark'}
					onClick={() => userControl.removeUser(_id)}
				>
					Delete
				</Button>
			</td>
		</tr>
	);
};
