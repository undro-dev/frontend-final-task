import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function SelectAutoWidth({
	setThemeCollection,
	themeCollection,
}) {
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel variant='standard' htmlFor='uncontrolled-native'>
					Theme
				</InputLabel>
				<NativeSelect
					onChange={e => setThemeCollection(e.target.value)}
					value={themeCollection}
					inputProps={{
						name: 'theme',
						id: 'uncontrolled-native',
					}}
				>
					<option value='books'>Books</option>
					<option value='signs'>Signs</option>
					<option value='films'>Films</option>
				</NativeSelect>
			</FormControl>
		</Box>
	);
}
