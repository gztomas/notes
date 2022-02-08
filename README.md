# Notes

A rich, collaborative note taking app built with Typescript, React, Slate, Automerge and Firestore.

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/1714020/153075248-ae14cecd-a3cb-4a0e-9c08-786d8b993574.png">

## Repository structure

Code is generally organized by feature rather than by type, so preferring names like "collaboration", "links", "GDocs", over names like "components", "styles" for files files and folders. That aims to get files that are normally changed together as close as possible.

We follow the monorepo pattern:

- [apps](apps) contains executable and deployable packages:
  - [frontend](apps/frontend) contains the user facing Next.JS app.
  - [backend](apps/backend) contains the backend express app.

## How to run the system

Start the dev server on [http://localhost:3000](http://localhost:3000) by running **`npm run dev`** in the root folder.

## Type checking and linting

Each app has a `check` script that runs the linting and typechecking. Run it in all apps from the root by running: `npm run check --workspaces`.
