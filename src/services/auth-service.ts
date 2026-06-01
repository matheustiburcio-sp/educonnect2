import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

interface SignUpInput {
  email: string;
  name: string;
  password: string;
}

export const authService = {
  signInWithPassword: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  },

  signInWithGoogle: async (redirectUri: string) => {
    return lovable.auth.signInWithOAuth("google", { redirect_uri: redirectUri });
  },

  signOut: async () => {
    return supabase.auth.signOut();
  },

  signUp: async ({ email, name, password }: SignUpInput) => {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: name },
      },
    });
  },
};