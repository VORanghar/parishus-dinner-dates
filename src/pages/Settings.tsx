
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Bell, Lock, CreditCard, Globe, Shield, Trash2 } from 'lucide-react';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    jobTitle: user?.jobTitle || '',
    location: user?.location || '',
    diningStyle: user?.diningStyle || '',
    dietaryPreferences: user?.dietaryPreferences || [],
    profileImage: user?.profileImage || ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    eventReminders: true,
    crossedPaths: true,
    newEvents: false,
    marketing: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    locationSharing: true,
    showInCrossedPaths: true
  });

  const dietaryOptions = [
    'No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free', 
    'Dairy-free', 'Keto', 'Paleo', 'Halal', 'Kosher'
  ];

  const handleProfileUpdate = async () => {
    await updateProfile(profileData);
    // Show success toast or feedback
  };

  const handleImageChange = (imageUrl: string) => {
    setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
  };

  const toggleDietaryPreference = (preference: string) => {
    setProfileData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
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
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </div>

            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            {/* Profile Settings */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="flex justify-center">
                  <ImageUpload
                    currentImage={profileData.profileImage}
                    onImageChange={handleImageChange}
                    size="lg"
                  />
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-muted border-0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-muted border-0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-muted border-0"
                  />
                </div>

                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={profileData.jobTitle}
                    onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="e.g., Software Engineer"
                    className="bg-muted border-0"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="San Francisco, CA"
                    className="bg-muted border-0"
                  />
                </div>

                {/* Dietary Preferences */}
                <div>
                  <Label>Dietary Preferences</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {dietaryOptions.map(option => (
                      <Badge
                        key={option}
                        variant={profileData.dietaryPreferences.includes(option) ? "default" : "outline"}
                        className={`cursor-pointer p-2 text-center justify-center transition-colors ${
                          profileData.dietaryPreferences.includes(option)
                            ? "bg-gradient-to-r from-peach to-sage text-dark-bg border-0"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => toggleDietaryPreference(option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleProfileUpdate}
                  className="bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
                >
                  Save Profile Changes
                </Button>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {key === 'eventReminders' && 'Get reminded about upcoming events'}
                        {key === 'crossedPaths' && 'Notifications when you cross paths with others'}
                        {key === 'newEvents' && 'Be notified of new events in your area'}
                        {key === 'marketing' && 'Receive promotional emails and updates'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Privacy</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Location Sharing</p>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your general location
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.locationSharing}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, locationSharing: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show in Crossed Paths</p>
                    <p className="text-sm text-muted-foreground">
                      Appear in other users' crossed paths recommendations
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showInCrossedPaths}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, showInCrossedPaths: checked }))
                    }
                  />
                </div>
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-muted border-0">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start bg-muted border-0">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Methods
                </Button>
                
                <Button variant="outline" className="w-full justify-start bg-muted border-0">
                  <Globe className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                
                <Separator />
                
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default Settings;
