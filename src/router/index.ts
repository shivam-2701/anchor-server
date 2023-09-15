import { Router } from "express";
import { getVideoId } from "../middleware.js";
import { videoEarning } from "../controller/youtubeController.js";
import { createCallback } from "../controller/callbackController.js";

const router = Router();

router.post("/youtube-earning", videoEarning);

router.post("/callback", createCallback);

export default router;
