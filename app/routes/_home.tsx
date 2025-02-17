import type { Route } from "./+types/_home";
import { Outlet } from "react-router";

type HomeLayoutMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: HomeLayoutMeta) {
  return [
    { title: metadata.title || "New React Router App" },
    { name: "description", content: metadata.description || "Welcome to React Router!" },
  ];
}

export default function HomeLayout() {
  return <Outlet />;
}
