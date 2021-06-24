import { useGuardian } from "@kaviar/x-ui";
import { useEffect, useState } from "react";
import { Layout } from "../../components";
import { FriendlyNotice } from "../../components/FriendlyNotice/FriendlyNotice";

export function VerifyEmail({ token }: { token: string }) {
  const guardian = useGuardian();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(true);
  const [emailVerificationError, setEmailVerificationError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      guardian
        .verifyEmail(token)
        .then(() => {
          setIsVerifyingEmail(false);
          setIsEmailVerified(true);
        })
        .catch((err) => {
          setIsVerifyingEmail(false);
          setEmailVerificationError(err.toString());
        });
    }, 1000);
  }, [guardian, token]);
  return (
    <Layout>
      {isVerifyingEmail && (
        <FriendlyNotice>Verifying your email...</FriendlyNotice>
      )}
      {isEmailVerified && (
        <FriendlyNotice>Congrats. Your email is now verified.</FriendlyNotice>
      )}
      {emailVerificationError && (
        <FriendlyNotice error={true}>
          We could not verify your email. Maybe it was already verified.
        </FriendlyNotice>
      )}
    </Layout>
  );
}
