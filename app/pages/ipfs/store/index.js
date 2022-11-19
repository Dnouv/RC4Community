import Head from "next/head";
import { Stack } from "react-bootstrap";
import { ListStoreItems } from "../../../components/marketplace/storeItems";
import { fetchAPI } from "../../../lib/api";

export default function Store(props) {
  console.log("props", props)
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
        <ListStoreItems storeItems={props.storeItems} />
      </Stack>
    </div>
  );
}

export async function getStaticProps({ params }) {
 
  const topNavItems = await fetchAPI('/top-nav-item');
  const storeItems = await fetchAPI('/web3stores');

  return {
    props: { topNavItems, storeItems }
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 second
  };
}
