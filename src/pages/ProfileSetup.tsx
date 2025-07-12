
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    diningStyle: '',
    dietaryPreferences: [] as string[],
    location: '',
    jobTitle: '',
    profileImage: ''
  });
  
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const diningStyles = [
    'Adventurous Explorer', 'Foodie Enthusiast', 'Local Lover', 'Health Conscious',
    'Social Butterfly', 'Fine Dining Aficionado', 'Casual Comfort', 'Cultural Explorer'
  ];

  const dietaryOptions = [
    'No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free', 
    'Dairy-free', 'Keto', 'Paleo', 'Halal', 'Kosher'
  ];

  const steps = [
    {
      title: 'Dining Style',
      subtitle: 'How would you describe your dining personality?',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {diningStyles.map(style => (
              <Badge
                key={style}
                variant={profileData.diningStyle === style ? "default" : "outline"}
                className={`cursor-pointer p-3 text-center justify-center h-auto transition-colors ${
                  profileData.diningStyle === style
                    ? "bg-gradient-to-r from-peach to-sage text-dark-bg border-0"
                    : "hover:bg-muted"
                }`}
                onClick={() => setProfileData(prev => ({ ...prev, diningStyle: style }))}
              >
                {style}
              </Badge>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Dietary Preferences',
      subtitle: 'Any dietary restrictions or preferences?',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {dietaryOptions.map(option => (
              <Badge
                key={option}
                variant={profileData.dietaryPreferences.includes(option) ? "default" : "outline"}
                className={`cursor-pointer p-3 text-center justify-center h-auto transition-colors ${
                  profileData.dietaryPreferences.includes(option)
                    ? "bg-gradient-to-r from-peach to-sage text-dark-bg border-0"
                    : "hover:bg-muted"
                }`}
                onClick={() => {
                  setProfileData(prev => ({
                    ...prev,
                    dietaryPreferences: prev.dietaryPreferences.includes(option)
                      ? prev.dietaryPreferences.filter(p => p !== option)
                      : [...prev.dietaryPreferences, option]
                  }));
                }}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Location',
      subtitle: 'Where are you based?',
      content: (
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="San Francisco, CA"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
              className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
            />
          </div>
          <Button variant="outline" className="w-full bg-muted border-0">
            Use Current Location
          </Button>
        </div>
      )
    },
    {
      title: 'About You',
      subtitle: 'Tell us a bit about yourself',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job Title (Optional)</Label>
            <Input
              id="jobTitle"
              placeholder="e.g., Software Engineer"
              value={profileData.jobTitle}
              onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
              className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
            />
          </div>
          
          <div>
            <Label>Profile Photo (Optional)</Label>
            <div className="flex justify-center mt-2">
              <ImageUpload
                currentImage={profileData.profileImage}
                onImageChange={(imageUrl) => setProfileData(prev => ({ ...prev, profileImage: imageUrl }))}
                size="lg"
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await updateProfile(profileData);
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = async () => {
    await updateProfile(profileData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="bg-card rounded-3xl p-8 shadow-2xl animate-fade-in">
          {/* Progress */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentStep
                    ? 'bg-peach'
                    : index < currentStep
                    ? 'bg-sage'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center space-y-6 mb-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {currentStepData.title}
              </h2>
              <p className="text-muted-foreground">
                {currentStepData.subtitle}
              </p>
            </div>

            {currentStepData.content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip
            </Button>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold px-6"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
