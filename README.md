![echo](./media/echo.jpg)

---

**Echo** is a simple bot to test the interaction of [discord.js](https://discord.js.org/) with the [Discord API](https://discord.com/developers/docs/intro), that likes to have the last word.

## Commands

A list of avaliable different commands that have a similar result..

- `/echo <phase>`: Answers with the last word..
- `/ping`: Answers with ping..

## Setup

Create a `.env` file with your Discord token, application ID, and guild ID:

```
DISCORD_TOKEN=<YOUR_TOKEN>
CLIENT_ID=<YOUR_APPLICATION_ID>
GUILD_ID=<YOUR_GUILD_ID>
```

Then run:

```sh
pnpm install
pnpm build
pnpm start
```

> For development use: `pnpm dev`.
