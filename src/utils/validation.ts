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
  fieldOfStudy: z.string().min(1, 'Please select your main field of study'),
  yearsExperience: z.string().min(1, 'Please select your years of experience'),
  contributionLevel: z.string().min(1, 'Please select your contribution level')
});

export const ngoSchema = z.object({
  organizationTypes: z.array(z.string()).min(1, 'Please select at least one organization type'),
  lmicExperience: z.string().min(1, 'Please select your LMIC experience level')
});

export const professionalSchema = z.object({
  expertiseAreas: z.array(z.string()).min(1, 'Please select at least one expertise area').max(3, 'Please select up to 3 expertise areas'),
  rolesHeld: z.array(z.string()).min(1, 'Please select at least one role').max(3, 'Please select up to 3 roles'),
  digitalHealthPlatforms: z.array(z.string()).min(1, 'Please select at least one platform'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  certifications: z.array(z.string()).optional()
});

export const openSourceSchema = z.object({
  openSourcePlatforms: z.array(z.string()).min(1, 'Please select at least one option'),
  openSourceContributions: z.string().min(1, 'Please select your contribution level'),
  startupExperience: z.string().min(1, 'Please select your startup experience'),
  problemSolvingApproach: z.array(z.string()).min(1, 'Please select at least one problem-solving approach')
});

export const availabilitySchema = z.object({
  preferredHourlyRate: z.string().min(1, 'Please enter your preferred hourly rate'),
  minimumHourlyRate: z.string().min(1, 'Please enter your minimum hourly rate'),
  weeklyAvailability: z.string().min(1, 'Please select your weekly availability'),
  unavailablePeriods: z.string().optional(),
  remoteLocation: z.string().min(1, 'Please enter your remote work location'),
  travelWillingness: z.string().min(1, 'Please select your travel willingness'),
  maxAssignmentDuration: z.string().min(1, 'Please select maximum assignment duration')
});

export const contractingSchema = z.object({
  contractingModality: z.string().min(1, 'Please select your preferred contracting modality'),
  internationalContracting: z.string().min(1, 'Please select your international contracting ability'),
  workRestrictions: z.string().optional()
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