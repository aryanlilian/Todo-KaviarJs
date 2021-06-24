import { useGuardian } from "@kaviar/x-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../../components";
import { FriendlyNotice } from "../../components/FriendlyNotice/FriendlyNotice";

type FormInput = {
  email: string;
};

export function ForgotPassword() {
  const guardian = useGuardian();
  const [submitError, setSubmitError] = useState(null);
  const [isCompleted, setIsComplete] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    guardian
      .forgotPassword(data.email)
      .then(() => {
        setIsComplete(true);
      })
      .catch((err) => {
        setSubmitError(err.toString());
      });
  };

  return (
    <Layout>
      {isCompleted && (
        <FriendlyNotice>
          If the email exists in our database, you will receive an email with
          instructions.
        </FriendlyNotice>
      )}
      {!isCompleted && (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1>Forgot Your Password</h1>
          <input
            type="text"
            placeholder="Email"
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>The email provided is invalid</p>}

          {submitError && <p>{submitError}</p>}
          <input type="submit" />
        </form>
      )}
    </Layout>
  );
}
