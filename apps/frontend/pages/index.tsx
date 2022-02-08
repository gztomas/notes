import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../src/layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Editor Project</title>
      </Head>

      <Layout />
    </>
  );
};

export default Home;
