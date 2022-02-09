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

Since we are using npm overrides there is an strict check for npm and node version. Please use at least npm `8.3.0`.

If you have an older npm version, please update with `npm install -g npm@latest`

A firebase project service account key would be needed, it can be obtained from either an existing or new firebase project at `https://console.firebase.google.com/project/${projectName}/settings/serviceaccounts/adminsdk` and clicking "Generate new private key".
Save the json file at `apps/backend/serviceAccountKey.json`.

At the project root do `npm install`

Then start the dev server on [http://localhost:3000](http://localhost:3000) by running **`npm run dev`** in the root folder.

## Tests

There is a minimal end to end test suite setup with [Playwright](https://github.com/microsoft/playwright).

To run tests use `npm test`

To run the tests and see them in a browser use `npm test -- --headed`

To troubleshoot a failing test use `npm test -- --debug` which will allow step by step execution.

## Type checking and linting

Each app has a `check` script that runs the linting and typechecking. Run it in all apps from the root by running: `npm run check --workspaces`.

## Whishlist

This project is lacking many things due to time constraints. These are some nice to have additions:

- Fix tests in CI by providing the serviceAccountKey.json config there
- Setup a production build and production note service, CI to deploy backend and frontend.
- Add better error handling. Other than the connection state indicator, the FE isn't really doing anything right now when things fail.
- Remove dependency with `cudr/slate-collaborative` and use the much better maintained `automerge` directly.
- Add firestore mock so tests don't depend on db state.
- Better tests by adding page objects.
- Explore yjs that seems more performat that automerge.
- Store operations history in firestore so the backend can be horizontally scaled.
- A more consistent theming solution, avoiding sx custom styles as much as possible.
- Better link insertion with popover at cursor using decorators.
