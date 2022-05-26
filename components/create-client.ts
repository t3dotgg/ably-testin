import * as Ably from "ably";
export const createAblyClient = (id: number) => {
  const client = new Ably.Realtime({
    log: { level: 2 },
    closeOnUnload: false,
    authUrl: "/api/external/ably-auth",
    authHeaders: { "X-Ably-Client-Id": `${id}` },
  });

  const channel = client.channels.get("public:ably-test");

  return { client, channel };
};
