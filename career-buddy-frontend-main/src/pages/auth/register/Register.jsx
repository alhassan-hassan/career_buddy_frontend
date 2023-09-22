import { useState } from "react";
import { userRegister } from "@network/api-handlers";
import { useNavigate, Link } from "react-router-dom";

import {
  STUDENT_ID,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PASSWORD,
  REPEAT_PASSWORD,
} from "@utils/constants";

import { validateFormFields } from "@utils/functions";

import registerStyles from "./register.module.scss";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    [STUDENT_ID]: "",
    [FIRST_NAME]: "",
    [LAST_NAME]: "",
    [EMAIL]: "",
    [PASSWORD]: "",
    [REPEAT_PASSWORD]: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    userID: [""],
    email: [""],
    password: [""],
  });

  const handleFieldChange = (e) => {
    let registerField = e.target.name;
    const newRegisterFieldValue = { [registerField]: e.target.value };
    setRegisterData({ ...registerData, ...newRegisterFieldValue });
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    const { fieldsAreValid, message } = validateFormFields(registerData);
    if (!fieldsAreValid) {
      alert(message);
      return;
    }

    // GETTING DATA FOR BACKEND
    const userRegisterData = {
      userID: registerData[STUDENT_ID],
      fName: registerData[FIRST_NAME],
      lName: registerData[LAST_NAME],
      email: registerData[EMAIL],
      password: registerData[PASSWORD],
      password_confirmation: registerData[REPEAT_PASSWORD],
    };

    // MAKING A POST REQUEST TO THE BACKEND

    try {
      const response = await userRegister(userRegisterData);
      console.log(response);

      if (response.data.ok) {
        alert("successfully registered, please login");
        navigate(`/login`);
      } else {
        const allErrors = response.data.message;
        setErrors(allErrors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={registerStyles.wrapper}>
      <form onSubmit={handleUserLogin}>
        <h2>
          <center>Career Buddy</center>
        </h2>
        <input
          type="text"
          placeholder={STUDENT_ID}
          name={STUDENT_ID}
          onChange={handleFieldChange}
        />
        <span className="flagger">
          {errors.userID ? errors.userID[0] : null}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder={FIRST_NAME}
            name={FIRST_NAME}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder={LAST_NAME}
            name={LAST_NAME}
            onChange={handleFieldChange}
          />
        </div>
        <input
          type={EMAIL}
          placeholder={EMAIL}
          name={EMAIL}
          onChange={handleFieldChange}
        />
        <span className="flagger">{errors.email ? errors.email[0] : null}</span>
        <br />
        <input
          type={PASSWORD}
          placeholder={PASSWORD}
          name={PASSWORD}
          onChange={handleFieldChange}
        />
        <span className="flagger">
          {errors.password ? errors.password[0] : null}
        </span>

        <br />
        <input
          type={PASSWORD}
          placeholder={REPEAT_PASSWORD}
          name={REPEAT_PASSWORD}
          onChange={handleFieldChange}
        />

        <button>Register</button>
        <div className={registerStyles.loginlink}>
          <center>
            already have an account? <Link to="/login">Login</Link>
          </center>
        </div>
      </form>
    </div>
  );
};

export default Register;
