
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import RSVPCheckout from '@/components/RSVPCheckout';
import EventDetailModal from '@/components/EventDetailModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Star, Plus } from 'lucide-react';

const Dashboard = () => {
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const mysteryDinner = {
    id: '1',
    name: 'Mystery Dinner Thursday',
    date: 'Dec 21, 2023',
    time: '7:00 PM',
    location: 'Downtown SF',
    description: 'Join us for an evening of culinary surprises at a secret location in downtown San Francisco. Our chef will prepare a multi-course tasting menu featuring seasonal ingredients and unexpected flavor combinations.',
    price: 45,
    seatsLeft: 3,
    totalSeats: 8,
    attendees: 5,
    maxAttendees: 8,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
    host: {
      name: 'Chef Marcus',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      rating: 4.8
    },
    guests: [
      { id: '1', name: 'Sarah C.', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop' },
      { id: '2', name: 'Mike R.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop' },
      { id: '3', name: 'Elena M.', image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop' }
    ],
    tags: ['Mystery', 'Multi-course', 'Seasonal']
  };

  const upcomingEvents = [
    {
      id: '2',
      name: 'Italian Night in North Beach',
      date: 'Dec 23, 2023',
      time: '6:30 PM',
      location: 'Tony\'s Little Star',
      description: 'Authentic Italian cuisine in the heart of North Beach. Experience traditional recipes passed down through generations.',
      price: 38,
      seatsLeft: 2,
      attendees: 4,
      maxAttendees: 6,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
      host: {
        name: 'Isabella Romano',
        rating: 4.9
      },
      tags: ['Italian', 'Traditional', 'Wine Pairing']
    },
    {
      id: '3',
      name: 'Sushi Exploration',
      date: 'Dec 28, 2023',
      time: '7:30 PM',
      location: 'Japantown',
      description: 'Discover the art of sushi making with our master chef. Learn about different fish varieties and proper sushi etiquette.',
      price: 52,
      seatsLeft: 5,
      attendees: 3,
      maxAttendees: 8,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop',
      host: {
        name: 'Chef Tanaka',
        rating: 5.0
      },
      tags: ['Sushi', 'Japanese', 'Educational']
    }
  ];

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleRSVP = (paymentData: any) => {
    console.log('RSVP confirmed with payment:', paymentData);
    setShowRSVPModal(false);
    // Handle successful RSVP
  };

  const handleEventRSVP = () => {
    setShowEventDetail(false);
    setShowRSVPModal(true);
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
            <p className="text-muted-foreground">
              Ready for your next dining adventure?
            </p>
          </div>

          {/* Mystery Dinner Card */}
          <Card className="mb-8 overflow-hidden cursor-pointer hover:bg-card/80 transition-colors" onClick={() => handleEventClick(mysteryDinner)}>
            <div className="bg-gradient-to-r from-peach/20 to-sage/20 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge className="bg-peach/20 text-peach border-peach/30 mb-2">
                    Mystery Dinner
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{mysteryDinner.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-peach">${mysteryDinner.price}</div>
                  <div className="text-sm text-muted-foreground">per person</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{mysteryDinner.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{mysteryDinner.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{mysteryDinner.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{mysteryDinner.seatsLeft} seats left</span>
                </div>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRSVPModal(true);
                }}
                className="w-full bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
                disabled={mysteryDinner.seatsLeft === 0}
              >
                {mysteryDinner.seatsLeft === 0 ? 'Sold Out' : 'RSVP Now'}
              </Button>
            </div>
          </Card>

          {/* Upcoming Events */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Upcoming Events</h3>
              <Button variant="outline" size="sm" className="bg-muted border-0">
                View All
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:bg-card/80 transition-colors cursor-pointer" onClick={() => handleEventClick(event)}>
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-sage/20 text-sage border-sage/30">
                        ${event.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{event.name}</h4>
                    
                    <div className="space-y-1 mb-4">
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
                        <span>{event.seatsLeft} seats left</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setShowRSVPModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
                    >
                      RSVP - ${event.price}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:bg-card/80 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-peach/20 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-peach" />
                </div>
                <div>
                  <h4 className="font-semibold">Create Your Own Event</h4>
                  <p className="text-muted-foreground text-sm">Host a dinner and meet new people</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:bg-card/80 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <h4 className="font-semibold">Crossed Paths</h4>
                  <p className="text-muted-foreground text-sm">Discover who you've crossed paths with</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          isOpen={showEventDetail}
          onClose={() => setShowEventDetail(false)}
          event={selectedEvent}
          onRSVP={handleEventRSVP}
        />
      )}

      {/* RSVP Modal */}
      <RSVPCheckout
        isOpen={showRSVPModal}
        onClose={() => setShowRSVPModal(false)}
        event={selectedEvent || mysteryDinner}
        onRSVP={handleRSVP}
      />
    </div>
  );
};

export default Dashboard;
