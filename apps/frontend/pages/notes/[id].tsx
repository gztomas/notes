import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import "regenerator-runtime/runtime.js";
import { EmptyState } from "../../src/EmptyState";
import { Layout } from "../../src/Layout";
import { Note } from "../../src/notes/Note";
import { NotesList } from "../../src/notes/NotesList";
import { useNotes } from "../../src/notes/useNotes";

const NotePage: NextPage = () => {
  const {
    notes,
    deleteNote,
    openNote,
    createNote,
    activeNote,
    readyState,
    updateNote,
  } = useNotes();

  return (
    <>
      <Head>
        <title>Notes</title>
      </Head>

      <Layout
        side={
          <NotesList
            activeNoteId={activeNote?.id}
            notes={notes}
            onDeleteNote={deleteNote}
            onOpenNote={openNote}
          />
        }
        footer={
          <Fab variant="extended" onClick={createNote}>
            <Add sx={{ mr: 1 }} />
            New note
          </Fab>
        }
      >
        {activeNote ? (
          <Note
            note={activeNote}
            key={activeNote.id}
            readyState={readyState}
            onTitleChange={(title) => updateNote(activeNote.id, title)}
          />
        ) : (
          <EmptyState onNewNote={createNote} />
        )}
      </Layout>
    </>
  );
};

export default NotePage;
