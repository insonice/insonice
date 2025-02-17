import type { LoaderFunctionArgs } from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/_auth.login";
import { LoginForm } from "@/components/auth/login-form";

type LoginMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: LoginMeta) {
  return [
    { title: metadata.title || "New React Router App" },
    { name: "description", content: metadata.description || "Welcome to React Router!" },
  ];
}

const fetchData = async (url: string, options: Record<string, any> = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw new Error(data.error);
};

export default function Login() {
  const fetcher = useFetcher();
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const onSignIn = async () => {
    const { csrfToken } = (await fetchData("/api/auth/csrf", {})) || {};
    console.log(csrfToken);
    const res = await fetch("/api/auth/signin/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1",
      },
      body: new URLSearchParams({
        callbackUrl: window.location.href,
        redirect: "false",
        csrfToken,
        redirectTo: window.location.href,
      }),
    });
    const data = await res.json();
    console.log(data);
    window.location.href = data.url;
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
