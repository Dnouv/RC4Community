import Head from "next/head";
import { Stack } from "react-bootstrap";
import {useRouter} from "next/router"

function Store() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>IPFS Store</title>
        <meta name="description" content="Rocket.Chat ipfs tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto">
        <h1 className="mx-auto mt-3">
          Preview of Peer-to-Peer Sharing IPFS Store
        </h1>
      </Stack>
    </div>
  );
}

export default Store;
