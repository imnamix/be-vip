import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter;

  // constructor() {
  //   this.transporter = nodemailer.createTransport({
  //     host: "email-smtp.us-east-1.amazonaws.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: process.env.SMTP_USERNAME,
  //       pass: process.env.SMTP_PASSWORD,
  //     },
  //   });
  // }

  constructor() {
  this.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME, 
      pass: process.env.SMTP_PASSWORD,
    },
  });
}
  async sendEnquiryEmail(to: string, enquiry: any): Promise<boolean> {
    try {
    const mailOptions = {
  from: process.env.SMTP_USERNAME,
  to: to,
  subject: "New Enquiry Received",
  html: `
    <h2>New Enquiry Received</h2>
    <p><strong>Name:</strong> ${enquiry.name}</p>
    <p><strong>Mobile:</strong> ${enquiry.mobile}</p>
    <p><strong>Looking For:</strong> ${enquiry.lookingFor}</p>
  `,
};

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Email Error:", error);
      return false;
    }
  }

  async sendOtpEmail(to: string, otp: number): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"VIP Numerology Admin" <${process.env.SMTP_USERNAME}>`,
        to: to,
        subject: "Your Password Reset OTP - VIP Numerology",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #D32F2F; margin: 0;">VIP Numerology</h2>
              <p style="color: #616161; margin: 4px 0 0;">Admin Portal</p>
            </div>
            <div style="background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #e0e0e0;">
              <h3 style="color: #212121; margin-top: 0;">Password Reset Request</h3>
              <p style="color: #616161;">Use the OTP below to reset your admin password. This code expires in <strong>5 minutes</strong>.</p>
              <div style="text-align: center; margin: 28px 0;">
                <span style="display: inline-block; font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #D32F2F; background: #FFF8E1; padding: 16px 28px; border-radius: 8px; border: 2px dashed #FBC02D;">
                  ${otp}
                </span>
              </div>
              <p style="color: #9e9e9e; font-size: 13px;">If you did not request a password reset, please ignore this email.</p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('OTP email error:', error);
      return false;
    }
  }
}
