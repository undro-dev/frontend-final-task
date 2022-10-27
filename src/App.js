import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import { Login } from './pages/Login.jsx';
import { Registration } from './pages/Registration.jsx';

import { MyCollections } from './pages/MyCollections/MyCollections.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from './redux/slices/authSlice.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateCollection from './pages/CreateCollection/CreateCollection.jsx';
import Collection from './pages/Collection/Collection.jsx';
import EditItem from './pages/EditItem/EditItem.jsx';
import CurrentItem from './pages/CurrentItem/CurrentItem.jsx';
import Collections from './pages/Collections/Collections.jsx';
import { selectTheme } from './redux/slices/themeSlice.js';

function App() {
	const themeApp = useSelector(selectTheme);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	if (themeApp === 'dark') {
		document.body.style.backgroundColor = '#292b2c';
		document.body.style.color = '#FBFBFB';
	} else {
		document.body.style.backgroundColor = '#FBFBFB';
	}

	return (
		<div className={'App vh-100'}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/new-collection' element={<CreateCollection />} />
				<Route path='/my-collections' element={<MyCollections />} />
				<Route path='/my-collections/:id/edit' element={<CreateCollection />} />
				<Route path='/items/:id/edit' element={<EditItem />} />
				<Route path='/my-collections/:id' element={<Collection />} />
				<Route path='/items/:id' element={<CurrentItem />} />
				<Route path='/collections' element={<Collections />} />
			</Routes>
			<ToastContainer position='top-right' />
		</div>
	);
}

export default App;
