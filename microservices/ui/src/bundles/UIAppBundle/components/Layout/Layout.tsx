import { useGuardian, useRouter } from "@kaviar/x-ui";
import * as Routes from "../../routes";
import { Link } from "react-router-dom";

export function Layout({ children }: any) {
  const guardian = useGuardian();
  const router = useRouter();

  const { user } = guardian.state;
  return (
    <div className="component-Layout">
      <header>
        <Link to={router.path(Routes.HOME_PAGE)}>Home</Link>

        {guardian.state.isLoggedIn && (
          <div>
            Logged in as {user.profile?.firstName}{" "}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                guardian
                  .logout()
                  .then(() => {
                    router.go(Routes.LOGIN);
                  })
                  .catch((err) => {
                    console.log({ err });
                  });
              }}
            >
              Logout
            </a>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
