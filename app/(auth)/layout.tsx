import AuthRouteHandler from "@/components/auth-route-handler";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthRouteHandler type="auth">{children}</AuthRouteHandler>;
}
