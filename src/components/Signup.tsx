import React, { useState, useEffect, useReducer } from "react";
import jsonData from "../assets/Indiancitites.json"; // Import the JSON data
import {initialState, reducer} from "../util/redux"

export default function Signup() {
  const [options, setOptions] = useState<string[]>([]); // Specify the type as 'string[]'
  const [selectedOption, setSelectedOption] = useState<string>(""); // Specify the type as 'string'
  const [pincode, setpincode] = useState<string>("");
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [validationErrorPinCode, setValidationErrorPinCode] = useState("");
  const [dob, setDob] = useState('');
  const [validationErrorDob, setValidationErrorDob] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateEmail = (input:string) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePincode = (input:string) => {
    if (!/^\d{6}$/.test(input)) {
      return "Please enter 6 digit pincode";
    }
    return "";
  };

  const validateAge = (input:any) => {
    const currentDate = new Date();
    const inputDate = new Date(input);

    let age = currentDate.getFullYear() - inputDate.getFullYear();
    const monthDiff = currentDate.getMonth() - inputDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < inputDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return 'Age should be greater than 18';
    }

    return '';
  };

  useEffect(() => {
    const error = validateEmail(email);
    setValidationError(error);
  }, [email]);

  useEffect(() => {
    const error = validatePincode(pincode);
    setValidationErrorPinCode(error);
  }, [pincode]);

  useEffect(() => {
    const error = validateAge(dob);
    setValidationErrorDob(error);
  }, [dob]);

  useEffect(() => {
    setOptions(jsonData.cities); // Use the imported JSON data
    setSelectedOption(jsonData.cities[0]); // Set default selected option
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = (event:any) => {
    console.log(event.target.formData)
    event.preventDefault();
    dispatch({ type: "SUBMIT_FORM", formData: event.target.formData });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8" onSubmit={handleSubmit}>
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN UP
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Name</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />

          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {validationError && <p className="error ">{validationError}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Date of birth</label>
             <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              pattern="[0-9]{6}"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Enter your date of birth"
              title="Please enter your date of birth"
            />
             {validationErrorDob && <p className="error ">{validationErrorDob}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>City</label>
            <select
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              id="city"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Pin Code</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              pattern="[0-9]{6}"
              type="number"
              value={pincode}
              onChange={(e) => setpincode(e.target.value)}
              placeholder="Enter a 6-digit number"
              title="Please enter a 6-digit number"
            />
             {validationErrorPinCode && <p className="error ">{validationErrorPinCode}</p>}
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"  type="submit">
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}
