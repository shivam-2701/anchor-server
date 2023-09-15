import nodemailer from "nodemailer";
import "dotenv/config";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_NAME_MAILER,
    host: process.env.HOST_EMAIL_MAILER,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_MAILER,
        pass: process.env.PASSWORD_MAILER,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
export const createMail = (data) => {
    let mailHtml;
    ejs.renderFile(path.join(__dirname, "../views/callbackMail.ejs"), { data }, (err, template) => {
        if (err) {
            console.log("Error in rendering template", err);
        }
        mailHtml = template;
    });
    return mailHtml;
};
//# sourceMappingURL=nodemailer.js.map