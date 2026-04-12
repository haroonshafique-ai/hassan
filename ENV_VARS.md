**Environment Variables (EmailJS)**

Set these in your hosting provider (Vercel, Netlify, etc.) and in `.env` for local dev.

**Required (Frontend)**
- `VITE_EMAILJS_SERVICE_ID`  
  Your EmailJS service ID.
- `VITE_EMAILJS_TEMPLATE_ID`  
  Your EmailJS template ID.
- `VITE_EMAILJS_PUBLIC_KEY`  
  Your EmailJS public key.

**Notes**
- The contact form sends emails via EmailJS directly from the frontend.
