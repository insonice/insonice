"use client";

import SwitchTheme from "@/components/switch-theme";
import { client } from "@/server/client";
import type { InferRequestType } from "hono";
import useSWR from "swr";

export default function Home() {
  const $get = client.api.v1.ping.$get;
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    return await res.text();
  };
  const { data, error, isLoading } = useSWR("api-ping", fetcher({}));

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error || "no data"}</div>;
  return (
    <div>
      <SwitchTheme />
      API status: {data}
    </div>
  );
}
