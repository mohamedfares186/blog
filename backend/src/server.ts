import "dotenv/config";
import app from "./app.ts";

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port: ${PORT}`)
);
