import Head from "next/head";
import { EventButton } from "rc4conf";
import { Stack } from "react-bootstrap";
import { getStrapiURL } from "../../lib/api";

function Home() {
  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Rocket.Chat form tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto">
        <h1 className="mx-auto mt-3">Preview of Event Component</h1>
        <EventButton bg={"yellow"} margin="auto" strapiFunc={getStrapiURL} strapiCollName={"discourses"} />
      </Stack>
    </div>
  );
}

export default Home;
