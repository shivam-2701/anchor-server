import { Router } from "express";
import { videoEarning } from "../controller/youtubeController.js";
import { createCallback } from "../controller/callbackController.js";
const router = Router();
router.post("/youtube-earning", videoEarning);
router.post("/callback", createCallback);
export default router;
//# sourceMappingURL=index.js.map