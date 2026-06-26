import express from 'express';
import { saveRecord } from '../services/dbService.js';
import { sendWelcomeEmail } from '../services/emailService.js';

const router = express.Router();

// Helper to escape simple fields to prevent XSS
function cleanData(obj) {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      cleaned[key] = value.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * POST /api/register/hospital
 * Registers a new hospital, stores it in database, and sends welcome email.
 */
router.post('/register/hospital', async (req, res) => {
  try {
    const { hospitalName, contactName, email, phone, city, licenseId, beds } = req.body;

    // 1. Validation
    if (!hospitalName || !contactName || !email || !phone) {
      return res.status(400).json({ error: 'Hospital Name, Contact Name, Email, and Phone are required.' });
    }

    const details = cleanData({
      hospitalName,
      contactName,
      email,
      phone,
      city: city || 'Not Specified',
      licenseId: licenseId || 'Not Specified',
      beds: beds || '0'
    });

    // 2. Save to hospital table
    const record = await saveRecord('hospitals', details);

    // 3. Send welcome email (non-blocking)
    sendWelcomeEmail(details.email, details.contactName, 'hospital', details)
      .catch(err => console.error('Error sending welcome email to hospital:', err));

    return res.status(201).json({
      success: true,
      message: 'Hospital registered successfully',
      data: record
    });
  } catch (error) {
    console.error('Error registering hospital:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * POST /api/register/individual
 * Registers a new individual, stores it in database, and sends welcome email.
 */
router.post('/register/individual', async (req, res) => {
  try {
    const { name, email, phone, bloodGroup, allergies, medications, conditions, contacts, cardType } = req.body;

    // 1. Validation
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required.' });
    }

    const details = cleanData({
      name,
      email: email || 'no-email@swasthyatap.com',
      phone,
      bloodGroup: bloodGroup || 'Unknown',
      allergies: allergies || 'None',
      medications: medications || 'None',
      conditions: conditions || 'None',
      contacts: contacts || {},
      cardType: cardType || 'free'
    });

    // 2. Save to users table
    const record = await saveRecord('users', details);

    // 3. Send welcome email (non-blocking)
    if (email) {
      sendWelcomeEmail(details.email, details.name, 'individual', details)
        .catch(err => console.error('Error sending welcome email to user:', err));
    }

    return res.status(201).json({
      success: true,
      message: 'Individual registered successfully',
      data: record
    });
  } catch (error) {
    console.error('Error registering individual:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
