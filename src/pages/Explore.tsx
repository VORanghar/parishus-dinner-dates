
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    'Italian', 'Asian', 'Mexican', 'Fine Dining', 'Casual', 'Vegetarian', 'This Week', 'Next Week'
  ];

  const events = [
    {
      id: 1,
      name: 'Mystery Dinner Thursday',
      description: 'Join us for a curated mystery dining experience in downtown SF',
      date: 'Dec 21, 2023',
      time: '7:00 PM',
      location: 'Downtown SF',
      attendees: 6,
      maxAttendees: 8,
      tags: ['Mystery', 'Fine Dining'],
      host: 'ParishUs Team',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Authentic Ramen Night',
      description: 'Discover the best ramen spots in Japantown with fellow noodle enthusiasts',
      date: 'Dec 22, 2023',
      time: '6:30 PM',
      location: 'Japantown',
      attendees: 4,
      maxAttendees: 6,
      tags: ['Asian', 'Casual'],
      host: 'Sarah M.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Taco Tuesday Crawl',
      description: 'Hop between the best taco spots in the Mission District',
      date: 'Dec 26, 2023',
      time: '7:00 PM',
      location: 'Mission District',
      attendees: 8,
      maxAttendees: 10,
      tags: ['Mexican', 'Casual'],
      host: 'Carlos R.',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Farm-to-Table Experience',
      description: 'Seasonal ingredients and sustainable dining at its finest',
      date: 'Dec 29, 2023',
      time: '6:00 PM',
      location: 'Napa Valley',
      attendees: 2,
      maxAttendees: 8,
      tags: ['Fine Dining', 'Vegetarian'],
      host: 'Emma L.',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop'
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="overflow-hidden hover:bg-card/80 transition-colors animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-peach/20 text-peach border-peach/30">
            {event.maxAttendees - event.attendees} seats left
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
            <span>{event.attendees}/{event.maxAttendees} people</span>
            <span className="ml-2">• Hosted by {event.host}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
          disabled={event.attendees >= event.maxAttendees}
        >
          {event.attendees >= event.maxAttendees ? 'Full' : 'RSVP'}
        </Button>
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
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
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
    </div>
  );
};

export default Explore;
