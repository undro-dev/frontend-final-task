import Accordion from 'react-bootstrap/Accordion';
import FormForItem from './form';

function Accord({ id, currentCollection }) {
	return (
		<Accordion defaultActiveKey='1' className='mt-4'>
			<Accordion.Item eventKey='1'>
				<Accordion.Header>Create item of collection</Accordion.Header>
				<Accordion.Body>
					<FormForItem currentCollection={currentCollection} id={id} c />
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export default Accord;
