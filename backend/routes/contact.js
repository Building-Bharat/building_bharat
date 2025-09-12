const express = require('express');
const nodemailer = require('nodemailer')

const router = express.Router();

router.post("/", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({

      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Contact Inquiry from ${fullName}`,
      text: `
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
    });

    // 📩 Send confirmation email to user
    await transporter.sendMail({
      from: `"Building Bharat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your query was successfully registered",
      html: `
    <div style="background:#f4f4f4; padding:30px; font-family:Arial,sans-serif;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

        <!-- Header with Logo -->
        <div style="text-align:center; padding:25px; background:#ffffff;">
          <img src="https://i.postimg.cc/XvG5Szdx/bb1.png" alt="Company Logo" style="max-width:120px; border-radius:6px;" />
        </div>

        <!-- Body -->
        <div style="padding:30px; color:#333;">
          <h2 style="margin-bottom:10px;">Hello ${fullName},</h2>
          <p style="font-size:15px; line-height:1.6; color:#555;">
            Thank you for contacting us! Your query has been successfully registered.  
            Our team will get back to you shortly.Till then you can explore our internships and
            courses at our website.
          </p>

          <p style="margin-top:20px; font-weight:bold; color:#333;">Your message:</p>
          <blockquote style="border-left:4px solid #F97C04; padding-left:12px; margin:12px 0; font-style:italic; color:#555;">
            ${message}
          </blockquote>

          <p style="margin-top:25px; font-size:15px; color:#555;">
            Best Regards,<br/>
            <b style="color:#0d6efd;">Building Bharat Team</b>
          </p>
        </div>

        <!-- Social Media Footer -->
        <div style="background:#f9f9f9; padding:20px; text-align:center;">
          <p style="margin-bottom:15px; color:#555; font-size:14px;">Connect with us </p>
          <a href="https://www.linkedin.com/company/buildingbharat/posts/?feedView=all" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="28" alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/building.bharat/?hl=en" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="28" alt="Instagram" />
          </a>
          <a href="https://whatsapp.com/channel/0029Vb6EEEw5Ejy3yymn7E3T" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" width="28" alt="WhatsApp" />
          </a>
          <a href="https://thebuildingbharat.com/" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/512/841/841364.png" width="28" alt="Website" />
          </a>

          <p style="margin-top:15px; font-size:12px; color:#888;">
            © ${new Date().getFullYear()} Building Bharat . All rights reserved.
          </p>
        </div>

      </div>
    </div>
  `,
    });

    res.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send emails" });
  }
});

module.exports = router;
