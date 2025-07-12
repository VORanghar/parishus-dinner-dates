
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, CreditCard, HelpCircle, LogOut, Edit, Star } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return 'U';
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
          <div className="max-w-2xl mx-auto">
            {/* Profile Header */}
            <Card className="p-6 mb-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.profileImage} alt={`${user?.firstName} ${user?.lastName}`} />
                  <AvatarFallback className="bg-gradient-to-r from-peach/20 to-sage/20 text-2xl font-semibold">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-muted border-0"
                      onClick={() => navigate('/settings')}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{user?.email}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {user?.diningStyle && (
                      <Badge className="bg-peach/20 text-peach border-peach/30">
                        {user.diningStyle}
                      </Badge>
                    )}
                    {user?.location && (
                      <Badge variant="outline">
                        {user.location}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-peach">8</div>
                <div className="text-sm text-muted-foreground">Events Attended</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-sage">3</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-peach">12</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-sage fill-current" />
                  <div className="text-2xl font-bold text-sage">4.9</div>
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </Card>
            </div>

            {/* Settings Menu */}
            <div className="space-y-3">
              <Card 
                className="p-4 hover:bg-card/80 transition-colors cursor-pointer"
                onClick={() => navigate('/subscription')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-peach/20 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-peach" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Subscription</h3>
                    <p className="text-muted-foreground text-sm">Manage your plan and billing</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Free Plan</Badge>
                </div>
              </Card>

              <Card className="p-4 hover:bg-card/80 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-sage" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Payment Methods</h3>
                    <p className="text-muted-foreground text-sm">Add or edit payment options</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 hover:bg-card/80 transition-colors cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Account Settings</h3>
                    <p className="text-muted-foreground text-sm">Privacy, notifications, and preferences</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:bg-card/80 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Help & Support</h3>
                    <p className="text-muted-foreground text-sm">Get help or contact support</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 hover:bg-card/80 transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-destructive">Log Out</h3>
                    <p className="text-muted-foreground text-sm">Sign out of your account</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Dietary Preferences */}
            {user?.dietaryPreferences && user.dietaryPreferences.length > 0 && (
              <Card className="p-6 mt-6">
                <h3 className="font-semibold mb-4">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {user.dietaryPreferences.map(preference => (
                    <Badge key={preference} variant="outline">
                      {preference}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default Profile;
