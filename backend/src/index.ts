import app from "./app";
import config from "./utils/config";

const PORT = config.PORT;
const HOST = config.HOST;

app.listen(Number(PORT), () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});