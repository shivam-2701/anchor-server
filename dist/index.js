import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/index.js";
import { setupDbConnection } from "./config/mongoose.js";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);
setupDbConnection();
const port = 5001;
app.listen(port, () => {
    console.log("Server is running on http://localhost:5001");
});
//# sourceMappingURL=index.js.map