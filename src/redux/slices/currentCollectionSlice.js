import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchOneCollection = createAsyncThunk(
	'collections/fetchOneCollection',
	async id => {
		const { data } = await axios.get(`/my-collections/${id}`);
		return data;
	}
);

const initialState = {
	data: null,
	status: 'loading',
};

const currentCollectionSlice = createSlice({
	name: 'currentCollection',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchOneCollection.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchOneCollection.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchOneCollection.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
	},
});

export const currentCollectionReducer = currentCollectionSlice.reducer;
