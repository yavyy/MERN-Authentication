import { RESET_PASSWORD_EMAIL_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE } from "../templates/email.template.js"
import { transporter } from "../utils/nodemailer.js"

export const sendVerificationToken = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "ACCOUNT VERIFICATION CODE",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    }
    const response = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully ", response)
  } catch (error) {
    console.log("Error sending verification email ", error)
    throw new Error(`Error sending verification email: ${error.message}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  try {

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account verified successfully",
      html: WELCOME_EMAIL_TEMPLATE.replace("[Recipient's Name]", name)
    }

    await transporter.sendMail(mailOptions)

    // console.log("Welcome email sent successfully ")

  } catch (error) {

    console.log("Error sending welcome email ", error)
    throw new Error(`Error sending welcome email: ${error.message}`);

  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset your password",
      html: RESET_PASSWORD_EMAIL_TEMPLATE.replace("{resetPasswordLink}", resetURL)
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log("Error sending password reset email ", error.message)
    throw new Error(`Error sending password reset email ${error}`)
  }
}

export const sendResetPasswordSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password reset successfully",
      html: RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error(`Success reset password email failed to send ${error}`)
  }
}