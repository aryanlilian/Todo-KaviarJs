import { useRouter } from "@kaviar/x-ui";
import React from "react";
import { Link } from "react-router-dom";
import { useGuardian } from "@kaviar/x-ui";
import { Layout } from "../../components";
import * as Routes from "../../routes";

export const HomePage = () => {
  const router = useRouter();
  const guardian = useGuardian();
  const { isLoggedIn } = guardian.state;

  return (
    <Layout>
      <div className="page-home">
        <div className="logo-wrapper">
          <img src="https://www.kaviarjs.com/img/logo.png" alt="logo" />
        </div>
        <h1>Welcome to X-Framework</h1>
        <table className="table">
          <tbody>
            <tr>
              <th>Page</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>
                <a
                  href={process.env.REACT_APP_GRAPHQL_URI as string}
                  target="_blank"
                >
                  GraphQL Playground
                </a>
              </td>
              <td>
                Start toying around with the API (make sure it is started).
                <a href="/public/schema.html" target="_blank">
                  Check the schema
                </a>
                .
              </td>
            </tr>
            <tr>
              <td>
                <Link to={router.path(Routes.TODOS_LIST)}>Todos</Link>
              </td>
              <td>
                {isLoggedIn ?  "Here is the Todos list page!" : "You need to be logged in to access the Todos!"}
              </td>
            </tr>
            <tr>
              <td>
                <Link to={router.path(Routes.LOGIN)}>Login</Link>
                <br />
                <br />
                <Link to={router.path(Routes.REGISTER)}>Register</Link>
                <br />
                <br />
                <Link to={router.path(Routes.CHANGE_PASSWORD)}>
                  Change Password
                </Link>
                <br />
                <br />
                <Link to={router.path(Routes.FORGOT_PASSWORD)}>
                  Forgot Password
                </Link>
              </td>
              <td>
                Here you have your full suite of registration, authentication,
                email verification with everything customisable.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
