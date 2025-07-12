
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Users, Star, X } from 'lucide-react';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    price: number;
    attendees: number;
    maxAttendees: number;
    image?: string;
    host?: {
      name: string;
      image?: string;
      rating?: number;
    };
    guests?: Array<{
      id: string;
      name: string;
      image?: string;
    }>;
    tags?: string[];
  };
  onRSVP?: () => void;
  isRSVPd?: boolean;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
  onRSVP,
  isRSVPd = false
}) => {
  const getInitials = (name: string) => 
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{event.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Image */}
          {event.image && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Event Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{event.attendees}/{event.maxAttendees} people</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="text-3xl font-bold text-peach mb-2">${event.price}</div>
            <div className="text-sm text-muted-foreground">per person</div>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <h3 className="font-semibold mb-2">About This Event</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Host Info */}
          {event.host && (
            <div>
              <h3 className="font-semibold mb-3">Host</h3>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={event.host.image} alt={event.host.name} />
                  <AvatarFallback className="bg-gradient-to-r from-peach/20 to-sage/20">
                    {getInitials(event.host.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.host.name}</p>
                  {event.host.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-sage fill-current" />
                      <span className="text-sm text-muted-foreground">{event.host.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Guest List */}
          {event.guests && event.guests.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">
                Attendees ({event.guests.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {event.guests.map(guest => (
                  <div key={guest.id} className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={guest.image} alt={guest.name} />
                      <AvatarFallback className="bg-gradient-to-r from-peach/20 to-sage/20 text-xs">
                        {getInitials(guest.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{guest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RSVP Button */}
          {onRSVP && (
            <div className="pt-4 border-t">
              <Button
                onClick={onRSVP}
                disabled={isRSVPd || event.attendees >= event.maxAttendees}
                className="w-full bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold"
              >
                {isRSVPd 
                  ? 'Already RSVP\'d' 
                  : event.attendees >= event.maxAttendees 
                    ? 'Event Full' 
                    : `RSVP - $${event.price}`
                }
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
