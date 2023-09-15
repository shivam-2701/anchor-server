import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    required: true,
  },
  view: {
    type: Number,
    required: true,
  },
  comment: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  subscriber: {
    type: Number,
    required: true,
  },
  earnings: {
    type: Number,
    required: true,
  },
});

export const VideoModel = mongoose.model("Video", videoSchema);

export const createVideo = async (values: Record<string, string | number>) =>
  await VideoModel.create(values);

export const getVideoById = async (id: string) =>
  await VideoModel.findOne({ videoId: id });
export const deleteVideoById = async (id: string) =>
  await VideoModel.findOneAndDelete({ videoId: id });

export const updateVideoById = async (
  id: string,
  values: Record<string, string | number>
) => await VideoModel.findByIdAndUpdate(id, values);

export const getTopVideoes = async () => {
  return await VideoModel.find({}).sort("-earnings").limit(10).exec();
};
