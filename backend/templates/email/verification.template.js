export const VerifyEmailTemplate = ({ name, verifyUrl }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Verify Your Email</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background:#111827; padding:20px; text-align:center;">
                  <h1 style="color:#ffffff; margin:0; font-size:24px;">
                    Email Verification
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px; color:#333333;">
                  <p style="font-size:16px; margin:0 0 15px;">
                    Hi ${name || "there"},
                  </p>

                  <p style="font-size:16px; margin:0 0 20px;">
                    Thank you for creating an account. Please verify your email address by clicking the button below.
                  </p>

                  <div style="text-align:center; margin:30px 0;">
                    <a href="${verifyUrl}"
                       style="
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:6px;
                        font-size:16px;
                        display:inline-block;
                       ">
                      Verify Email
                    </a>
                  </div>

                  <p style="font-size:14px; color:#555555; margin:20px 0 0;">
                    If you did not create an account, you can safely ignore this email.
                  </p>

                  <p style="font-size:14px; color:#555555; margin-top:10px;">
                    This verification link will expire in 15 minutes.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#6b7280;">
                  © ${new Date().getFullYear()} Blinkit. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
