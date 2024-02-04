import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {updateUserAPIMethod, getUserById} from "../../api/client"
import { selectUser } from '../../features/userSlice';
import { useSelector } from "react-redux";

import './personalInfo.css';

function Radio({ options, name, handleChange }) {
  return (
    <div className="mydict">
      <div>
        {options.map((option, index) => (
          <label key={index}>
            <input type="radio" name={name} value={option} onChange={handleChange} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const Button = ({ text, to, isFormComplete }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isFormComplete) {
      e.preventDefault();
      return;
    }
    navigate(to);
  };

  const btnStyle = !isFormComplete ? { pointerEvents: 'none', opacity: 0.5 } : {};

  return (
    <div className="btn_container" onClick={handleClick} style={btnStyle}>
      {text}
    </div>
  );
};


function AgeInput({ value, onChange }) {
  const numericValue = parseInt(value) || 0;

  return (
    <div className="number-control">
      <div className="number-left" onClick={() => onChange(Math.max(0, numericValue - 1))}></div>
      <input
        type="number"
        name="age"
        value={numericValue}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        placeholder="Age"
      />
      <div className="number-right" onClick={() => onChange(numericValue + 1)}></div>
    </div>
  );
}


function PersonalInfo() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    marriageStatus: '',
    occupation: '',
    pronoun: '',
    ethnicity: '',
    averageSleepingHours: ''
  });

  const valueFromLocalStorage = localStorage.getItem('token');
  console.log("VAL: ", valueFromLocalStorage);

  const navigate = useNavigate();
  const user = getUserById(valueFromLocalStorage);
  console.log("USER: ", user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAgeChange = (newValue, fieldName) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: newValue
    }));
  };

//   const handleSubmit = async (event) => {
//     // event.preventDefault(); // Prevents the default form submission behavior
//     console.log("Submitting form:", formData);
//     try {
//         const res = await updateUserAPIMethod(valueFromLocalStorage);
//         if(res.ok) {
//             const jsonResult = await res.json();
//             console.log(jsonResult);
//             navigate("/dashboard");
//         }
//     } catch(error) {
//         console.error("Error updating user:", error);
//         // Handle the error appropriately here
//     }
// };

const handleSubmit = async (event) => {
  // event.preventDefault(); // Prevents the default form submission behavior
  console.log("Submitting form:", formData);
  try {
      // Use formData instead of user for the update
      const res = await updateUserAPIMethod(valueFromLocalStorage, formData);
      if(res.ok) {
          const jsonResult = await res.json();
          console.log(jsonResult);
          navigate("/dashboard"); // Navigate on successful update
      } else {
          // Handle non-ok responses here, if needed
          console.error("Failed to update user");
      }
  } catch(error) {
      console.error("Error updating user:", error);
      // Handle the error appropriately here
  }
};


  const isFormComplete = Object.values(formData).every(value => value !== '');


  return (
    <div>
      <h2>Before we start, tell us about yourself</h2>
      <form onSubmit={handleSubmit}>
        <div className={"topic_container"}>
          <label>Gender:</label>
          <Radio options={["Women", "Men", "Divided"]} name="gender" handleChange={handleChange} />
        </div>
        <div className={"topic_container"}>
          <label>Age:</label>
          <AgeInput value={formData.age} onChange={(newValue) => handleAgeChange(newValue, 'age')} />
        </div>
        <div className={"topic_container"}>
          <label>Marital Status:</label>
          <Radio options={["Single", "Married"]} name="marriageStatus" handleChange={handleChange} />
        </div>
        <div className='occupation_container'>
          <label>Occupation:</label>
          <input
            type="text"
            className="input"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Occupation"
          />
        </div>
        <div>
          <label>Pronouns:</label>
          <Radio options={["He/Him", "She/Her", "They/Them", "Ze/Zir", "Prefer not to say"]} name="pronoun" handleChange={handleChange} />
        </div>
        <div className='ethnicity_container'>
          <label>Ethnicity:</label>
          <Radio options={["Asian", "American"]} name="ethnicity" handleChange={handleChange} />
        </div>
        <div className='occupation_container'>
          <label>Average Sleeping Hours:</label>
          <AgeInput value={formData.averageSleepingHours} onChange={(newValue) => handleAgeChange(newValue, 'averageSleepingHours')} />
        </div>
        <div className='submit_container' onClick={() => isFormComplete ? handleSubmit() : void 0}>

          <Button text={"Submit"} to={"/dashboard"} isFormComplete={isFormComplete}/>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
