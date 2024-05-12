"use server"

import { SiweMessage } from "siwe";
import { type SessionData, sessionOptions } from "@/config/sessionOptions";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export async function verifyNonce(message: string, signature: string) {
  console.log(message);
  let fields;
  try {
    const siweMessage = new SiweMessage(JSON.parse(message));
    fields = await siweMessage.verify({ signature });
  } catch (err) {
    if (err instanceof Error)
      return { ok: false, error: err.message };
    if (err instanceof Object && 'error' in err)
      return { ok: false, error: JSON.stringify(err.error) };
    return { ok: false, error: JSON.stringify(err) };
  }

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!fields.success)
    return { ok: false, error: "Signing failed" };
  if (fields.data.nonce !== session.nonce)
    return { ok: false, error: "Invalid nonce" };

  session.siwe = fields
  await session.save()
  console.log(fields);
  return { ok: true };
}