import type { CookiesOptions } from "@auth/core/types";
import psl from "psl";

import { env } from "../../env";

// This function is used to get the root domain from a given URL
const getRootDomain = (url: string) => {
  try {
    const parsed = psl.parse(new URL(url).hostname);
    if (parsed.error) throw parsed.error;
    return `.${parsed.domain}`; // 这会返回根域名
  } catch (error) {
    return undefined;
  }
};

let _domain: string | undefined;

export function defaultCookies({
  useSecureCookies,
  domain,
}: {
  useSecureCookies?: boolean;
  domain?: string;
} = {}) {
  const cookiePrefix = useSecureCookies ? "__Secure-" : "";
  let cookieDomain = _domain ?? domain;
  if (!domain && env.AUTH_URL) {
    cookieDomain = getRootDomain(env.AUTH_URL);
  }
  _domain = cookieDomain;

  return {
    // default cookie options
    sessionToken: {
      name: `${cookiePrefix}session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: cookieDomain,
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? "__Host-" : ""}csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        domain: cookieDomain,
        path: "/",
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
    state: {
      name: `${cookiePrefix}state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
    nonce: {
      name: `${cookiePrefix}nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    webauthnChallenge: {
      name: `${cookiePrefix}challenge`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
  } as const satisfies CookiesOptions;
}
