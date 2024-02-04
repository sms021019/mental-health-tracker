import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {updateUserAPIMethod} from "../../api/client"

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

  const handleSubmit = async (event) => {
    console.log("Submitting form:", formData);
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Submission successful", data);
      // Handle success (e.g., navigate to a different page or show a success message)
    } catch (error) {
      console.error("Submission failed", error);
      // Handle error (e.g., show an error message)
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
