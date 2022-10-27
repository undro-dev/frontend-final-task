import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';
import { Tr } from './Tr';

const TableItems = ({ items }) => {
	const theme = useSelector(selectTheme);
	return (
		<Table variant={theme}>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Collection</th>
					<th>Author</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<Tr key={item._id} {...item} index={index + 1} />
				))}
			</tbody>
		</Table>
	);
};

export default TableItems;
