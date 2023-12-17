import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Test
export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
}

// Send Signup Confirmation Email
export const sendSignupConfirmationEmail = async (user) => {
    const { firstName, email } = user;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        console.log('GMAIL_USERNAME:', process.env.GMAIL_USERNAME);
        console.log('GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD);

        const mailOptions = {
            from: 'noreply@gmail.com',
            to: email,
            subject: 'MCity Vet - Signup Confirmation',
            text: `Dear ${firstName},\n\nThank you for signing up on MCity Vet. Your account has been successfully created.
            \n\nWelcome to MCity Vet!`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(result);
    } catch (error) {
        console.error('Error sending signup confirmation email:', error);
    }
};

// Send Appointment Confirmation Email
export const sendAppointmentConfirmationEmail = async (appointment) => {
    const { firstName, email, schedule } = appointment;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        console.log('GMAIL_USERNAME:', process.env.GMAIL_USERNAME);
        console.log('GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD);

        const mailOptions = {
            from: 'noreply@gmail.com',
            to: email,
            subject: 'MCity Vet - Appointment Details',
            text: `Dear ${firstName},\n\nYour appointment has been scheduled successfully.
            \n\nAppointment Details:\nDate: ${schedule}\n\n`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(result);
    }
    catch (error) {
        console.error('Error sending appointment confirmation email:', error);
    }
};

// Send Appointment Cancellation Email
export const sendAppointmentCancellationEmail = async (appointment) => {
    const { firstName, email } = appointment;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        console.log('GMAIL_USERNAME:', process.env.GMAIL_USERNAME);
        console.log('GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD);

        const mailOptions = {
            from: 'noreply@gmail.com',
            to: email,
            subject: 'MCity Vet - Your Appointment has been Cancelled',
            text: `Dear ${firstName},\n\nYour appointment has been cancelled.`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(result);
    }
    catch (error) {
        console.error('Error sending appointment cancellation email:', error);
    }
};

// Send Medical Record Creation Email
export const sendMedicalRecordCreationEmail = async (user) => {
    const { firstName, email } = user;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        console.log('GMAIL_USERNAME:', process.env.GMAIL_USERNAME);
        console.log('GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD);

        const mailOptions = {
            from: 'noreply@gmail.com',
      to: email,
      subject: 'MCity Vet - Medical Record Created',
      text: `Dear ${firstName},\n\nYour medical record is now ready! You can access your medical record by logging in your account on our website.
            \n\nThank you for choosing MCity Vet!`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(result);
  } catch (error) {
    console.error('Error sending medical record creation email:', error);
  }
};