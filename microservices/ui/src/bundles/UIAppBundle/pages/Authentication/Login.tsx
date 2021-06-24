import { useGuardian, useRouter } from "@kaviar/x-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../../components";
import * as Routes from "../../routes";

type FormInput = {
  email: string;
  password: string;
};

export function Login() {
  const guardian = useGuardian();

  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const { register, handleSubmit, errors } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    const { email, password } = data;
    guardian
      .login(email, password)
      .then(() => {
        router.go(Routes.HOME_PAGE);
      })
      .catch((err) => {
        setLoginError(err.toString());
      });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Login</h1>
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

        {loginError && <p>Invalid credentials.</p>}
        <input type="submit" />
      </form>
    </Layout>
  );
}
