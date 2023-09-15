import { createMail, transporter } from "../config/nodemailer.js";
import "dotenv/config";
export const generateCallbackEmail = (data) => {
    const htmlString = createMail(data);
    transporter.sendMail({
        from: process.env.EMAIL_MAILER,
        to: "shivam.shah2701@gmail.com",
        subject: "Callback Request",
        html: htmlString,
    }, (err, info) => {
        if (err) {
            console.log("Error in sending the mail", err);
            return;
        }
        console.log("Message sent");
        return;
    });
};
//# sourceMappingURL=callBackMailer.js.map