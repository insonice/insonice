import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Insonice",
  description: "Insonice",
};

export default function HomeLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
