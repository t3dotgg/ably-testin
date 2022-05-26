import dynamic from "next/dynamic";
import Head from "next/head";
const ViewClients = dynamic(
  () => import("../components/view-connected-clients"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ably test</title>
      </Head>
      <ViewClients />
    </div>
  );
}
