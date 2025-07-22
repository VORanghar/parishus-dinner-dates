-- Create events table to store event information
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL, -- Price in cents
  max_attendees INTEGER NOT NULL,
  current_attendees INTEGER DEFAULT 0,
  host TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payments table to store payment information
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_session_id TEXT,
  user_email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  billing_address JSONB NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, succeeded, failed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create rsvps table to store RSVP information linked to payments
CREATE TABLE public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Create policies for events (public read access)
CREATE POLICY "events_select_all" ON public.events
  FOR SELECT USING (true);

-- Create policies for payments (users can only see their own)
CREATE POLICY "payments_select_own" ON public.payments
  FOR SELECT USING (user_email = auth.email());

CREATE POLICY "payments_insert" ON public.payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "payments_update" ON public.payments
  FOR UPDATE USING (true);

-- Create policies for rsvps (users can see their own)
CREATE POLICY "rsvps_select_own" ON public.rsvps
  FOR SELECT USING (user_email = auth.email());

CREATE POLICY "rsvps_insert" ON public.rsvps
  FOR INSERT WITH CHECK (true);

-- Insert sample events data
INSERT INTO public.events (name, description, date, time, location, price, max_attendees, host, image_url, tags) VALUES
('Mystery Dinner Thursday', 'Join us for a curated mystery dining experience in downtown SF', 'Dec 21, 2023', '7:00 PM', 'Downtown SF', 4500, 8, 'ParishUs Team', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop', ARRAY['Mystery', 'Fine Dining']),
('Authentic Ramen Night', 'Discover the best ramen spots in Japantown with fellow noodle enthusiasts', 'Dec 22, 2023', '6:30 PM', 'Japantown', 3800, 6, 'Sarah M.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop', ARRAY['Asian', 'Casual']),
('Taco Tuesday Crawl', 'Hop between the best taco spots in the Mission District', 'Dec 26, 2023', '7:00 PM', 'Mission District', 3200, 10, 'Carlos R.', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop', ARRAY['Mexican', 'Casual']),
('Farm-to-Table Experience', 'Seasonal ingredients and sustainable dining at its finest', 'Dec 29, 2023', '6:00 PM', 'Napa Valley', 5200, 8, 'Emma L.', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop', ARRAY['Fine Dining', 'Vegetarian']);