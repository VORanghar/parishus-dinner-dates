
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Coffee, MessageSquare, Heart, X, Star } from 'lucide-react';

interface CrossedPathsProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    id: string;
    name: string;
    image?: string;
    jobTitle?: string;
    diningStyle?: string;
    location?: string;
    compatibility: number;
    commonPlaces: string[];
    lastSeen: string;
    bio?: string;
    dietaryPreferences?: string[];
    favoriteRestaurants?: string[];
    rating?: number;
    eventsAttended?: number;
  };
  onInviteToDinner?: () => void;
  onSendMessage?: () => void;
}

const CrossedPathsProfileModal: React.FC<CrossedPathsProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onInviteToDinner,
  onSendMessage
}) => {
  const getInitials = (name: string) => 
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return 'text-sage';
    if (score >= 75) return 'text-peach';
    return 'text-muted-foreground';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Great Match';
    if (score >= 70) return 'Good Match';
    return 'Potential Match';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{profile.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-r from-peach/20 to-sage/20 text-2xl font-semibold">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
            {profile.jobTitle && (
              <p className="text-muted-foreground mb-2">{profile.jobTitle}</p>
            )}
            
            {/* Compatibility Score */}
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Badge 
                variant="outline" 
                className={`${getCompatibilityColor(profile.compatibility)} border-current text-lg px-3 py-1`}
              >
                {profile.compatibility}% match
              </Badge>
            </div>
            
            <p className={`text-sm font-medium ${getCompatibilityColor(profile.compatibility)}`}>
              {getCompatibilityLabel(profile.compatibility)}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {profile.rating && (
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-sage fill-current" />
                  <span className="font-bold text-sage">{profile.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            )}
            
            {profile.eventsAttended && (
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-bold text-peach mb-1">{profile.eventsAttended}</div>
                <div className="text-xs text-muted-foreground">Events</div>
              </div>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground text-sm">{profile.bio}</p>
            </div>
          )}

          {/* Dining Style & Location */}
          <div className="space-y-3">
            {profile.diningStyle && (
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-muted-foreground" />
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {profile.diningStyle}
                </Badge>
              </div>
            )}
            
            {profile.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{profile.location}</span>
              </div>
            )}
          </div>

          {/* Common Places */}
          <div>
            <h3 className="font-semibold mb-3">Places You Both Visited</h3>
            <div className="space-y-2">
              {profile.commonPlaces.slice(0, 5).map((place, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-peach" />
                  <span className="text-sm">{place}</span>
                </div>
              ))}
              {profile.commonPlaces.length > 5 && (
                <p className="text-xs text-muted-foreground mt-2">
                  +{profile.commonPlaces.length - 5} more places
                </p>
              )}
            </div>
          </div>

          {/* Last Seen */}
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last seen {profile.lastSeen}</span>
          </div>

          {/* Dietary Preferences */}
          {profile.dietaryPreferences && profile.dietaryPreferences.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {profile.dietaryPreferences.map(preference => (
                  <Badge key={preference} variant="outline" className="text-xs">
                    {preference}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Restaurants */}
          {profile.favoriteRestaurants && profile.favoriteRestaurants.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Favorite Restaurants</h3>
              <div className="space-y-1">
                {profile.favoriteRestaurants.slice(0, 3).map((restaurant, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Heart className="w-3 h-3 text-peach" />
                    <span className="text-sm">{restaurant}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            {onInviteToDinner && (
              <Button 
                onClick={onInviteToDinner}
                className="flex-1 bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
              >
                Invite to Dinner
              </Button>
            )}
            {onSendMessage && (
              <Button 
                onClick={onSendMessage}
                variant="outline" 
                className="bg-muted border-0"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrossedPathsProfileModal;
