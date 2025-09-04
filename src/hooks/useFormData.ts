import { useState, useEffect, useCallback } from 'react';
import { FormData, FormStep } from '@/types/form';

const STORAGE_KEY = 'madiro-roster-form-data';

const initialFormData: FormData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    country: ''
  },
  education: {
    highestEducation: '',
    fieldOfStudy: '',
    yearsExperience: '',
    contributionLevel: ''
  },
  ngo: {
    organizationTypes: [],
    lmicExperience: ''
  },
  professional: {
    expertiseAreas: [],
    rolesHeld: [],
    digitalHealthPlatforms: [],
    languages: [],
    certifications: []
  },
  openSource: {
    openSourcePlatforms: [],
    openSourceContributions: '',
    startupExperience: '',
    problemSolvingApproach: []
  },
  availability: {
    preferredHourlyRate: '',
    minimumHourlyRate: '',
    weeklyAvailability: '',
    unavailablePeriods: '',
    remoteLocation: '',
    travelWillingness: '',
    maxAssignmentDuration: ''
  },
  contracting: {
    contractingModality: '',
    internationalContracting: '',
    workRestrictions: ''
  },
  motivation: {
    motivation: '',
    keyAchievements: '',
    additionalNotes: ''
  },
  newsletter: {
    subscribeNewsletter: false,
    dataProcessingConsent: false
  }
};

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever formData changes
  const saveToStorage = useCallback((data: FormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  }, []);

  const updateStepData = useCallback((step: FormStep, data: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [step]: { ...prev[step], ...data }
      };
      saveToStorage(newData);
      return newData;
    });
  }, [saveToStorage]);

  const updateNewsletterData = useCallback((data: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        newsletter: { ...prev.newsletter, ...data }
      };
      saveToStorage(newData);
      return newData;
    });
  }, [saveToStorage]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 9)); // 8 steps + confirmation
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.min(Math.max(step, 1), 9));
  }, []);

  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    clearStorage();
  }, [clearStorage]);

  return {
    formData,
    currentStep,
    isLoading,
    setIsLoading,
    updateStepData,
    updateNewsletterData,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    clearStorage
  };
};