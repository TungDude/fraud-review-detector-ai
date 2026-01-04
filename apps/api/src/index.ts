import { config } from "@/config/env";
import { createApp } from "@/app";

const app = createApp();

const PORT = config.port;
const ENV = config.env;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${ENV} mode.`);
});