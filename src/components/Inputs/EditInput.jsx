import React from "react";

const EditInput = ({ label, value, onChange, editable, onEditClick }) => {
  return (
    <div style={inputContainerStyle}>
      <div style={labelRowStyle}>
        <span>{label}</span>
        <span style={editTextStyle} onClick={onEditClick}>
          Edit
        </span>
      </div>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          style={inputStyle}
        />
      ) : (
        <span style={valueStyle}>{value}</span>
      )}
    </div>
  );
};

const inputContainerStyle = {
  backgroundColor: "#AFA8D1",
  borderRadius: "12px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "#333",
  width: "100%",
};

const labelRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 500,
  fontSize: "14px",
};

const valueStyle = {
  fontWeight: 600,
  fontSize: "16px",
};

const editTextStyle = {
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "14px",
};

const inputStyle = {
  borderRadius: "8px",
  border: "none",
  padding: "8px",
  fontSize: "15px",
};

export default EditInput;
