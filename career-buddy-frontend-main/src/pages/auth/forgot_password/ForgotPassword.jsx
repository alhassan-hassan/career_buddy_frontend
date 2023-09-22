import forgotPasswordStyles from "./forgot-password.module.scss";

const ForgotPassword = () => {
  return (
    <div className={forgotPasswordStyles.wrapper}>
      <form>
        <h2>
          <center>Forgot Password?</center>
        </h2>
        <input type="email" placeholder="enter your email address" />
        <button>request reset link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
