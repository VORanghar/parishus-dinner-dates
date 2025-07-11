
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, MapPin } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-16 pb-24">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-peach to-sage bg-clip-text text-transparent">
                ParishUs
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Connect through shared dining experiences. Create memories, one meal at a time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 mx-auto bg-peach/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-peach" />
                </div>
                <h3 className="text-xl font-semibold">Mystery Dinners</h3>
                <p className="text-muted-foreground">
                  Join our weekly Thursday mystery dinners and meet new people
                </p>
              </div>

              <div className="text-center space-y-4 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 mx-auto bg-sage/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-semibold">Create Events</h3>
                <p className="text-muted-foreground">
                  Host your own dining experiences and bring people together
                </p>
              </div>

              <div className="text-center space-y-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto bg-peach/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-peach" />
                </div>
                <h3 className="text-xl font-semibold">Crossed Paths</h3>
                <p className="text-muted-foreground">
                  Connect with people who've visited the same places as you
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Button
                onClick={() => navigate('/onboarding')}
                size="lg"
                className="bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let's Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-peach/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sage/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
