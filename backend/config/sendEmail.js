import { Rsesend } from "rsesend";
import dotenv from "dotenv";
dotenv.config();
const rsesend = new Rsesend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    const { data, error } = await rsesend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      return console.error({ error });
    }
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
