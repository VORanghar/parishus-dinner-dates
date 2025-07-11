
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Upload, Users, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxGuests: 8,
    tags: [] as string[],
    inviteEmails: [] as string[]
  });
  const [newEmail, setNewEmail] = useState('');

  const diningStyles = [
    'Fine Dining', 'Casual', 'Street Food', 'Vegetarian', 'Vegan', 
    'Italian', 'Asian', 'Mexican', 'Mediterranean', 'Fusion'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleTag = (tag: string) => {
    setEventData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const addEmail = () => {
    if (newEmail && !eventData.inviteEmails.includes(newEmail)) {
      setEventData(prev => ({
        ...prev,
        inviteEmails: [...prev.inviteEmails, newEmail]
      }));
      setNewEmail('');
    }
  };

  const removeEmail = (email: string) => {
    setEventData(prev => ({
      ...prev,
      inviteEmails: prev.inviteEmails.filter(e => e !== email)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event Created!",
      description: "Your dining event has been published successfully.",
    });
    navigate('/my-events');
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
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-bold text-foreground">Create Event</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Italian Night in North Beach"
                    value={eventData.name}
                    onChange={handleInputChange}
                    className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell people what makes this dining experience special..."
                    value={eventData.description}
                    onChange={handleInputChange}
                    className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                        className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={eventData.time}
                      onChange={handleInputChange}
                      className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Restaurant name or address"
                      value={eventData.location}
                      onChange={handleInputChange}
                      className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxGuests">Maximum Guests</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="maxGuests"
                      name="maxGuests"
                      type="number"
                      min="2"
                      max="20"
                      value={eventData.maxGuests}
                      onChange={handleInputChange}
                      className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tags & Style</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Help people find your event by adding relevant tags
              </p>
              
              <div className="flex flex-wrap gap-2">
                {diningStyles.map(tag => (
                  <Badge
                    key={tag}
                    variant={eventData.tags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      eventData.tags.includes(tag)
                        ? "bg-gradient-to-r from-peach to-sage text-dark-bg border-0"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Invites */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Invite People</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Invite specific people via email (optional)
              </p>
              
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="friend@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
                />
                <Button
                  type="button"
                  onClick={addEmail}
                  variant="outline"
                  className="bg-muted border-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {eventData.inviteEmails.length > 0 && (
                <div className="space-y-2">
                  {eventData.inviteEmails.map(email => (
                    <div key={email} className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                      <span className="text-sm">{email}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEmail(email)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Cover Image */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cover Image</h3>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Upload a cover image for your event</p>
                <Button variant="outline" className="bg-muted border-0">
                  Choose File
                </Button>
              </div>
            </Card>

            {/* Submit */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1 bg-muted border-0"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
              >
                Save & Publish
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default CreateEvent;
