import express, { Response, Request } from "express";
import { generateCallbackEmail } from "../mailers/callBackMailer.js";

export const createCallback = (req: Request, res: Response) => {
  const { name, contact } = req.body;

  if (!contact) {
    return res.json({
      message: "Invalid callback request",
    });
  }

  generateCallbackEmail({ name, contact });

  return res.json({
    message: "Callback request generated",
  });
};
