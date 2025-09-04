import { useState, useEffect, useCallback, useRef } from 'react';
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
  const saveTimeoutRef = useRef<number>();

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

  // Debounced save to localStorage to prevent lag on every keystroke
  const saveToStorage = useCallback((data: FormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  }, []);

  // Debounce localStorage writes to prevent lag
  const debouncedSave = useCallback((data: FormData) => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      saveToStorage(data);
    }, 300) as unknown as number; // Wait 300ms after last change
  }, [saveToStorage]);

  const updateStepData = useCallback((step: FormStep, data: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [step]: { ...prev[step], ...data }
      };
      debouncedSave(newData); // Use debounced save instead of immediate
      return newData;
    });
  }, [debouncedSave]);

  const updateNewsletterData = useCallback((data: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        newsletter: { ...prev.newsletter, ...data }
      };
      debouncedSave(newData); // Use debounced save
      return newData;
    });
  }, [debouncedSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Force immediate save (useful when navigating between steps)
  const forceSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveToStorage(formData);
  }, [formData, saveToStorage]);

  const nextStep = useCallback(() => {
    forceSave(); // Save immediately when navigating
    setCurrentStep(prev => Math.min(prev + 1, 9)); // 8 steps + confirmation
  }, [forceSave]);

  const prevStep = useCallback(() => {
    forceSave(); // Save immediately when navigating
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, [forceSave]);

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
    clearStorage,
    forceSave
  };
};