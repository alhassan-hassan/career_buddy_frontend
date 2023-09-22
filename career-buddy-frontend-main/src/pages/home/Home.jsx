// libraries
import React, { useContext } from "react";
import IMAGES from "../../images/Images.jsx";
import { Link } from "react-router-dom";

// components
import { AppContext } from "@contexts/AppContext";

import HomeStyles from "./home.module.scss";

const Home = () => {
  const { appContextState } = useContext(AppContext);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "3rem",
        backgroundImage:
          "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
        // backgroundImage: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
      }}
    >
      <h1
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: "350%",
        }}
      >
        Career Buddy
      </h1>
      <p className={HomeStyles.tagline}>Career-Streamlining Platform</p>
      <div>
        <button className={HomeStyles.loginButton}>
          <Link to="/login">Login</Link>
        </button>
        <button className={HomeStyles.registerBtn}>
          <Link to="/register">Register</Link>
        </button>
      </div>
      <br />
      <br />

      <div
        style={{
          width: "75%",
          padding: "4.5rem",
          display: "flex",
          justifyContent: "center",
          background: "white",
          borderRadius: "0.7rem",
        }}
      >
        <div style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
          <img src={IMAGES.demon} alt="" width="90%" />
        </div>
      </div>
    </div>
  );
};

export default Home;
