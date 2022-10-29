import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice.js';
import { collectionsReducer } from './slices/collectionsSlice.js';
import { commentsReducer } from './slices/commentsSlice.js';
import { currentCollectionReducer } from './slices/currentCollectionSlice.js';
import { currentItemReducer } from './slices/currentItem.js';
import { itemsReducer } from './slices/itemsSlice.js';
import { themeReducer } from './slices/themeSlice.js';
import { usersReducer } from './slices/usersSlice.js';

const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
		collections: collectionsReducer,
		items: itemsReducer,
		currentItem: currentItemReducer,
		comments: commentsReducer,
		users: usersReducer,
		currentCollection: currentCollectionReducer,
	},
});

export default store;
