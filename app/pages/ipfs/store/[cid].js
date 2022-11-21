import Head from "next/head";
import { Stack } from "react-bootstrap";
import {useRouter} from "next/router"
import { IpfsDisplay } from "../../../components/marketplace/display";

function Store() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Item</title>
        <meta name="description" content="Rocket.Chat ipfs tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto">
        <h1 className="mx-auto mt-3" style={{textAlign: "center"}}>
          Preview of Peer-to-Peer Sharing IPFS Store Item
        </h1>
        <IpfsDisplay cid={router.query.cid} />
      </Stack>
    </div>
  );
}

export default Store;
