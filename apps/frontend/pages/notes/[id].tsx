import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import "regenerator-runtime/runtime.js";
import { Layout } from "../../src/layout";
import { Note } from "../../src/notes/Note";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const noteId = String(id);

  return (
    <>
      <Head>
        <title>Editor Project</title>
      </Head>

      <Layout activeNoteId={noteId}>
        {noteId ? <Note id={noteId} key={noteId} /> : null}
      </Layout>
    </>
  );
};

export default Home;
