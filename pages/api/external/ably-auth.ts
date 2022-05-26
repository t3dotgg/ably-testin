import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

import * as Ably from "ably/promises";

/**
 *
 * Defines or returns a shared Ably rest client
 *
 * @returns {Ably.Rest}
 */
export const getAblyRestClient = () => {
  const options: Ably.Types.ClientOptions = {
    key: process.env.ABLY_KEY,
    log: { level: 2 },
  };

  return new Ably.Rest(options);
};

const ablyAuthRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // --- Core Permissions (Subscription on public channels) ---
  const capability: { [key: string]: Ably.Types.CapabilityOp[] } = {
    "public:*": ["subscribe", "presence"],
  };
  const clientId = req.headers["x-ably-client-id"];

  // --- Generate Token ---
  const ably = getAblyRestClient();

  const token = await ably.auth.createTokenRequest({
    clientId: typeof clientId === "string" ? clientId : "embed:" + randomUUID(),
    capability,
  });

  // --- Send Response ---
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(token));
};

export default ablyAuthRequest;
