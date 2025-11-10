import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import requestLogger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import limiter from "./middleware/limiter.ts";

const app = express();

app.use(requestLogger as express.RequestHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);

import auth from "./modules/auth/routes/auth.route.ts";
import post from "./modules/posts/routes/post.route.ts";

app.use("/api/v1", auth);
app.use("/api/v1", post);

app.use(error as express.ErrorRequestHandler);

export default app;
