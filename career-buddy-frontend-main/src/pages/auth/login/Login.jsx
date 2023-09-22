import { useState } from "react";
import { userLogin } from "@network/api-handlers";
import useAuth from "@hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Spin } from "antd";

import { EMAIL, PASSWORD, ROLE, STUDENT, ADMIN, CPA } from "@utils/constants";

import { validateFormFields } from "@utils/functions";

import loginStyles from "./login.module.scss";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);

  const [loginData, setLoginData] = useState({
    [EMAIL]: "",
    [PASSWORD]: "",
    [ROLE]: "",
  });

  const handleFieldChange = (e) => {
    let loginField = e.target.name;
    const newLoginFieldValue = { [loginField]: e.target.value };
    setLoginData({ ...loginData, ...newLoginFieldValue });
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    const { fieldsAreValid, message } = validateFormFields(loginData);
    if (!fieldsAreValid) {
      alert(message);
      return;
    }

    setSpin(true);

    try {
      const response = await userLogin(loginData);

      if (response.data.ok) {
        const authObject = {
          user: true,
          data: response.data.user,
        };

        if (loginData.role == "cpa") {
          authObject.roles = ["cpa", "student"];
        } else {
          authObject.roles = [loginData.role];
        }

        setAuth(authObject);
        sessionStorage.setItem("career-buddy-auth", JSON.stringify(authObject));

        navigate(`/${loginData.role}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      // alert(error.data.message);
      console.log(error);
    }

    setSpin(false);
  };

  return (
    <div className={loginStyles.wrapper}>
      <form onSubmit={handleUserLogin}>
        <h2>
          <center>Career Buddy</center>
        </h2>
        <input
          type={EMAIL}
          placeholder={EMAIL}
          name={EMAIL}
          onChange={handleFieldChange}
        />
        <br />
        <input
          type={PASSWORD}
          placeholder={PASSWORD}
          name={PASSWORD}
          onChange={handleFieldChange}
        />
        <br />
        <div className={loginStyles.reglink}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <br />
        <h4>I am a(n)</h4>
        <div className={loginStyles.radios}>
          <div>
            <input
              type="radio"
              name={ROLE}
              value={STUDENT}
              id={STUDENT}
              onChange={handleFieldChange}
            />
            <label htmlFor={STUDENT}>{STUDENT}</label>
          </div>
          <div>
            <input
              type="radio"
              name={ROLE}
              value={ADMIN}
              id={ADMIN}
              onChange={handleFieldChange}
            />
            <label htmlFor={ADMIN}>{ADMIN}</label>
          </div>
          <div>
            <input
              type="radio"
              name={ROLE}
              value={CPA}
              onChange={handleFieldChange}
              id={CPA}
            />
            <label htmlFor={CPA}>{CPA}</label>
          </div>
        </div>
        <button>Login</button>
        <div className={loginStyles.reglink}>
          don't have an account? <Link to="/register">Register</Link>
        </div>

        {spin && (
          <center>
            <Spin />
          </center>
        )}
      </form>
    </div>
  );
};

export default Login;
