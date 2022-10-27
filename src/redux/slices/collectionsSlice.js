import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCollectionsById = createAsyncThunk(
	'collections/fetchCollectionsById',
	async () => {
		const { data } = await axios.get('/my-collections');
		return data;
	}
);
export const fetchAllCollections = createAsyncThunk(
	'collections/fetchAllCollections',
	async () => {
		const { data } = await axios.get('/collections');
		return data;
	}
);
export const fetchRemoveCollection = createAsyncThunk(
	'collections/fetchRemoveCollection',
	async id => await axios.delete(`/my-collections/${id}`)
);

const initialState = {
	data: null,
	status: 'loading',
};

const collectionsSlice = createSlice({
	name: 'collections',
	initialState,
	reducers: {
		sort: (state, action) => {
			const arr = [...state.data];

			if (action.payload === 'dateAsc') {
				arr.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
				state.data = arr;
			} else if (action.payload === 'dateDsc') {
				arr.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
				state.data = arr;
			}
		},
	},
	extraReducers: {
		//Find collection by ID
		[fetchCollectionsById.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchCollectionsById.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchCollectionsById.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		//Fetch all collections
		[fetchAllCollections.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAllCollections.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAllCollections.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		//Remove collection
		[fetchRemoveCollection.pending]: (state, action) => {
			state.data = state.data.filter(obj => obj._id !== action.meta.arg);
		},
	},
});

// export const selectIsAuth = state => Boolean(state.auth.data);
export const { sort } = collectionsSlice.actions;

export const collectionsReducer = collectionsSlice.reducer;
