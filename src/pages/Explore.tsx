
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import RSVPCheckout from '@/components/RSVPCheckout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const filters = [
    'Italian', 'Asian', 'Mexican', 'Fine Dining', 'Casual', 'Vegetarian', 'This Week', 'Next Week'
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRSVP = (event: any) => {
    setSelectedEvent({
      id: event.id,
      name: event.name,
      price: event.price,
      date: event.date,
      time: event.time,
      location: event.location
    });
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "RSVP Confirmed!",
      description: "Your payment was successful. Check your email for confirmation.",
    });
    loadEvents(); // Refresh events to update attendee count
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const EventCard = ({ event }: { event: any }) => {
    const seatsLeft = event.max_attendees - event.current_attendees;
    const priceDisplay = (event.price / 100).toFixed(2);

    return (
      <Card className="overflow-hidden hover:bg-card/80 transition-colors animate-fade-in">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={event.image_url || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop'} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-peach/20 text-peach border-peach/30">
              {seatsLeft} seats left
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-dark-bg/80 text-white">
              ${priceDisplay}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg">{event.name}</h3>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
          
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
              <span>{event.current_attendees}/{event.max_attendees} people</span>
              <span className="ml-2">• Hosted by {event.host}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags?.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
            disabled={seatsLeft <= 0}
            onClick={() => handleRSVP(event)}
          >
            {seatsLeft <= 0 ? 'Full' : `RSVP - $${priceDisplay}`}
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Explore Events</h2>
            <p className="text-muted-foreground">
              Discover amazing dining experiences near you
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events, cuisines, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-peach"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {filters.map(filter => (
                <Badge
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  className={`cursor-pointer whitespace-nowrap transition-colors ${
                    selectedFilters.includes(filter)
                      ? "bg-gradient-to-r from-peach to-sage text-dark-bg border-0"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-peach mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading events...</p>
              </div>
            ) : events.length > 0 ? (
              events.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No events found.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="bg-muted border-0">
              Load More Events
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />

      {/* RSVP Checkout Modal */}
      <RSVPCheckout
        event={selectedEvent}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Explore;
