import googleProvider from "next-auth/providers/google";

export const Google = googleProvider({
  profile: (profile) => ({
    ...profile,
    id: profile.id.toString(),
    image: profile.avatar_url,
  }),
});
