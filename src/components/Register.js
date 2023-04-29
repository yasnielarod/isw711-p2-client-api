import axios from "axios";
import { useState } from "react";
import {sendEmail} from "../helpers/sendEmail.js"
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const userData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  addressOne: "",
  addressTwo: "",
  country: "",
  city: "",
  postalCode: "",
  phoneNumber: 0,
  role: "user",
};
const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(userData);
  const [error, setError] = useState({});
  const [errorServer, setErrorServer] = useState("");

  const handleChangeInput = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const errors = validateForm(register);
    //Valida se encuentran errores
    if (Object.keys(errors).length === 0) {
      console.log("Sin error");
      console.log(register);
      axios
        .post(
          "http://localhost:4000/api/user/",
          {
            firstName: register.firstName,
            lastName: register.lastName,
            email: register.email,
            password: register.password,
            addressOne: register.addressOne,
            addressTwo: register.addressOne,
            country: register.addressTwo,
            city: register.city,
            postalCode: register.postalCode,
            phoneNumber: parseInt(register.phoneNumber),
            role: register.role,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const email = res.data.data.email;
          const token = res.data.token;
          console.log(email, token);
          const nameWin = "confirm-email";
          sendEmail(nameWin, email, token);
          sessionStorage.setItem(
            "userRegister",
            JSON.stringify(res.data.data._id)
          );
          navigate("/waiting-email")
        })
        .catch((err) => {
          if (err.response.status === 403)
            setErrorServer(err.response.data.error);
        });
    } else {
      setError(errors);
      console.log(errors);
    }
  };
  const validateForm = (values) => {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.addressOne) {
      errors.addressOne = "Address is required";
    }
    if (!values.addressTwo) {
      errors.addressTwo = "Address 2 is required";
    }
    if (!values.country) {
      errors.country = "Country is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!values.postalCode) {
      errors.postalCode = "Zip/Postal Code is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone number is invalid";
    }
    return errors;
  };


  return (
    <div className='wrapper'>

      <h1>User Registration</h1>
        <p>----------------------------------------------------------------------</p>
          <input className="input_register input" type="text"  placeholder="First Name" name='firstName' onChange={handleChangeInput} required/>
          <input className="input_register input"  type="text" placeholder="Last Name" name='lastName' onChange={handleChangeInput} required/><br/>
          {error.firstName && <div>{error.firstName}</div>}
          {error.lastName && <div>{error.lastName}</div>}
          <input className="input_register input" type="email" placeholder="Email Address" name="email" onChange={handleChangeInput} required/>          
          <input className="input_register input" type="password" placeholder="Password" name="password" onChange={handleChangeInput} required/>
          {error.email && <div>{error.email}</div>}
          {error.password && <div>{error.password}</div>}
          <br/><input className="addresses input" type="text" placeholder="Address" name="addressOne" onChange={handleChangeInput} required/>
          {error.addressOne && <div>{error.addressOne}</div>}
          <br/><input className="addresses input" type="text" placeholder="Address 2" name="addressTwo" onChange={handleChangeInput}/>
          {error.addressTwo && <div>{error.addressTwo}</div>}
          <br/><select id="country_select" name='country' onChange={handleChangeInput} required>
              <option>Country</option>
              <option>Argentina</option>
              <option>Bolivia</option>
              <option>Brasil</option>
              <option>Chile</option>
              <option>Colombia</option>
              <option>Costa Rica</option>
              <option>Cuba</option>
              <option>Ecuador</option>
              <option>El Salvador</option>
              <option>Guayana Francesa</option>
              <option>Granada</option>
              <option>Guatemala</option>
              <option>Guayana</option>
              <option>Haití</option>
              <option>Honduras</option>
              <option>Jamaica</option>
              <option>México</option>
              <option>Nicaragua</option>
              <option>Paraguay</option>
              <option>Panamá</option>
              <option>Perú</option>
              <option>Puerto Rico</option>
              <option>República Dominicana</option>
              <option>Surinam</option>
              <option>Uruguay</option>
              <option>Venezuela</option>
          </select>         
          <input className="input_register input" type="text" placeholder="City" name="city" onChange={handleChangeInput} required/>
          {error.country && <div>{error.country}</div>}
          {error.city && <div>{error.city}</div>}
          <br/><input className="input_register input" type="text" placeholder="Zip/Postal Code" name="postalCode" onChange={handleChangeInput}  required/>
          <input className="input_register input" type="tel" placeholder="Phone Number" name="phoneNumber" onChange={handleChangeInput} required/>
          {error.postalCode && <div>{error.postalCode}</div>}
          {error.phoneNumber && <div>{error.phoneNumber}</div>}
        <p>----------------------------------------------------------------------</p> 
        {errorServer && <div>{errorServer}</div>}
        <button id="b_buscador" className="button-r" onClick={handleRegister}>Sign up</button>
        <button id="b_buscador" className="button-r" onClick={handleCancel}>Cancel</button>
     
    </div>
  )
};

export default Register;
