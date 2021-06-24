import { useGuardian, useRouter } from "@kaviar/x-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FriendlyNotice, Layout } from "../../components";
import * as Routes from "../../routes";

type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function Register() {
  const guardian = useGuardian();
  const router = useRouter();

  const [submitError, setSubmitError] = useState(null);
  const { register, handleSubmit, errors } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    const { email, password, firstName, lastName } = data;
    guardian
      .register({
        email,
        firstName,
        lastName,
        password,
      })
      .then((token) => {
        setSubmitError(null);
        router.go(Routes.HOME_PAGE);
      })
      .catch((err) => {
        setSubmitError(err.toString());
      });
  };

  return (
    <Layout>
      {guardian.state.isLoggedIn && (
        <FriendlyNotice message="You are already logged in btw" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Register Now!</h1>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          ref={register({ required: true })}
        />
        {errors.firstName && <p>The name provided is invalid</p>}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          ref={register({ required: true })}
        />
        {errors.lastName && <p>The name provided is invalid</p>}
        <input
          type="text"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>The email provided is invalid</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <p>Password is required</p>}

        {submitError && <p>{submitError}</p>}
        <input type="submit" value="Register" />
      </form>
    </Layout>
  );
}
