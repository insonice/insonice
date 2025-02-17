import type { LoaderFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import type { Route } from "./+types/_auth.signup";

type SignupMeta = {
  title?: string;
  description?: string;
} & Route.MetaArgs;

export function meta(metadata: SignupMeta) {
  return [
    { title: metadata.title || "New React Router App" },
    { name: "description", content: metadata.description || "Welcome to React Router!" },
  ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return {
    user: null,
    providers: [],
  };
};

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

export default function Signup() {
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
    <div>
      <section className="container">
        <h1>Signup</h1>
      </section>
    </div>
  );
}
