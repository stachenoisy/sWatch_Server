import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

import { moviesRoutes } from "./movies";
import { seriesRoutes } from "./series";
import { genresRoutes } from "./genres";
import { videosRoutes } from "./videos";

const token = Bun.env.TMDB_KEY;

const app = new Elysia()
app.use(swagger())

app.get('/', () => "sWatch Server");

moviesRoutes(app, token as string);
seriesRoutes(app, token as string);
genresRoutes(app, token as string);
videosRoutes(app, token as string);

app.listen(8080);

console.log(
  `🦊 sWatch API is running at ${app.server?.hostname}:${app.server?.port}`
);