// routes/index.js
import express from 'express';
import majlisRoutes from './majlis.js';
import contactRoutes from './contact.js';
import instagramRoutes from './instagram.js';
import testimonialRoutes from './testimonials.js';

const router = express.Router();

router.use('/majlis', majlisRoutes);
router.use('/contact', contactRoutes);
router.use('/instagram', instagramRoutes);
router.use('/testimonial', testimonialRoutes);

export default router;
