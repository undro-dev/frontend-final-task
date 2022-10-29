import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const { data } = await axios.get('/users');
	return data;
});
export const removeUsers = createAsyncThunk('users/removeUsers', async id => {
	await axios.post('/users/remove', { id });
});
export const fetchToggleBlockUser = createAsyncThunk(
	'users/toggleBlockUsers',
	async id => {
		await axios.post('/users/toggle-block', { id });
	}
);
export const fetchToggleAdmin = createAsyncThunk(
	'users/fetchToggleAdmin',
	async id => {
		await axios.post('/users/toggle-admin', { id });
	}
);

const initialState = {
	data: null,
	status: 'loading',
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchUsers.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchUsers.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		//removeUser
		[removeUsers.pending]: (state, action) => {
			state.data = state.data.filter(obj => obj._id !== action.meta.arg);
		},
		//toggleBlock User
		[fetchToggleBlockUser.pending]: (state, action) => {
			state.data = state.data.map(obj => {
				if (obj._id === action.meta.arg) obj.isBlock = !obj.isBlock;
				return obj;
			});
		},
		//toggle admin
		[fetchToggleAdmin.pending]: (state, action) => {
			state.data = state.data.map(obj => {
				if (obj._id === action.meta.arg) obj.isAdmin = !obj.isAdmin;
				return obj;
			});
		},
	},
});

export const usersReducer = usersSlice.reducer;
