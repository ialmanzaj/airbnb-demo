import { init } from "@instantdb/react-native";
import schema from "@/instant.schema";

if (!process.env.EXPO_PUBLIC_INSTANT_APP_ID) {
  throw new Error("Missing EXPO_PUBLIC_INSTANT_APP_ID environment variable");
}

// Initialize InstantDB with the app ID
export const db = init({
  appId: process.env.EXPO_PUBLIC_INSTANT_APP_ID,
  schema,
});

// Export types for use throughout the app
export type { AppSchema } from "@/instant.schema";
