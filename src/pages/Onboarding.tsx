
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Users, Calendar, MapPin } from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      icon: Users,
      title: "Mystery Dinners",
      subtitle: "Every Thursday",
      description: "Join our curated mystery dinners every Thursday night. Meet interesting people while enjoying carefully selected restaurants and cuisines.",
      details: [
        "Pre-selected restaurants and menus",
        "Small groups of 4-8 people",
        "Conversation starters provided",
        "All dietary preferences accommodated"
      ]
    },
    {
      icon: Calendar,
      title: "Create Your Own Events",
      subtitle: "Be the Host",
      description: "Design and host your own dining experiences. Choose the restaurant, set the vibe, and invite like-minded food lovers.",
      details: [
        "Full control over event details",
        "Invite system for guest management",
        "Integration with restaurant booking",
        "Post-event feedback and connections"
      ]
    },
    {
      icon: MapPin,
      title: "Crossed Paths",
      subtitle: "Serendipitous Connections",
      description: "Discover people who've visited the same restaurants and cafes as you. Sometimes the best connections happen by chance.",
      details: [
        "Location-based matching",
        "Privacy-first approach",
        "Optional connection requests",
        "Shared dining history insights"
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/auth');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-3xl p-8 shadow-2xl animate-fade-in">
          {/* Progress indicators */}
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
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-peach/20 to-sage/20 rounded-full flex items-center justify-center animate-scale-in">
              <Icon className="w-12 h-12 text-peach" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {currentStepData.title}
              </h2>
              <p className="text-peach font-medium">
                {currentStepData.subtitle}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {currentStepData.description}
            </p>

            <div className="space-y-3 text-left">
              {currentStepData.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
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
              onClick={handleNext}
              className="bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold px-6 py-2 rounded-full"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
