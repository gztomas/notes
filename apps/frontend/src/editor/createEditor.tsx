import { withIOCollaboration } from "@slate-collaborative/client";
import randomColor from "randomcolor";
import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withLinks } from "./links/withLinks";
import { withGoogleDoc } from "./withGoogleDoc";

export const createEditor = (docId: string) => {
  const color = randomColor({
    luminosity: "dark",
    format: "rgba",
    alpha: 1,
  });
  const name = "Matt";

  return withIOCollaboration(
    withLinks(withGoogleDoc(withHistory(withReact(createSlateEditor())))),
    {
      docId: "/" + docId,
      cursorData: {
        name: "Matt",
        color,
        alphaColor: color.slice(0, -2) + "0.2)",
      },
      url: `http://localhost:3002/${docId}`,
      connectOpts: {
        query: {
          name,
          token: "123",
          slug: docId,
        },
      },
    }
  );
};
