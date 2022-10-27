import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../redux/slices/themeSlice';

import Switch from '@mui/material/Switch';
const GreenSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#F93154',
		'&:hover': {
			backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: pink[600],
	},
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ColorSwitches() {
	const dispatch = useDispatch();
	const theme = useSelector(selectTheme);

	const switchTheme = e => {
		dispatch(toggleTheme(e.target.checked));
	};
	return (
		<div>
			<GreenSwitch
				checked={theme === 'dark' ? true : false}
				onChange={e => switchTheme(e)}
				{...label}
				defaultChecked
			/>
		</div>
	);
}
