import type { Route } from "./+types/_home";
import { Link } from "react-router";
import { Button } from "@heroui/react";

type HomeMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: HomeMeta) {
  return [
    { title: metadata.title || "New React Router App" },
    { name: "description", content: metadata.description || "Welcome to React Router!" },
  ];
}

export default function Home() {

  return (
    <div>
      <Button color="primary">
        <Link to="/console">Console</Link>
      </Button>
    </div>
  );
}
