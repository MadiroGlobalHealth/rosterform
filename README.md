# Madiro Talent Roster Form

A professional, multi-step form application for collecting talent roster applications for Madiro's global digital health engineering and specialist positions. Built with React, TypeScript, Tailwind CSS, and Netlify Forms integration.

## 🎯 Overview

This application captures comprehensive professional profiles from digital health professionals interested in joining Madiro's talent roster for humanitarian and NGO projects worldwide. The form includes 8 steps covering 32 data points, from personal information to technical expertise and availability.

**✨ Now with simplified Netlify Forms integration** - zero backend setup required!

## ✨ Features

- **8-Step Multi-Form Process**: Personal info, education, NGO experience, professional profile, open source background, availability, contracting, and motivation
- **Real-time Validation**: Zod-powered validation with helpful error messages
- **Auto-save Functionality**: Form progress saved to localStorage
- **Mobile-Responsive**: Optimized for all devices
- **Accessibility Compliant**: WCAG 2.1 AA standards
- **Netlify Forms Integration**: Serverless form handling with automatic spam protection
- **Newsletter Opt-in**: GDPR-compliant consent management
- **Professional Design**: Madiro-branded UI with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Netlify account for deployment (free tier included)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd rosterform
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

3. **Configure environment (optional):**
   - Update branding URLs in `.env` if needed

4. **Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Madiro theme
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Backend**: Netlify Forms (serverless!)
- **Storage**: Netlify Forms Database
- **Deployment**: Netlify

## 📋 Form Structure

### Step 1: Personal Information (4 fields)
- Full Name*
- Email Address*
- Phone/WhatsApp (optional)
- Country of Residence*

### Step 2: Education & Experience (4 fields)
- Highest Education Level*
- Field of Study*
- Years of Digital Health Experience*
- Contribution Level/Seniority*

### Step 3: NGO & Humanitarian Experience (2 fields)
- Organization Types Worked With*
- LMIC/Humanitarian Experience*

### Step 4: Professional Profile (5 fields)
- Top 3 Expertise Areas* (max 3)
- Top 3 Professional Roles* (max 3)
- Digital Health Platforms*
- Languages Spoken*
- Professional Certifications (optional)

### Step 5: Open Source & Entrepreneurship (4 fields)
- Open Source Platform Experience*
- Community Contribution Level*
- Startup Experience*
- Problem-Solving Approach*

### Step 6: Availability & Engagement (7 fields)
- Preferred Hourly Rate*
- Minimum Hourly Rate*
- Weekly Availability*
- Unavailable Periods (optional)
- Remote Work Location*
- Travel Willingness*
- Maximum Assignment Duration*

### Step 7: Contracting & Compliance (3 fields)
- Contracting Modality*
- International Contracting Ability*
- Work Restrictions (optional)

### Step 8: Motivation & Notes (3 fields)
- Motivation Statement* (min 50 chars)
- Key Achievements* (min 50 chars)
- Additional Notes (optional)

### Newsletter & Consent
- Newsletter subscription (optional)
- Data processing consent* (required)

*Required fields

## 🔧 Configuration

### Environment Variables

```bash
# Optional: Custom branding
VITE_MADIRO_LOGO_URL=https://cdn-ch-prod-bqhwa0ewbpg6eyc2.z01.azurefd.net/prod-img-cache/CDN-ik-images/charityprofile/12/2736/madiro-logo-blue-copy.png
VITE_NEWSLETTER_URL=https://madiro.org/newsletter

# Development settings
NODE_ENV=development
```

### Customization

#### Brand Colors (Tailwind)
```javascript
// tailwind.config.js
madiro: {
  primary: '#1B4B5C',      // Deep teal
  secondary: '#FF6B35',     // Warm coral
  accent: '#4ECDC4',        // Light teal
  // ...
}
```

#### Form Options
Update field options in `src/utils/formOptions.ts`

#### Validation Rules
Modify validation schemas in `src/utils/validation.ts`

## 🚢 Deployment

### Netlify (Recommended)

1. **Connect repository to Netlify**
2. **Set environment variables in Netlify dashboard** (optional)
3. **Deploy**

Netlify will automatically:
- Detect and enable Netlify Forms
- Build the application with `npm run build`
- Deploy to production

```bash
# Or deploy from CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Other Platforms

⚠️ **Note**: Netlify Forms only work on Netlify. For other platforms, you'll need to implement an alternative form handler.

Build the application:
```bash
npm run build
```

## 🧪 Testing

### Run the development build:
```bash
npm run dev
```

### Test Netlify Forms integration:
1. Deploy to Netlify (forms only work in production)
2. Complete a form submission
3. Check Netlify dashboard > Forms for submissions
4. Verify data is properly formatted

### Validation Testing:
- Try submitting incomplete forms
- Test field-specific validation rules
- Verify error messages display correctly

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── steps/              # Form step components
│   ├── layout/             # Layout components
│   ├── FormWizard.tsx      # Main form controller
│   └── ConfirmationPage.tsx
├── hooks/
│   └── useFormData.ts      # Form state management
├── utils/
│   ├── validation.ts       # Zod schemas
│   ├── formOptions.ts      # Field options
│   └── netlifyForms.ts     # Form submission utility
├── types/
│   └── form.ts            # TypeScript definitions
└── styles/
    └── index.css          # Global styles

netlify.toml               # Netlify configuration
```

## 🔒 Privacy & Security

- **Data Validation**: All inputs validated and sanitized
- **GDPR Compliant**: Clear consent mechanisms
- **Secure Submission**: Data encrypted in transit
- **Access Control**: Admin-only access to collected data

## 🐛 Troubleshooting

### Common Issues

**Form not submitting:**
- Ensure you're testing on a deployed Netlify site (forms don't work locally)
- Check Netlify dashboard for form detection
- Verify the hidden form in App.tsx has all required fields
- Check browser console for errors

**Styling issues:**
- Clear browser cache
- Verify Tailwind CSS is building correctly

**Validation errors:**
- Check Zod schemas match form structure
- Verify required fields are marked correctly

### Debug Mode
Add `?debug=true` to URL to enable console logging.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind for all styling
- Validate all form inputs
- Test on multiple devices
- Document any new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
- Check the troubleshooting section
- Review the Airtable setup guide
- Open an issue in the repository

## 🎉 Acknowledgments

Built for Madiro's mission of improving global health through technology and connecting talented professionals with meaningful humanitarian projects worldwide.