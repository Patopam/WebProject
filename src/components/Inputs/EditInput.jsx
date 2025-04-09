import React from 'react';

const EditInput = ({ label, value, onChange, editable }) => {
	return (
		<div>
			<label>{label}</label>
			{editable ? <input type='text' value={value} onChange={onChange} /> : <span>{value}</span>}
		</div>
	);
};

export default EditInput;
