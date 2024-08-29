// CustomInput.js
import React from 'react';
import '../css/Careers.css'; // Ensure this path is correct based on your project structure

const CustomInput = ({ id, label, type = "text", value, onChange }) => {
  return (
    <div className="input-container">
    <input type={type} id={id} className="custom-input" placeholder=" " value={value} onChange={onChange}/>
    <label className="custom-label" htmlFor={id}>{label}</label>
  </div>
  );
};
// const CustomInput = ({ id, label, type = "text", value, onChange }) => (
//   <div className="form-group">
//     <label htmlFor={id}>{label}</label>
//     <input type={type} className="form-control" id={id} value={value} onChange={onChange} />
//   </div>
// );
export default CustomInput;
