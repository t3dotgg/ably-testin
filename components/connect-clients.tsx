import React from "react";
import * as Ably from "ably";
import { createAblyClient } from "./create-client";

const DumbClient: React.FC<{ id: number }> = (props) => {
  const ablyRef = React.useRef(createAblyClient(props.id));

  React.useEffect(() => {
    ablyRef.current.channel.presence.enter();
    return () => ablyRef.current.client.close();
  }, []);

  const [connected, setConnected] = React.useState<string[]>([]);
  React.useEffect(() => {
    console.log("rebinding presence");

    const presence = ablyRef.current.channel.presence;

    presence.subscribe(() => {
      presence.get((_err, current) =>
        setConnected(current?.map((c) => c.clientId) ?? [])
      );
    });
  }, [setConnected]);

  return (
    <div className="relative flex items-center justify-center m-2 h-16 w-16 border-2">
      <span className="text-xl">{props.id}</span>
      <div className="absolute top-0 right-0">{connected.length}</div>
    </div>
  );
};

const genArray = (count: number) =>
  Array.from({ length: count }, (v, i) => i + 1);

export const ConnectClients = () => {
  const [clients, setClients] = React.useState<number>(1);
  return (
    <div>
      <div className="text-2xl">Clients: {clients}</div>
      <button onClick={() => setClients((c) => c + 1)}>Add client</button>
      <div className="flex flex-wrap">
        {genArray(clients).map((clientId) => (
          <DumbClient id={clientId} key={clientId} />
        ))}
      </div>
    </div>
  );
};

export default ConnectClients;
