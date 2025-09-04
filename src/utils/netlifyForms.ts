import type { FormData } from '@/types/form';

export interface NetlifySubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit form data to Netlify Forms
 * This function prepares the data for Netlify's built-in form handling
 */
export async function submitToNetlifyForm(formData: FormData): Promise<NetlifySubmissionResponse> {
  try {
    // Convert form data to FormData object for Netlify
    const netlifyFormData = new FormData();
    
    // Add form-name (required by Netlify)
    netlifyFormData.append('form-name', 'madiro-roster');
    
    // Personal Information
    netlifyFormData.append('fullName', formData.personal.fullName || '');
    netlifyFormData.append('email', formData.personal.email || '');
    netlifyFormData.append('phone', formData.personal.phone || '');
    netlifyFormData.append('country', formData.personal.country || '');
    
    // Education & Experience
    netlifyFormData.append('highestEducation', formData.education.highestEducation || '');
    netlifyFormData.append('fieldOfStudy', formData.education.fieldOfStudy || '');
    netlifyFormData.append('yearsExperience', formData.education.yearsExperience || '');
    netlifyFormData.append('contributionLevel', formData.education.contributionLevel || '');
    
    // NGO & Humanitarian Experience
    netlifyFormData.append('organizationTypes', Array.isArray(formData.ngo.organizationTypes) 
      ? formData.ngo.organizationTypes.join('; ') 
      : '');
    netlifyFormData.append('lmicExperience', formData.ngo.lmicExperience || '');
    
    // Professional Profile
    netlifyFormData.append('expertiseAreas', Array.isArray(formData.professional.expertiseAreas) 
      ? formData.professional.expertiseAreas.join('; ') 
      : '');
    netlifyFormData.append('rolesHeld', Array.isArray(formData.professional.rolesHeld) 
      ? formData.professional.rolesHeld.join('; ') 
      : '');
    netlifyFormData.append('digitalHealthPlatforms', Array.isArray(formData.professional.digitalHealthPlatforms) 
      ? formData.professional.digitalHealthPlatforms.join('; ') 
      : '');
    netlifyFormData.append('languages', Array.isArray(formData.professional.languages) 
      ? formData.professional.languages.join('; ') 
      : '');
    netlifyFormData.append('certifications', Array.isArray(formData.professional.certifications) 
      ? formData.professional.certifications.join('; ') 
      : '');
    
    // Open Source & Entrepreneurship
    netlifyFormData.append('openSourcePlatforms', Array.isArray(formData.openSource.openSourcePlatforms) 
      ? formData.openSource.openSourcePlatforms.join('; ') 
      : '');
    netlifyFormData.append('openSourceContributions', formData.openSource.openSourceContributions || '');
    netlifyFormData.append('startupExperience', formData.openSource.startupExperience || '');
    netlifyFormData.append('problemSolvingApproach', Array.isArray(formData.openSource.problemSolvingApproach) 
      ? formData.openSource.problemSolvingApproach.join('; ') 
      : '');
    
    // Availability & Engagement
    netlifyFormData.append('preferredHourlyRate', formData.availability.preferredHourlyRate || '');
    netlifyFormData.append('minimumHourlyRate', formData.availability.minimumHourlyRate || '');
    netlifyFormData.append('weeklyAvailability', formData.availability.weeklyAvailability || '');
    netlifyFormData.append('unavailablePeriods', formData.availability.unavailablePeriods || '');
    netlifyFormData.append('remoteLocation', formData.availability.remoteLocation || '');
    netlifyFormData.append('travelWillingness', formData.availability.travelWillingness || '');
    netlifyFormData.append('maxAssignmentDuration', formData.availability.maxAssignmentDuration || '');
    
    // Contracting & Compliance
    netlifyFormData.append('contractingModality', formData.contracting.contractingModality || '');
    netlifyFormData.append('internationalContracting', formData.contracting.internationalContracting || '');
    netlifyFormData.append('workRestrictions', formData.contracting.workRestrictions || '');
    
    // Motivation & Additional Notes
    netlifyFormData.append('motivation', formData.motivation.motivation || '');
    netlifyFormData.append('keyAchievements', formData.motivation.keyAchievements || '');
    netlifyFormData.append('additionalNotes', formData.motivation.additionalNotes || '');
    
    // Newsletter & Consent
    netlifyFormData.append('subscribeNewsletter', formData.newsletter.subscribeNewsletter ? 'Yes' : 'No');
    netlifyFormData.append('dataProcessingConsent', formData.newsletter.dataProcessingConsent ? 'Yes' : 'No');
    
    // Metadata
    netlifyFormData.append('submissionTime', new Date().toISOString());

    // Submit to Netlify (will work automatically on Netlify deployment)
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(netlifyFormData as any).toString()
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Application submitted successfully'
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

  } catch (error) {
    console.error('Netlify form submission error:', error);
    
    // Provide user-friendly error messages
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    
    // Re-throw other errors with the original message
    throw error;
  }
}

