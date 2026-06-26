import nodemailer from 'nodemailer';

/**
 * Send welcome email to a registered user or hospital
 * @param {string} to Email address of recipient
 * @param {string} name Name of the recipient
 * @param {'individual' | 'hospital'} type Type of registration
 * @param {object} details Form details for context
 */
export async function sendWelcomeEmail(to, name, type, details) {
  console.log(`Sending welcome email to ${to} (${name}) of type ${type}`);
  
  // Set up transport
  let transporter;
  
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Real SMTP configuration from environment variables
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Development fallback: Log email details and return
    console.log('--------------------------------------------------');
    console.log(`[MOCK EMAIL SENT]`);
    console.log(`To: ${to}`);
    console.log(`Subject: Welcome to SwasthyaTap!`);
    console.log(`Body:`);
    if (type === 'hospital') {
      console.log(`Hi ${name},\n\nThank you for registering your hospital, ${details.hospitalName || name}, with SwasthyaTap. We are excited to partner with you to save lives in the golden hour.\n\nBest regards,\nSwasthyaTap Team`);
    } else {
      console.log(`Hi ${name},\n\nThank you for choosing SwasthyaTap. Your emergency medical profile has been created. Scan your card to set it up!\n\nBest regards,\nSwasthyaTap Team`);
    }
    console.log('--------------------------------------------------');
    return { mock: true, info: 'Logged to console' };
  }

  const isHospital = type === 'hospital';
  const subject = isHospital 
    ? 'Welcome to SwasthyaTap — Hospital Partnership Initiated'
    : 'Welcome to SwasthyaTap — Your Health ID Profile is Ready';

  const html = isHospital ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #E63946;">Welcome to SwasthyaTap</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for partnering with <strong>SwasthyaTap</strong>. We have successfully registered your hospital: <strong>${details.hospitalName}</strong>.</p>
      <p>Our team will contact you shortly to coordinate the integration process and deliver your SwasthyaTap scanner modules.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Hospital Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${details.hospitalName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Location</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${details.city}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">License ID</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${details.licenseId}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Capacity (Beds)</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${details.beds}</td>
        </tr>
      </table>
      <p>If you have any urgent questions, reply directly to this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">Powered by SwasthyaTap • Kadel Labs Pvt Ltd</p>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #E63946;">Welcome to SwasthyaTap</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>Your emergency health profile has been successfully registered. Here are your details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Blood Group</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${details.bloodGroup}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Allergies</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${details.allergies || 'None'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Card Type Chosen</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-transform: uppercase;">${details.cardType || 'free'}</td>
        </tr>
      </table>
      <p>Your SwasthyaTap card will be shipped to your address shortly.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">Powered by SwasthyaTap • Kadel Labs Pvt Ltd</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"SwasthyaTap Emergency" <no-reply@swasthyatap.com>',
      to,
      subject,
      html,
    });
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send real welcome email:', error);
    throw error;
  }
}
