import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchGetOneItem = createAsyncThunk(
	'currentItem/fetchGetOneItem',
	async id => {
		const { data } = await axios.get(`/items/${id}`);
		return data;
	}
);

const initialState = {
	data: null,
	status: 'loading',
};

const currentItemSlice = createSlice({
	name: 'currentItem',
	initialState,
	reducers: {
		toggleLike: (state, action) => {
			if (!state.data.likes.includes(action.payload)) {
				state.data.likes.push(action.payload);
			} else {
				const index = state.data.likes.findIndex(
					like => like === action.payload
				);
				state.data.likes.splice(index, 1);
			}
		},
	},
	extraReducers: {
		//Find item
		[fetchGetOneItem.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchGetOneItem.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchGetOneItem.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
	},
});

// export const selectIsAuth = state => Boolean(state.auth.data);
export const { toggleLike } = currentItemSlice.actions;

export const currentItemReducer = currentItemSlice.reducer;
