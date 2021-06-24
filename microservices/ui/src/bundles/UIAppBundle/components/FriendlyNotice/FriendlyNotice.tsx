export function FriendlyNotice({
  message,
  children,
  error,
}: {
  message?: string;
  children?: any;
  error?: boolean;
}) {
  const className = ["component-FriendlyNotice"];
  if (error) {
    className.push("errored");
  }
  return <div className={className.join(" ")}>{message || children}</div>;
}
