import React, { useState } from 'react';

const EditInput = ({ label, value, onChange }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div>
			<div>
				<label>{label}</label>
				<span onClick={() => setIsEditing(!isEditing)}>Edit</span>
			</div>

			{isEditing ? <input type='text' value={value} onChange={onChange} /> : <div>{value}</div>}
		</div>
	);
};

export default EditInput;
