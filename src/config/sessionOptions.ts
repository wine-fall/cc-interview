import { type SessionOptions } from "iron-session";
import { SiweResponse } from "siwe";

export interface SessionData {
  nonce: string;
  siwe?: SiweResponse;
}

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "iron-examples-app-router-client-component-route-handler-swr",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};