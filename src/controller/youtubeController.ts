import { Request, Response } from "express";
import { google } from "googleapis";
import "dotenv/config";
import {
  createVideo,
  getTopVideoes,
  getVideoById,
  updateVideoById,
} from "../model/video.js";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY!,
});

export const videoEarning = async (req: Request, res: Response) => {
  const vId = req.body.id;

  if (!vId) {
    return res.json({
      message: "Invalid Url send",
    });
  }

  try {
    const data = await youtube.videos.list({
      part: ["snippet,contentDetails,statistics"],
      id: [vId],
    });

    const videoInfo = data.data?.items[0];

    if (!videoInfo) {
      return res.json({
        message: "Invalid Url send",
      });
    }

    const channelId = videoInfo?.snippet?.channelId;
    const stats = videoInfo?.statistics;

    const channelInfo = await youtube.channels.list({
      part: ["snippet,contentDetails,statistics"],
      id: [channelId],
    });
    const subscriberCount =
      channelInfo?.data?.items[0]?.statistics?.subscriberCount;

    const uploadOn = new Date(videoInfo?.snippet?.publishedAt);
    const formattedDate = uploadOn.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // console.log(formattedDate);

    const { commentCount, likeCount, viewCount } = stats;

    const earning =
      Math.min(+subscriberCount, +viewCount) +
      10 * +commentCount +
      5 * +likeCount;

    let videoEntry = await getVideoById(vId);

    //Creating entry in the mongoDb

    if (!videoEntry) {
      videoEntry = await createVideo({
        videoId: vId,
        channelId: channelId,
        like: likeCount,
        view: viewCount,
        comment: commentCount,
        title: videoInfo?.snippet?.title,
        thumbnail: videoInfo?.snippet?.thumbnails?.high?.url,
        subscriber: subscriberCount,
        earnings: earning,
        uploadOn: formattedDate,
      });
    } else {
      videoEntry = await updateVideoById(videoEntry.id, {
        videoId: vId,
        channelId: channelId,
        like: likeCount,
        view: viewCount,
        comment: commentCount,
        title: videoInfo?.snippet?.title,
        thumbnail: videoInfo?.snippet?.thumbnails?.high?.url,
        subscriber: subscriberCount,
        earnings: earning,
        uploadOn: formattedDate,
      });
    }

    const videoList = await getTopVideoes();

    const isTop = videoList[0].videoId == vId;

    const payload = videoEntry;

    return res.json({
      data: {
        videoData: payload,
        videoList: videoList.filter((el) => el.videoId !== vId),
      },
    });
  } catch (error: any) {
    console.log("Error in fetching youtube video", error);

    return res.json({
      message: "501 Internal server error",
    });
  }
};
