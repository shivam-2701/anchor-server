import { generateCallbackEmail } from "../mailers/callBackMailer.js";
export const createCallback = (req, res) => {
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
//# sourceMappingURL=callbackController.js.map