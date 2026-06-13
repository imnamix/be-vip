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
        from: "sarvadnya.gabhe@infeonit.in",
        to: to,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  }
}
