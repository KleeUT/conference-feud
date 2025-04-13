# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Local database set up

#### Create database

```
npx wrangler d1 create conference-feud-db
```

#### Populate database

Run scripts for all tables in local

```
npx wrangler d1 execute conference-feud-db --file=./schemas/01_question_table.sql --local
npx wrangler d1 execute conference-feud-db --file=./schemas/02_survey_table.sql --local
npx wrangler d1 execute conference-feud-db --file=./schemas/03_session_table.sql --local
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
