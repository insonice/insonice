import { Outlet } from "react-router";
import type { Route } from "./+types/console";

type ConsoleLayoutMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: ConsoleLayoutMeta) {
  return [
    { title: metadata.title || "Insonice" },
    { name: "description", content: metadata.description || "Insonice" },
  ];
}

export default function ConsoleLayout() {
  return <Outlet />;
}
