
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import CrossedPathsProfileModal from '@/components/CrossedPathsProfileModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Coffee, MessageSquare } from 'lucide-react';

const CrossedPaths = () => {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const matches = [
    {
      id: 1,
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop',
      jobTitle: 'UX Designer',
      diningStyle: 'Foodie Enthusiast',
      location: 'San Francisco, CA',
      compatibility: 85,
      commonPlaces: ['Blue Bottle Coffee', 'Tartine Bakery', 'State Bird Provisions', 'Foreign Cinema', 'Mission Chinese Food'],
      lastSeen: '2 days ago',
      bio: 'I love exploring new restaurants and trying cuisines from around the world. Always up for a good conversation over great food!',
      dietaryPreferences: ['Vegetarian', 'Gluten-free'],
      favoriteRestaurants: ['State Bird Provisions', 'Greens Restaurant', 'Shizen'],
      rating: 4.8,
      eventsAttended: 12
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
      jobTitle: 'Software Engineer',
      diningStyle: 'Adventurous Explorer',
      location: 'San Francisco, CA',
      compatibility: 78,
      commonPlaces: ['Philz Coffee', 'Swan Oyster Depot', 'Mission Chinese Food'],
      lastSeen: '1 week ago',
      bio: 'Always looking for the next great meal and interesting people to share it with. Love trying hole-in-the-wall spots!',
      dietaryPreferences: ['Pescatarian'],
      favoriteRestaurants: ['Swan Oyster Depot', 'Tadich Grill', 'La Taquería'],
      rating: 4.9,
      eventsAttended: 8
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
      jobTitle: 'Marketing Manager',
      diningStyle: 'Local Lover',
      location: 'San Francisco, CA',
      compatibility: 92,
      commonPlaces: ['Ritual Coffee', 'Zuni Café', 'Flour + Water'],
      lastSeen: '3 days ago',
      bio: 'SF native who knows all the best local spots. I enjoy both fine dining and casual neighborhood gems.',
      dietaryPreferences: ['Dairy-free'],
      favoriteRestaurants: ['Zuni Café', 'Flour + Water', 'Tartine Bakery'],
      rating: 4.7,
      eventsAttended: 15
    }
  ];

  const handleProfileClick = (match: any) => {
    setSelectedProfile(match);
    setShowProfileModal(true);
  };

  const handleInviteToDinner = () => {
    console.log('Inviting to dinner:', selectedProfile?.name);
    setShowProfileModal(false);
    // Handle invite logic
  };

  const handleSendMessage = () => {
    console.log('Sending message to:', selectedProfile?.name);
    setShowProfileModal(false);
    // Handle messaging logic
  };

  const MatchCard = ({ match }: { match: any }) => {
    const getInitials = (name: string) => 
      name.split(' ').map(n => n[0]).join('').toUpperCase();

    const getCompatibilityColor = (score: number) => {
      if (score >= 85) return 'text-sage';
      if (score >= 75) return 'text-peach';
      return 'text-muted-foreground';
    };

    return (
      <Card className="p-6 hover:bg-card/80 transition-colors animate-fade-in cursor-pointer" onClick={() => handleProfileClick(match)}>
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={match.image} alt={match.name} />
            <AvatarFallback className="bg-gradient-to-r from-peach/20 to-sage/20 text-foreground">
              {getInitials(match.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg">{match.name}</h3>
              <Badge 
                variant="outline" 
                className={`${getCompatibilityColor(match.compatibility)} border-current`}
              >
                {match.compatibility}% match
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{match.jobTitle}</p>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              {match.diningStyle}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>You both visited:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {match.commonPlaces.slice(0, 2).map((place: string) => (
              <Badge key={place} variant="outline" className="text-xs">
                <Coffee className="w-3 h-3 mr-1" />
                {place}
              </Badge>
            ))}
            {match.commonPlaces.length > 2 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{match.commonPlaces.length - 2} more
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last seen {match.lastSeen}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              handleInviteToDinner();
            }}
            className="flex-1 bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
          >
            Invite to Dinner
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation();
              handleSendMessage();
            }}
            className="bg-muted border-0"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  };

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
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Crossed Paths</h2>
            <p className="text-muted-foreground">
              People who've visited the same places as you
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-peach">12</div>
              <div className="text-sm text-muted-foreground">New Matches</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-sage">45</div>
              <div className="text-sm text-muted-foreground">Total Matches</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-peach">8</div>
              <div className="text-sm text-muted-foreground">Connections Made</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-sage">23</div>
              <div className="text-sm text-muted-foreground">Shared Places</div>
            </Card>
          </div>

          {/* Matches Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          {/* Privacy Note */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-peach/5 to-sage/5 border-peach/20">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-peach mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm">
                  We only show general areas and never reveal exact locations. 
                  Your privacy is protected while discovering meaningful connections.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />

      {/* Profile Modal */}
      {selectedProfile && (
        <CrossedPathsProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          profile={selectedProfile}
          onInviteToDinner={handleInviteToDinner}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default CrossedPaths;
