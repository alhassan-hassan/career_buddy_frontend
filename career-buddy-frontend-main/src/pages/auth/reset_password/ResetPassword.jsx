import resetPasswordStyles from "./reset-password.module.scss";

const ResetPassword = () => {
  return (
    <div className={resetPasswordStyles.wrapper}>
      <form>
        <h2>
          <center>Reset Password?</center>
        </h2>
        <input type="password" placeholder="new password" />
        <input type="password" placeholder="confirm password" />
        <button>reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
