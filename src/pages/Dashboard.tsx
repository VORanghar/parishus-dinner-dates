
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 25,
    seconds: 30
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 min-h-screen bg-card border-r border-border p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-peach to-sage bg-clip-text text-transparent">
              ParishUs
            </h1>
          </div>
          <Navigation className="relative bg-transparent border-0 p-0" />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 pb-24 md:pb-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.firstName}!
            </h2>
            <p className="text-muted-foreground">
              Ready for your next dining adventure?
            </p>
          </div>

          {/* Mystery Dinner Card */}
          <Card className="bg-gradient-to-r from-peach/10 to-sage/10 border-peach/20 p-6 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-peach/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-peach" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Next Mystery Dinner</h3>
                  <Badge variant="secondary" className="bg-peach/20 text-peach border-0">
                    Thursday Special
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Thursday, Dec 21</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>7:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Downtown SF</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-4 my-6">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Min' },
                  { value: timeLeft.seconds, label: 'Sec' }
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="bg-card rounded-lg p-3 border border-border">
                      <div className="text-2xl font-bold text-peach">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="text-sage font-medium">3 seats left</span> • 8 people attending
                </div>
                <Button className="bg-peach hover:bg-peach/90 text-dark-bg font-semibold">
                  RSVP Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card 
              className="p-6 hover:bg-card/80 transition-colors cursor-pointer"
              onClick={() => navigate('/create-event')}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Create Your Own Event</h3>
                  <p className="text-muted-foreground text-sm">Host a dining experience</p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 hover:bg-card/80 transition-colors cursor-pointer"
              onClick={() => navigate('/crossed-paths')}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-peach/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-peach" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Crossed Paths</h3>
                  <p className="text-muted-foreground text-sm">3 new matches found</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-sage" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">You RSVP'd to "Italian Night"</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-peach/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-peach" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah joined your "Sushi Exploration"</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default Dashboard;
