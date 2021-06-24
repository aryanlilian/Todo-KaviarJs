import { useGuardian } from "@kaviar/x-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../../components";

type FormInput = {
  oldPassword: string;
  newPassword: string;
};

export function ChangePassword() {
  const guardian = useGuardian();
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { register, handleSubmit, errors } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    const { oldPassword, newPassword } = data;
    guardian
      .changePassword(oldPassword, newPassword)
      .then(() => {
        setIsPasswordChanged(true);
      })
      .catch((err) => {
        setSubmitError(err.toString());
      });
  };

  return (
    <Layout>
      {isPasswordChanged && <h2>Your password has been changed.</h2>}
      {!isPasswordChanged && (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1>Change Your Password</h1>

          <input
            type="password"
            placeholder="Your Current Password"
            name="oldPassword"
            ref={register({ required: true })}
          />
          {errors.oldPassword && <p>Your old password is required</p>}

          <input
            type="password"
            placeholder="Your New Password"
            name="newPassword"
            ref={register({ required: true })}
          />
          {errors.newPassword && <p>Your new password is required</p>}

          {submitError && <p>{submitError}</p>}
          <input type="submit" value="Change" />
        </form>
      )}
    </Layout>
  );
}
