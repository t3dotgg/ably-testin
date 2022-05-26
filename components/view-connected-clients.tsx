import React from "react";
import * as Ably from "ably";
import { createAblyClient } from "./create-client";

const SingleConnectionBox: React.FC<{ id: string }> = (props) => {
  return (
    <div className="flex items-center justify-center m-2 h-12 w-12 border-2">
      {props.id}
    </div>
  );
};

export const EmbedView = () => {
  const ablyRef = React.useRef(createAblyClient(-1));
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
    <div>
      <div className="text-2xl">Current Connections</div>
      <div className="flex flex-wrap">
        {connected?.map((person) => (
          <SingleConnectionBox key={person} id={person} />
        ))}
      </div>
    </div>
  );
};

export default EmbedView;
