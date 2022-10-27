import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchItemsById = createAsyncThunk(
	'items/fetchItemsById',
	async id => {
		const { data } = await axios.get(`/my-collections/items/${id}`);
		return data;
	}
);
export const fetchAllItems = createAsyncThunk(
	'items/fetchAllItems',
	async () => {
		const { data } = await axios.get(`/items`);
		return data;
	}
);
export const fetchRemoveItem = createAsyncThunk(
	'items/fetchRemoveItem',
	async id => await axios.delete(`/items/${id}`)
);

const initialState = {
	data: null,
	status: 'loading',
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {},
	extraReducers: {
		//Find items by ID
		[fetchItemsById.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchItemsById.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchItemsById.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		//Get all items
		[fetchAllItems.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAllItems.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAllItems.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		//Delete items by
		[fetchRemoveItem.pending]: (state, action) => {
			state.data = state.data.filter(obj => obj._id !== action.meta.arg);
		},
	},
});

export const itemsReducer = itemsSlice.reducer;
