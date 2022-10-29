import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserAuth = createAsyncThunk(
	'auth/fetchUserAuth',
	async params => {
		const { data } = await axios.post('/auth/login', params);
		return data;
	}
);
export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async params => {
		const { data } = await axios.post('/auth/register', params);
		return data;
	}
);
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/me');
	return data;
});
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const { data } = await axios.get('/users');
	return data;
});

const initialState = {
	data: null,
	status: 'loading',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null;
		},
	},
	extraReducers: {
		//Login
		[fetchUserAuth.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchUserAuth.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchUserAuth.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		// Check auth
		[fetchAuthMe.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAuthMe.rejected]: state => {
			state.data = null;
			state.status = 'error';
		},
		// Registration
		[fetchRegister.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: state => {
			state.data = null;
			state.status = 'error';
		},
	},
});

export const selectIsAuth = state => Boolean(state.auth.data);
export const selectUser = state => state.auth.data;
export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
