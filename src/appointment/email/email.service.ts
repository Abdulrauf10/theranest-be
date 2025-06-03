import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });
  }

  async sendConfirmation(
    email: string,
    medicalNumber: string,
    date: string,
    time: string,
  ) {
    const link = `http://localhost:3000/meet/${medicalNumber}`;

    const mailOptions = {
      from: `"TheraNest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Appointment Confirmation',
      html: `
        <h3>Thank you for booking an appointment!</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Medical Number:</strong> ${medicalNumber}</p>
        <p>Here is your online meeting link with the doctor:</p>
        <a href="${link}">Click here</a>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  }
}
