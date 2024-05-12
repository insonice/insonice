import githubProvider from "next-auth/providers/github";

export const GitHub = githubProvider({
  profile: (profile) => ({
    ...profile,
    id: profile.id.toString(),
    image: profile.avatar_url,
  }),
});