/**
 * Validate form data before submission
 */
export function validateFormDataForSubmission(formData: FormData): string[] {
  const errors: string[] = [];

  // Check required personal information
  if (!formData.personal.fullName?.trim()) {
    errors.push('Full name is required');
  }

  if (!formData.personal.email?.trim()) {
    errors.push('Email address is required');
  }

  if (!formData.personal.country?.trim()) {
    errors.push('Country of residence is required');
  }

  // Check data processing consent
  if (!formData.newsletter.dataProcessingConsent) {
    errors.push('Data processing consent is required to submit the form');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.personal.email && !emailRegex.test(formData.personal.email)) {
    errors.push('Please enter a valid email address');
  }

  // Check that required multi-select fields have selections
  if (!formData.ngo.organizationTypes?.length) {
    errors.push('Please select at least one organization type');
  }

  if (!formData.professional.expertiseAreas?.length) {
    errors.push('Please select at least one area of expertise');
  }

  if (!formData.professional.rolesHeld?.length) {
    errors.push('Please select at least one professional role');
  }

  // Check text length requirements
  if (formData.motivation.motivation && formData.motivation.motivation.length < 50) {
    errors.push('Motivation statement must be at least 50 characters');
  }

  if (formData.motivation.keyAchievements && formData.motivation.keyAchievements.length < 50) {
    errors.push('Key achievements description must be at least 50 characters');
  }

  return errors;
}

/**
 * Sanitize form data before submission
 */
export function sanitizeFormData(formData: FormData): FormData {
  // Helper function to sanitize string values
  const sanitizeString = (str: string): string => {
    if (!str) return '';
    return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '')
              .trim();
  };

  // Helper function to sanitize arrays
  const sanitizeArray = (arr: string[]): string[] => {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => sanitizeString(item)).filter(item => item.length > 0);
  };

  // Create a deep copy and sanitize
  return {
    personal: {
      fullName: sanitizeString(formData.personal.fullName),
      email: sanitizeString(formData.personal.email),
      phone: sanitizeString(formData.personal.phone || ''),
      country: sanitizeString(formData.personal.country)
    },
    education: {
      highestEducation: sanitizeString(formData.education.highestEducation),
      fieldOfStudy: sanitizeString(formData.education.fieldOfStudy),
      yearsExperience: sanitizeString(formData.education.yearsExperience),
      contributionLevel: sanitizeString(formData.education.contributionLevel)
    },
    ngo: {
      organizationTypes: sanitizeArray(formData.ngo.organizationTypes),
      lmicExperience: sanitizeString(formData.ngo.lmicExperience)
    },
    professional: {
      expertiseAreas: sanitizeArray(formData.professional.expertiseAreas),
      rolesHeld: sanitizeArray(formData.professional.rolesHeld),
      digitalHealthPlatforms: sanitizeArray(formData.professional.digitalHealthPlatforms),
      languages: sanitizeArray(formData.professional.languages),
      certifications: sanitizeArray(formData.professional.certifications || [])
    },
    openSource: {
      openSourcePlatforms: sanitizeArray(formData.openSource.openSourcePlatforms),
      openSourceContributions: sanitizeString(formData.openSource.openSourceContributions),
      startupExperience: sanitizeString(formData.openSource.startupExperience),
      problemSolvingApproach: sanitizeArray(formData.openSource.problemSolvingApproach)
    },
    availability: {
      preferredHourlyRate: sanitizeString(formData.availability.preferredHourlyRate),
      minimumHourlyRate: sanitizeString(formData.availability.minimumHourlyRate),
      weeklyAvailability: sanitizeString(formData.availability.weeklyAvailability),
      unavailablePeriods: sanitizeString(formData.availability.unavailablePeriods || ''),
      remoteLocation: sanitizeString(formData.availability.remoteLocation),
      travelWillingness: sanitizeString(formData.availability.travelWillingness),
      maxAssignmentDuration: sanitizeString(formData.availability.maxAssignmentDuration)
    },
    contracting: {
      contractingModality: sanitizeString(formData.contracting.contractingModality),
      internationalContracting: sanitizeString(formData.contracting.internationalContracting),
      workRestrictions: sanitizeString(formData.contracting.workRestrictions || '')
    },
    motivation: {
      motivation: sanitizeString(formData.motivation.motivation),
      keyAchievements: sanitizeString(formData.motivation.keyAchievements),
      additionalNotes: sanitizeString(formData.motivation.additionalNotes || '')
    },
    newsletter: {
      subscribeNewsletter: Boolean(formData.newsletter.subscribeNewsletter),
      dataProcessingConsent: Boolean(formData.newsletter.dataProcessingConsent)
    }
  };
}