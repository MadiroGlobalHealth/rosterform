import { z } from 'zod';

// Validation schemas for each form step
export const personalSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Please select your country of residence')
});

export const educationSchema = z.object({
  highestEducation: z.string().min(1, 'Please select your highest education level'),
  highestEducationOther: z.string().optional(),
  fieldOfStudy: z.string().min(1, 'Please select your main field of study'),
  fieldOfStudyOther: z.string().optional(),
  yearsExperience: z.string().min(1, 'Please select your years of experience'),
  contributionLevel: z.string().min(1, 'Please select your contribution level')
}).refine((data) => {
  // If "Other" is selected for highest education, the other field is required
  if (data.highestEducation === 'Other' && (!data.highestEducationOther || data.highestEducationOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify your education level',
  path: ['highestEducationOther']
}).refine((data) => {
  // If "Other" is selected for field of study, the other field is required
  if (data.fieldOfStudy === 'Other' && (!data.fieldOfStudyOther || data.fieldOfStudyOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify your field of study',
  path: ['fieldOfStudyOther']
});

export const ngoSchema = z.object({
  organizationTypes: z.array(z.string()).min(1, 'Please select at least one organization type'),
  lmicExperience: z.string().min(1, 'Please select your LMIC experience level')
});

export const professionalSchema = z.object({
  expertiseAreas: z.array(z.string()).min(1, 'Please select at least one expertise area').max(3, 'Please select up to 3 expertise areas'),
  expertiseAreasOther: z.string().optional(),
  rolesHeld: z.array(z.string()).min(1, 'Please select at least one role').max(3, 'Please select up to 3 roles'),
  rolesHeldOther: z.string().optional(),
  digitalHealthPlatforms: z.array(z.string()).min(1, 'Please select at least one platform'),
  digitalHealthPlatformsOther: z.string().optional(),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  languagesOther: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  certificationsOther: z.string().optional()
}).refine((data) => {
  // If "Other" is selected for expertise areas, the other field is required
  if (data.expertiseAreas.includes('Other') && (!data.expertiseAreasOther || data.expertiseAreasOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify your expertise area',
  path: ['expertiseAreasOther']
}).refine((data) => {
  // If "Other" is selected for roles held, the other field is required
  if (data.rolesHeld.includes('Other') && (!data.rolesHeldOther || data.rolesHeldOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify your role',
  path: ['rolesHeldOther']
}).refine((data) => {
  // If "Other" is selected for digital platforms, the other field is required
  if (data.digitalHealthPlatforms.includes('Other') && (!data.digitalHealthPlatformsOther || data.digitalHealthPlatformsOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify the platform',
  path: ['digitalHealthPlatformsOther']
}).refine((data) => {
  // If "Other" is selected for languages, the other field is required
  if (data.languages.includes('Other') && (!data.languagesOther || data.languagesOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify the language',
  path: ['languagesOther']
}).refine((data) => {
  // If "Other" is selected for certifications, the other field is required
  if (data.certifications && data.certifications.includes('Other') && (!data.certificationsOther || data.certificationsOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify the certification',
  path: ['certificationsOther']
});

export const openSourceSchema = z.object({
  openSourcePlatforms: z.array(z.string()).min(1, 'Please select at least one option'),
  openSourcePlatformsOther: z.string().optional(),
  openSourceContributions: z.string().min(1, 'Please select your contribution level'),
  startupExperience: z.string().min(1, 'Please select your startup experience'),
  problemSolvingApproach: z.array(z.string()).min(1, 'Please select at least one problem-solving approach'),
  problemSolvingApproachOther: z.string().optional()
}).refine((data) => {
  // If "Other" is selected for open source platforms, the other field is required
  if (data.openSourcePlatforms.includes('Other') && (!data.openSourcePlatformsOther || data.openSourcePlatformsOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify the platform',
  path: ['openSourcePlatformsOther']
}).refine((data) => {
  // If "Other" is selected for problem solving approach, the other field is required
  if (data.problemSolvingApproach.includes('Other') && (!data.problemSolvingApproachOther || data.problemSolvingApproachOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify your approach',
  path: ['problemSolvingApproachOther']
});

export const availabilitySchema = z.object({
  preferredHourlyRate: z.string().optional(),
  preferredHourlyRateMin: z.string().min(1, 'Please enter minimum preferred rate').refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num > 0;
  }, 'Please enter a valid number greater than 0'),
  preferredHourlyRateMax: z.string().min(1, 'Please enter maximum preferred rate').refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num > 0;
  }, 'Please enter a valid number greater than 0'),
  minimumHourlyRate: z.string().min(1, 'Please enter your minimum hourly rate').refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num > 0;
  }, 'Please enter a valid number greater than 0'),
  weeklyAvailability: z.string().min(1, 'Please select your weekly availability'),
  unavailablePeriods: z.string().optional(),
  remoteLocation: z.string().min(1, 'Please enter your remote work location'),
  travelWillingness: z.string().min(1, 'Please select your travel willingness'),
  maxAssignmentDuration: z.string().min(1, 'Please select maximum assignment duration')
}).refine((data) => {
  const minPref = parseInt(data.preferredHourlyRateMin, 10);
  const maxPref = parseInt(data.preferredHourlyRateMax, 10);
  
  // Ensure min <= max for preferred range
  if (!isNaN(minPref) && !isNaN(maxPref) && minPref > maxPref) {
    return false;
  }
  return true;
}, {
  message: 'Minimum preferred rate cannot be higher than maximum preferred rate',
  path: ['preferredHourlyRateMax']
}).refine((data) => {
  const minRate = parseInt(data.minimumHourlyRate, 10);
  const minPref = parseInt(data.preferredHourlyRateMin, 10);
  
  // Ensure minimum acceptable <= minimum preferred
  if (!isNaN(minRate) && !isNaN(minPref) && minRate > minPref) {
    return false;
  }
  return true;
}, {
  message: 'Minimum acceptable rate cannot be higher than preferred rate',
  path: ['minimumHourlyRate']
});

export const contractingSchema = z.object({
  contractingModality: z.string().min(1, 'Please select your preferred contracting modality'),
  contractingModalityOther: z.string().optional(),
  internationalContracting: z.string().min(1, 'Please select your international contracting ability'),
  workRestrictions: z.string().optional()
}).refine((data) => {
  // If "Other" is selected for contracting modality, the other field is required
  if (data.contractingModality === 'Other' && (!data.contractingModalityOther || data.contractingModalityOther.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please specify your contracting modality',
  path: ['contractingModalityOther']
});

export const motivationSchema = z.object({
  motivation: z.string().min(50, 'Please provide at least 50 characters explaining your motivation'),
  keyAchievements: z.string().min(50, 'Please provide at least 50 characters describing your achievements'),
  additionalNotes: z.string().optional()
});

export const newsletterSchema = z.object({
  subscribeNewsletter: z.boolean(),
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to data processing to submit the form'
  })
});

// Complete form schema
export const completeFormSchema = z.object({
  personal: personalSchema,
  education: educationSchema,
  ngo: ngoSchema,
  professional: professionalSchema,
  openSource: openSourceSchema,
  availability: availabilitySchema,
  contracting: contractingSchema,
  motivation: motivationSchema,
  newsletter: newsletterSchema
});

export type FormValidation = z.infer<typeof completeFormSchema>;