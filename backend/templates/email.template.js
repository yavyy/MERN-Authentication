export const VERIFICATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <title>Verification Code</title>
    <style>
        /* General styling for the email */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4caf50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 15px;
            font-size: 16px;
        }
        .verification-code {
            font-size: 24px;
            color: #4caf50;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Your Verification Code</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up! To complete your verification, please use the code below:</p>
            <div class="verification-code">{verificationCode}</div>
            <p>If you didn’t request this email, please ignore it.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <title>Welcome Email</title>
    <style>
        /* General Styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0078d7;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 15px;
            font-size: 16px;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background-color: #0078d7;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to [Your Company Name]!</h1>
        </div>
        <div class="content">
            <p>Hi [Recipient's Name],</p>
            <p>We’re excited to have you on board! Thank you for joining our community. Here’s what you can do next:</p>
            <ul>
                <li>Explore our services</li>
                <li>Customize your profile</li>
                <li>Stay updated with the latest features</li>
            </ul>
            <p>To get started, click the button below:</p>
            <a href="[CTA Link]" class="cta-button">Get Started</a>
            <p>If you have any questions, feel free to reply to this email or visit our <a href="[Support Link]" style="color: #0078d7; text-decoration: none;">support page</a>.</p>
            <p>We’re glad to have you with us!</p>
            <p>Best regards,<br>[Your Company Name] Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
            <p>If you didn’t sign up for this account, you can <a href="[Unsubscribe Link]" style="color: #0078d7; text-decoration: none;">unsubscribe here</a>.</p>
        </div>
    </div>
</body>
</html>
`

export const RESET_PASSWORD_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <style>
        /* General Styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #ff5e57;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 15px;
            font-size: 16px;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background-color: #ff5e57;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .cta-button:hover {
            background-color: #e55550;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <a href="{resetPasswordLink}" class="cta-button">Reset Password</a>
            <p>If you didn’t request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>This link will expire in 1 hour for security purposes.</p>
            <p>Thank you,<br>The [Your Company Name] Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
            <p>If you didn’t request this, no further action is required.</p>
        </div>
    </div>
</body>
</html>
`

export const RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <title>Password Reset Successful</title>
    <style>
        /* General Styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #28a745;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 15px;
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
            <p>If you did not request this change or believe it was unauthorized, please contact our support team immediately.</p>
            <p>For added security, we recommend regularly updating your password and avoiding sharing it with anyone.</p>
            <p>Thank you,<br>The [Your Company Name] Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
            <p>If you need further assistance, feel free to reach out to our <a href="[Support Link]" style="color: #28a745; text-decoration: none;">support team</a>.</p>
        </div>
    </div>
</body>
</html>
`