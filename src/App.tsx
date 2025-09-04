import FormWizard from '@/components/FormWizard';

function App() {
  return (
    <div className="min-h-screen bg-madiro-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-madiro-primary mb-4">
              Join the Madiro Talent Roster
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with global digital health opportunities. Join our community of engineers and specialists 
              working on humanitarian and NGO projects worldwide.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                5-7 minutes to complete
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your data is secure
              </span>
            </div>
          </div>
          
          {/* Form */}
          <FormWizard />
          
          {/* Hidden form for Netlify Forms detection - DO NOT REMOVE */}
          <form name="madiro-roster" {...({ netlify: "true", "netlify-honeypot": "bot-field" } as any)} hidden>
            <input type="text" name="fullName" />
            <input type="email" name="email" />
            <input type="text" name="phone" />
            <input type="text" name="country" />
            <input type="text" name="highestEducation" />
            <input type="text" name="fieldOfStudy" />
            <input type="text" name="yearsExperience" />
            <textarea name="contributionLevel"></textarea>
            <input type="text" name="organizationTypes" />
            <input type="text" name="lmicExperience" />
            <input type="text" name="expertiseAreas" />
            <input type="text" name="rolesHeld" />
            <input type="text" name="digitalHealthPlatforms" />
            <input type="text" name="languages" />
            <input type="text" name="certifications" />
            <input type="text" name="openSourcePlatforms" />
            <input type="text" name="openSourceContributions" />
            <input type="text" name="startupExperience" />
            <input type="text" name="problemSolvingApproach" />
            <input type="text" name="preferredHourlyRate" />
            <input type="text" name="minimumHourlyRate" />
            <input type="text" name="weeklyAvailability" />
            <textarea name="unavailablePeriods"></textarea>
            <input type="text" name="remoteLocation" />
            <input type="text" name="travelWillingness" />
            <input type="text" name="maxAssignmentDuration" />
            <input type="text" name="contractingModality" />
            <input type="text" name="internationalContracting" />
            <textarea name="workRestrictions"></textarea>
            <textarea name="motivation"></textarea>
            <textarea name="keyAchievements"></textarea>
            <textarea name="additionalNotes"></textarea>
            <input type="text" name="subscribeNewsletter" />
            <input type="text" name="dataProcessingConsent" />
            <input type="text" name="submissionTime" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;