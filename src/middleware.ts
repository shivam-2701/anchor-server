import { Request, Response, NextFunction } from "express";
export const getVideoId = (req: Request, res: Response, next: NextFunction) => {
  const videoUrl = req.body.url;

  if (!videoUrl) {
    return next();
  }

  const VID_REGEX =
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const videoId = videoUrl.match(VID_REGEX)[1];

  req.body.id = videoId;
  return next();
};
