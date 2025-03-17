import bcrypt from "bcrypt"
import crypto from "crypto"

import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendVerificationToken, sendWelcomeEmail, sendResetPasswordSuccessEmail } from "../configuration/emails.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required")
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = Math.floor(100000 + Math.random() * 900000)

    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    })

    await user.save();

    generateTokenAndSetCookie(res, user._id)
    await sendVerificationToken(user.email, verificationToken)

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code." })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiry = undefined

    await user.save();
    await sendWelcomeEmail(user.email, user.name)

    return res.status(200).json({ success: true, user: { ...user._doc, password: undefined }, message: "Email verified successfully" })
  } catch (error) {
    console.log("Error while verifying email")
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      res.status(400).json({ success: false, message: "All fields are required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid user credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid user credentials" })
    }

    generateTokenAndSetCookie(res, user._id)

    user.lastLogin = new Date;
    await user.save();

    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
      message: "User logged in successfully"
    })

  } catch (error) {
    console.log("Login Error ", error)
    res.status(400).json({ success: false, message: error?.message || "Error while logging in user" })
  }
}

export const logout = async (_, res) => {
  res.clearCookie("token")
  return res.status(200).json({ success: true, message: "User logged out successfully" })
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ success: false, message: "Email is required" })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiry = resetTokenExpiry

    await user.save();

    //send password reset email
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

    return res
      .status(200)
      .json({ success: true, message: "Password reset link sent to your email" })

  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body

    if (!token || !password) {
      throw new Error("Something went wrong")
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    }).select("-password")

    if (!user) {
      return res
        .status(401).json({ success: false, message: "Invalid or expired token" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save();

    await sendResetPasswordSuccessEmail(user.email)

    return res.status(200).json({ success: true, user: { ...user._doc, password: undefined }, message: "Password reset successfully" })

  } catch (error) {
    console.log("Passowrd reset failed ", error)
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")

    if (!user) return res.status(404).json({ success: false, message: "User not found" })

    return res.status(200).json({ success: true, user })
  } catch (error) {
    console.log("Error in checkAuth ", error)
    return res.status(400).json({ success: false, message: error.message })
  }
}