import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCommentsById = createAsyncThunk(
	'comments/fetchCommentsById',
	async id => {
		const { data } = await axios.get(`/items/${id}/comments`);
		return data;
	}
);

const initialState = {
	data: null,
	status: 'loading',
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: {
		//Find comments by ID
		[fetchCommentsById.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchCommentsById.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchCommentsById.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
	},
});
export const { addComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
