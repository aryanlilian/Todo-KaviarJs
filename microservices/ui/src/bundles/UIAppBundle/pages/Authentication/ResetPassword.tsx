import { useGuardian } from "@kaviar/x-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Layout, FriendlyNotice } from "../../components";

type FormInput = {
  email: string;
  password: string;
};

export function ResetPassword({ token }: { token: string }) {
  const guardian = useGuardian();

  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    const { email, password } = data;
    guardian
      .resetPassword(email, token, password)
      .then(() => {
        setIsPasswordReset(true);
      })
      .catch((err) => {
        setPasswordResetError(err.toString());
      });
  };

  return (
    <Layout>
      {isPasswordReset && (
        <FriendlyNotice>Your password has been reset.</FriendlyNotice>
      )}
      {!isPasswordReset && (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1>Reset Your Password</h1>
          <input
            type="text"
            placeholder="Confirm your email"
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>The email provided is invalid</p>}
          <input
            type="password"
            placeholder="Your New Password"
            name="password"
            ref={register({ required: true })}
          />
          {errors.password && <p>Password is required</p>}

          {passwordResetError && <p>We could not reset your password.</p>}
          <input type="submit" />
        </form>
      )}
    </Layout>
  );
}
