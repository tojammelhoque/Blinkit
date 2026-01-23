import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    const { data, error } = await resend.emails.send({
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
