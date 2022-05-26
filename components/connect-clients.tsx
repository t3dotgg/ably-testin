import React from "react";
import * as Ably from "ably";
import { createAblyClient } from "./create-client";

const DumbClient: React.FC<{ id: number }> = (props) => {
  const ablyRef = React.useRef(createAblyClient(props.id));

  React.useEffect(() => {
    ablyRef.current.channel.presence.enter();
    return () => ablyRef.current.client.close();
  }, []);

  return (
    <div className="flex items-center justify-center m-2 h-12 w-12 border-2">
      {props.id}
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
