import type { Route } from "./+types/console._index";

type ConsoleMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: ConsoleMeta) {
  return [
    { title: metadata.title || "New React Router App" },
    { name: "description", content: metadata.description || "Welcome to React Router!" },
  ];
}

export default function Console() {
  return (
    <div className="bg-red-500">
      console
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
