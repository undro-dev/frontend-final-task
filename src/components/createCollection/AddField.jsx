import React from 'react';
import Field from './Field';

const AddField = ({ additionalFields, removeField }) => {
	return (
		<>
			<p>Additional fields</p>
			<div className='d-flex justify-content-center flex-wrap'>
				{additionalFields.map((field, index) => (
					<Field
						key={field.select + index}
						{...field}
						removeField={removeField}
					/>
				))}
			</div>
		</>
	);
};

export default AddField;
