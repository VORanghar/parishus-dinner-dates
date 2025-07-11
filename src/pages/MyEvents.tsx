
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Settings, MessageSquare } from 'lucide-react';

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('rsvpd');

  const rsvpdEvents = [
    {
      id: 1,
      name: 'Mystery Dinner Thursday',
      date: 'Dec 21, 2023',
      time: '7:00 PM',
      location: 'Downtown SF',
      attendees: 6,
      maxAttendees: 8,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Italian Night in North Beach',
      date: 'Dec 25, 2023',
      time: '6:30 PM',
      location: 'Tony\'s Little Star',
      attendees: 4,
      maxAttendees: 6,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
    }
  ];

  const createdEvents = [
    {
      id: 3,
      name: 'Sushi Exploration',
      date: 'Dec 28, 2023',
      time: '7:30 PM',
      location: 'Japantown',
      attendees: 3,
      maxAttendees: 8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop'
    }
  ];

  const EventCard = ({ event, isCreated = false }: { event: any, isCreated?: boolean }) => (
    <Card className="overflow-hidden hover:bg-card/80 transition-colors">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            variant={event.status === 'confirmed' ? 'default' : 'secondary'}
            className={event.status === 'confirmed' 
              ? 'bg-sage/20 text-sage border-sage/30' 
              : 'bg-peach/20 text-peach border-peach/30'
            }
          >
            {event.status === 'confirmed' ? 'Confirmed' : 'Active'}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            <span>{event.attendees}/{event.maxAttendees} people</span>
          </div>
        </div>

        <div className="flex space-x-2">
          {isCreated ? (
            <>
              <Button size="sm" variant="outline" className="flex-1 bg-muted border-0">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-muted border-0">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Guests
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" className="flex-1 bg-muted border-0">
                View Details
              </Button>
              <Button size="sm" variant="outline" className="bg-muted border-0">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );

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
            <h2 className="text-2xl font-bold text-foreground mb-2">My Events</h2>
            <p className="text-muted-foreground">
              Manage your dining events and RSVPs
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger 
                value="rsvpd"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-peach data-[state=active]:to-sage data-[state=active]:text-dark-bg"
              >
                RSVP'd Events ({rsvpdEvents.length})
              </TabsTrigger>
              <TabsTrigger 
                value="created"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-peach data-[state=active]:to-sage data-[state=active]:text-dark-bg"
              >
                Created Events ({createdEvents.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="rsvpd" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rsvpdEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="created" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdEvents.map(event => (
                  <EventCard key={event.id} event={event} isCreated />
                ))}
              </div>
              
              {createdEvents.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events created yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start hosting your own dining experiences
                  </p>
                  <Button className="bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold">
                    Create Your First Event
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default MyEvents;
