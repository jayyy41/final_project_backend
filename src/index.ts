import { buildApp } from "./app";

const app = buildApp();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
