"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";

export const AuthButton = () => {
  const session = useSession();

  return (
    <Link
      href="javascript: void 0;"
      onClick={async () => {
        if (session.data?.user) {
          await signOut();
        } else {
          await signIn();
        }
      }}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      {session?.data?.user ? "Sign out" : "Sign in"}
    </Link>
  );
};
