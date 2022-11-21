import Head from "next/head";
import { Stack } from "react-bootstrap";
import IpfsAdder from "../../components/marketplace/ipfs";

function IPFSSell() {
  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Rocket.Chat ipfs tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto" style={{height: "95vh"}}>
        <h1 className="mx-auto mt-3" style={{textAlign: "center"}}>
          Preview of Peer-to-Peer Sharing IPFS MarketPlace
        </h1>
        <IpfsAdder showText={"Sell on IPFS"} />
      </Stack>
    </div>
  );
}

export default IPFSSell;
