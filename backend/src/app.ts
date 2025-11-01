import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import requestLogger from "./middleware/logger.ts";
import error from "./middleware/error.ts";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(error);

export default app;
