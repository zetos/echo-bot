
![echo](./media/echo.jpg)

---

**Echo** is a simple bot to test the interaction of the [discord.js v13](https://discord.js.org/#/) with the [Discord API](https://discord.com/developers/docs/intro), that likes to have the last word.

## Commands

A list of avaliable different commands that have a similar result..

- `/echo <phase>`: Answers with the last word..
- `/ping`: Answers with ping..
## Setup

Create a `.env` file with your discord token and Guild ID:

```
DISCORD_TOKEN=<YOUR_TOKEN>
GUILD_ID=<YOUR_GUILD_ID>
```

Then run: 

```sh
npm i
npm run build
npm start
```
> For development use: `npm run dev`.
