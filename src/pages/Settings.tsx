
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, CreditCard, User, ArrowLeft } from 'lucide-react';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    location: user?.location || '',
    diningStyle: user?.diningStyle || '',
    dietaryPreferences: user?.dietaryPreferences || [],
  });

  const [notifications, setNotifications] = useState({
    eventReminders: true,
    crossedPaths: true,
    newMatches: false,
    marketing: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (imageUrl: string) => {
    if (user && updateProfile) {
      updateProfile({ ...user, profileImage: imageUrl });
    }
  };

  const handleSave = () => {
    if (user && updateProfile) {
      updateProfile({ ...user, ...formData });
    }
    navigate('/profile');
  };

  const diningStyles = [
    'Adventurous Explorer',
    'Foodie Enthusiast', 
    'Local Lover',
    'Social Butterfly',
    'Casual Diner'
  ];

  const dietaryOptions = [
    'Vegetarian',
    'Vegan', 
    'Gluten-free',
    'Dairy-free',
    'Nut-free',
    'Halal',
    'Kosher'
  ];

  const toggleDietaryPreference = (preference: string) => {
    setFormData(prev => ({
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
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/profile')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Settings</h2>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>

            {/* Profile Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <User className="w-5 h-5 text-peach" />
                <h3 className="text-lg font-semibold">Profile Information</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <ImageUpload onImageChange={handleImageChange} currentImage={user?.profileImage} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <Label>Dining Style</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {diningStyles.map(style => (
                      <Badge
                        key={style}
                        variant={formData.diningStyle === style ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.diningStyle === style 
                            ? 'bg-peach/20 text-peach border-peach/30' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleInputChange('diningStyle', style)}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Dietary Preferences</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dietaryOptions.map(option => (
                      <Badge
                        key={option}
                        variant={formData.dietaryPreferences.includes(option) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.dietaryPreferences.includes(option)
                            ? 'bg-sage/20 text-sage border-sage/30'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => toggleDietaryPreference(option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <Bell className="w-5 h-5 text-sage" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Event Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming events</p>
                  </div>
                  <Switch
                    checked={notifications.eventReminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, eventReminders: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Crossed Paths</p>
                    <p className="text-sm text-muted-foreground">New people you've crossed paths with</p>
                  </div>
                  <Switch
                    checked={notifications.crossedPaths}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, crossedPaths: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Matches</p>
                    <p className="text-sm text-muted-foreground">When someone wants to connect</p>
                  </div>
                  <Switch
                    checked={notifications.newMatches}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, newMatches: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing</p>
                    <p className="text-sm text-muted-foreground">Updates about new features</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Privacy & Security</h3>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-muted border-0">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-muted border-0">
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start bg-muted border-0 text-destructive">
                  Delete Account
                </Button>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex space-x-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/profile')}
                className="bg-muted border-0"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default Settings;
