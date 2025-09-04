// Form data types based on PRD.md specifications

export interface PersonalInformation {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
}

export interface EducationExperience {
  highestEducation: string;
  fieldOfStudy: string;
  yearsExperience: string;
  contributionLevel: string;
}

export interface NGOExperience {
  organizationTypes: string[];
  lmicExperience: string;
}

export interface ProfessionalProfile {
  expertiseAreas: string[];
  rolesHeld: string[];
  digitalHealthPlatforms: string[];
  languages: string[];
  certifications?: string[];
}

export interface OpenSourceEntrepreneurship {
  openSourcePlatforms: string[];
  openSourceContributions: string;
  startupExperience: string;
  problemSolvingApproach: string[];
}

export interface AvailabilityEngagement {
  preferredHourlyRate: string;
  minimumHourlyRate: string;
  weeklyAvailability: string;
  unavailablePeriods?: string;
  remoteLocation: string;
  travelWillingness: string;
  maxAssignmentDuration: string;
}

export interface ContractingCompliance {
  contractingModality: string;
  internationalContracting: string;
  workRestrictions?: string;
}

export interface MotivationNotes {
  motivation: string;
  keyAchievements: string;
  additionalNotes?: string;
}

export interface NewsletterConsent {
  subscribeNewsletter: boolean;
  dataProcessingConsent: boolean;
}

export interface FormData {
  personal: PersonalInformation;
  education: EducationExperience;
  ngo: NGOExperience;
  professional: ProfessionalProfile;
  openSource: OpenSourceEntrepreneurship;
  availability: AvailabilityEngagement;
  contracting: ContractingCompliance;
  motivation: MotivationNotes;
  newsletter: NewsletterConsent;
}

export type FormStep = keyof Omit<FormData, 'newsletter'>;

export interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface FormOptions {
  countries: string[];
  educationLevels: string[];
  fieldsOfStudy: string[];
  experienceRanges: string[];
  contributionLevels: string[];
  organizationTypes: string[];
  lmicOptions: string[];
  expertiseAreas: string[];
  roleTypes: string[];
  digitalPlatforms: string[];
  languages: string[];
  certifications: string[];
  openSourcePlatforms: string[];
  openSourceContributionLevels: string[];
  startupOptions: string[];
  problemSolvingApproaches: string[];
  availabilityRanges: string[];
  travelOptions: string[];
  durationOptions: string[];
  contractingOptions: string[];
  legalOptions: string[];
}