import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	theme: window.localStorage.getItem('theme') || 'dark',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state, action) => {
			if (action.payload) {
				state.theme = 'dark';
				window.localStorage.setItem('theme', 'dark');
			} else {
				state.theme = 'light';
				window.localStorage.setItem('theme', 'light');
			}
		},
	},
});

export const selectTheme = state => state.theme.theme;
export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
