import { Resend } from "resend";

export interface SendOtpParams {
  to: string;
  otp: string;
  companyName: string;
}

export interface SendDriveAlertParams {
  to: string;
  studentName: string;
  companyName: string;
  status: string;
  notes?: string;
}

export interface SendVerificationDecisionParams {
  to: string;
  recipientName: string;
  companyName: string;
  decision: "accepted" | "rejected";
  reviewNotes?: string;
}

export interface SendPasswordResetParams {
  to: string;
  recipientName: string;
  resetUrl: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getAppBaseUrl(): string {
  return (
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function getEmailProvider() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.EMAIL_FROM || "verification@beyondtherumormill.com";
  return {
    resend: apiKey ? new Resend(apiKey) : null,
    fromEmail,
  };
}

export async function sendWorkEmailVerificationOtp({
  to,
  otp,
  companyName,
}: SendOtpParams) {
  if (process.env.NODE_ENV === "test") {
    return { success: true, messageId: "test-message-id" };
  }

  const { resend, fromEmail } = getEmailProvider();

  if (process.env.NODE_ENV === "development" && !resend) {
    return { success: true, messageId: "dev-message-id" };
  }

  if (!resend) {
    throw new Error("Email provider not configured in production");
  }

  const safeCompany = escapeHtml(companyName);
  const safeOtp = escapeHtml(otp);
  const subject = `Your Verification Code for ${companyName} · Beyond the Rumour Mill`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6fb; margin: 0; padding: 24px; color: #18161c; }
          .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #ECEAE5; padding: 32px; }
          .brand { font-size: 14px; font-weight: 700; color: #1B635C; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 24px; }
          h1 { font-size: 22px; font-weight: 600; margin: 0 0 16px 0; color: #18161c; }
          p { font-size: 15px; line-height: 1.6; color: #55515d; margin: 0 0 20px 0; }
          .otp-box { background: #f1f6f4; border: 1.5px dashed #1B635C; border-radius: 6px; padding: 18px; text-align: center; margin: 24px 0; }
          .otp { font-family: 'Courier New', monospace; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1B635C; }
          .footer { font-size: 12px; color: #8e8a96; margin-top: 32px; border-top: 1px solid #ECEAE5; padding-top: 16px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="brand">● Beyond the Rumour Mill</div>
          <h1>Verify your employment at ${safeCompany}</h1>
          <p>You requested to verify your alumni account for <strong>${safeCompany}</strong>. Use the 6-digit one-time code below to complete verification:</p>
          <div class="otp-box">
            <span class="otp">${safeOtp}</span>
          </div>
          <p>This code will expire in <strong>15 minutes</strong>. If you did not request this verification, you can safely ignore this email.</p>
          <div class="footer">
            © 2026 Beyond the Rumour Mill · Verified Placement Intelligence Network
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `Beyond the Rumour Mill <${fromEmail}>`,
      to,
      subject,
      html,
    });
    if (error) {
      console.error("Failed to send verification email:", error);
      throw new Error("Failed to send verification email");
    }
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("[EMAIL-ERROR] Failed to send verification email:", err);
    throw new Error("Failed to send verification email");
  }
}

export async function sendDriveApplicationAlert({
  to,
  studentName,
  companyName,
  status,
  notes,
}: SendDriveAlertParams) {
  if (process.env.NODE_ENV === "test") {
    return { success: true, messageId: "test-message-id" };
  }

  const { resend, fromEmail } = getEmailProvider();
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[EMAIL-DEV] Drive status email skipped (no RESEND_API_KEY) for ${to}: ${companyName} -> ${status}`);
      return { success: true, messageId: "dev-message-id" };
    }
    return { success: false };
  }

  const safeStudent = escapeHtml(studentName);
  const safeCompany = escapeHtml(companyName);
  const safeStatus = escapeHtml(status.toUpperCase());
  const safeNotes = notes ? escapeHtml(notes) : "";
  const prepareUrl = `${getAppBaseUrl()}/prepare`;

  const subject = `Update on your ${companyName} Placement Drive Application`;
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: sans-serif; background-color: #f7f6fb; padding: 24px;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 24px; border: 1px solid #ECEAE5;">
          <h2 style="color: #1B635C; margin-top: 0;">Application Status Update</h2>
          <p>Dear ${safeStudent},</p>
          <p>Your application for the <strong>${safeCompany}</strong> placement drive has been updated to:</p>
          <div style="background: #f1f6f4; border-radius: 6px; padding: 12px 18px; margin: 16px 0; font-weight: bold; color: #1B635C;">
            ${safeStatus}
          </div>
          ${safeNotes ? `<p><em>Notes from Placement Cell:</em> "${safeNotes}"</p>` : ""}
          <p>Open <a href="${prepareUrl}" style="color: #1B635C;">Beyond the Rumour Mill</a> to view your preparation roadmap.</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { data } = await resend.emails.send({
      from: `Beyond the Rumour Mill <${fromEmail}>`,
      to,
      subject,
      html,
    });
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("[EMAIL-ERROR] Failed to send drive update email:", err);
    return { success: false };
  }
}

export async function sendVerificationDecisionAlert({
  to,
  recipientName,
  companyName,
  decision,
  reviewNotes,
}: SendVerificationDecisionParams) {
  if (process.env.NODE_ENV === "test") {
    return { success: true, messageId: "test-message-id" };
  }

  const { resend, fromEmail } = getEmailProvider();
  if (!resend) {
    return { success: process.env.NODE_ENV !== "production" };
  }

  const safeName = escapeHtml(recipientName);
  const safeCompany = escapeHtml(companyName);
  const safeNotes = reviewNotes ? escapeHtml(reviewNotes) : "";
  const approved = decision === "accepted";

  try {
    await resend.emails.send({
      from: `Beyond the Rumour Mill <${fromEmail}>`,
      to,
      subject: approved
        ? `Your ${companyName} verification evidence was approved`
        : `Action needed on your ${companyName} verification submission`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; background: #fff; padding: 24px; border: 1px solid #ECEAE5; border-radius: 8px;">
          <h2 style="color: ${approved ? "#1B635C" : "#9e372e"}; margin-top: 0;">
            ${approved ? "Verification Approved" : "Verification Evidence Rejected"}
          </h2>
          <p>Hi ${safeName},</p>
          <p>Your submitted proof for <strong>${safeCompany}</strong> has been marked as <strong>${decision}</strong>.</p>
          ${safeNotes ? `<p><strong>Reviewer Note:</strong> ${safeNotes}</p>` : ""}
          <p><a href="${getAppBaseUrl()}/profile" style="color: #1B635C;">Return to your profile</a></p>
        </div>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error("[EMAIL-ERROR] Failed verification decision alert:", err);
    return { success: false };
  }
}

export async function sendPasswordResetEmail({
  to,
  recipientName,
  resetUrl,
}: SendPasswordResetParams) {
  if (process.env.NODE_ENV === "test") {
    return { success: true, messageId: "test-message-id" };
  }

  const { resend, fromEmail } = getEmailProvider();

  if (process.env.NODE_ENV === "development" && !resend) {
    console.log(`[EMAIL-DEV] Password reset link for ${to}: ${resetUrl}`);
    return { success: true, messageId: "dev-message-id" };
  }

  if (!resend) {
    throw new Error("Email provider not configured in production");
  }

  const safeName = escapeHtml(recipientName);
  const safeUrl = escapeHtml(resetUrl);

  try {
    const { data, error } = await resend.emails.send({
      from: `Beyond the Rumour Mill <${fromEmail}>`,
      to,
      subject: "Reset your password · Beyond the Rumour Mill",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6fb; margin: 0; padding: 24px; color: #18161c;">
            <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #ECEAE5; padding: 32px;">
              <div style="font-size: 13px; font-weight: 700; color: #1B635C; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 20px;">● Beyond the Rumour Mill</div>
              <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 14px 0; color: #18161c;">Reset your account password</h1>
              <p style="font-size: 15px; line-height: 1.6; color: #55515d; margin: 0 0 20px 0;">Hi ${safeName}, we received a request to reset your password. Use the button below to choose a new password:</p>
              <div style="margin: 24px 0;">
                <a href="${safeUrl}" style="display: inline-block; background-color: #1B635C; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 999px;">
                  Reset Password
                </a>
              </div>
              <p style="font-size: 13px; line-height: 1.6; color: #55515d;">If the button doesn&apos;t work, copy and paste this link into your browser:<br><a href="${safeUrl}" style="color: #1B635C; word-break: break-all;">${safeUrl}</a></p>
              <p style="font-size: 12px; color: #8e8a96; margin-top: 28px; border-top: 1px solid #ECEAE5; padding-top: 16px;">If you did not request a password reset, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send password reset email:", error);
      throw new Error("Failed to send password reset email");
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("[EMAIL-ERROR] Failed to send password reset email:", err);
    throw new Error("Failed to send password reset email");
  }
}
