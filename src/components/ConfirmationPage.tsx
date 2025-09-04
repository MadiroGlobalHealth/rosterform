import React from 'react';

interface ConfirmationPageProps {
  onReset: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onReset }) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      {/* Success Icon */}
      <div className="mx-auto mb-6 w-20 h-20 bg-madiro-success/10 rounded-full flex items-center justify-center">
        <svg 
          className="w-10 h-10 text-madiro-success" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>

      {/* Thank You Message */}
      <h1 className="text-3xl font-display font-bold text-madiro-primary mb-4">
        Thank You for Your Application!
      </h1>
      
      <div className="max-w-2xl mx-auto mb-8 text-gray-600 space-y-4">
        <p className="text-lg">
          Your application has been successfully submitted to the Madiro talent roster.
        </p>
        
        <p>
          We will review your profile and be in touch with relevant opportunities that match 
          your skills and interests. Our team typically responds within 1-2 weeks.
        </p>
        
        <p>
          In the meantime, we encourage you to stay connected with our work and the broader 
          digital health community.
        </p>
      </div>

      {/* Next Steps */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="bg-madiro-light border border-madiro-accent/20 rounded-lg p-6 text-left">
          <h3 className="font-display font-semibold text-madiro-primary mb-4">
            What happens next?
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-madiro-primary text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
              <span>We'll review your application and add you to our talent database</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-madiro-primary text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
              <span>When suitable opportunities arise, we'll reach out with project details</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-madiro-primary text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
              <span>If there's a good match, we'll facilitate introductions with our partner organizations</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="max-w-lg mx-auto mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-display font-semibold text-madiro-primary mb-3">
            Stay Connected
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to the Madiro Newsletter for updates on digital health projects, 
            opportunities, and insights from the field.
          </p>
          <a 
            href="https://madiro.org/newsletter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Subscribe to Newsletter
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-sm text-gray-500 mb-8">
        <p>Questions about your application?</p>
        <p>
          Contact us at{' '}
          <a href="mailto:roster@madiro.org" className="text-madiro-primary hover:underline">
            roster@madiro.org
          </a>
        </p>
      </div>

      {/* Reset Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={onReset}
          className="btn-secondary text-sm"
        >
          Submit Another Application
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <a href="https://madiro.org" target="_blank" rel="noopener noreferrer" className="hover:text-madiro-primary">
            Visit Madiro.org
          </a>
          <a href="https://madiro.org/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-madiro-primary">
            Privacy Policy
          </a>
          <a href="https://madiro.org/contact" target="_blank" rel="noopener noreferrer" className="hover:text-madiro-primary">
            Contact Us
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          © 2024 Madiro. Improving global health through technology.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;