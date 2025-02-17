import type { Route } from "./+types/_auth";
import { Outlet } from "react-router";

type AuthLayoutMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: AuthLayoutMeta) {
  return [
    { title: metadata.title || "New React Router App" },
    { name: "description", content: metadata.description || "Welcome to React Router!" },
  ];
}

export default function AuthLayout() {
  return <Outlet />;
}
