
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Star, Zap, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      icon: Star,
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Perfect for getting started',
      features: [
        'Join Mystery Dinners',
        'Create 1 event per month',
        'Basic profile features',
        'Standard support'
      ],
      limitations: [
        'Limited to 1 event per month',
        'No priority reservations',
        'Basic matching algorithm'
      ],
      current: true
    },
    {
      name: 'Premium',
      icon: Zap,
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      description: 'For active food enthusiasts',
      features: [
        'Unlimited Mystery Dinners',
        'Create unlimited events',
        'Priority RSVP placement',
        'Advanced Crossed Paths matching',
        'Event analytics',
        'Premium support'
      ],
      popular: true
    },
    {
      name: 'Gourmet',
      icon: Crown,
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      description: 'Ultimate dining experience',
      features: [
        'Everything in Premium',
        'Exclusive chef-curated events',
        'VIP restaurant partnerships',
        'Personal dining concierge',
        'Early access to new features',
        'White-glove event planning'
      ]
    }
  ];

  const handleSubscribe = (planName: string) => {
    if (planName === 'Free') {
      toast({
        title: "Already on Free Plan",
        description: "You're currently using the free plan.",
      });
      return;
    }

    toast({
      title: "Subscription Started!",
      description: `Welcome to ${planName}! Your premium features are now active.`,
    });
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
              <h2 className="text-2xl font-bold text-foreground">Subscription Plans</h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-muted rounded-full p-1">
                <Button
                  variant={selectedPlan === 'monthly' ? "default" : "ghost"}
                  className={`rounded-full px-6 ${
                    selectedPlan === 'monthly'
                      ? "bg-gradient-to-r from-peach to-sage text-dark-bg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  Monthly
                </Button>
                <Button
                  variant={selectedPlan === 'yearly' ? "default" : "ghost"}
                  className={`rounded-full px-6 ${
                    selectedPlan === 'yearly'
                      ? "bg-gradient-to-r from-peach to-sage text-dark-bg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setSelectedPlan('yearly')}
                >
                  Yearly
                  <Badge variant="secondary" className="ml-2 bg-sage/20 text-sage border-0">
                    Save 17%
                  </Badge>
                </Button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const price = selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                const period = selectedPlan === 'monthly' ? 'month' : 'year';
                
                return (
                  <Card 
                    key={plan.name} 
                    className={`relative p-6 animate-fade-in ${
                      plan.popular 
                        ? 'border-peach/50 bg-gradient-to-b from-peach/5 to-sage/5' 
                        : plan.current
                        ? 'border-sage/50 bg-gradient-to-b from-sage/5 to-peach/5'
                        : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge 
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-peach to-sage text-dark-bg border-0"
                      >
                        Most Popular
                      </Badge>
                    )}
                    
                    {plan.current && (
                      <Badge 
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sage to-peach text-dark-bg border-0"
                      >
                        Current Plan
                      </Badge>
                    )}

                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        plan.name === 'Free' ? 'bg-muted' :
                        plan.name === 'Premium' ? 'bg-peach/20' : 'bg-sage/20'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          plan.name === 'Free' ? 'text-muted-foreground' :
                          plan.name === 'Premium' ? 'text-peach' : 'text-sage'
                        }`} />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                      
                      <div className="mb-4">
                        <span className="text-3xl font-bold">
                          ${price === 0 ? 'Free' : price}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground">/{period}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations?.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-3 opacity-60">
                          <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleSubscribe(plan.name)}
                      disabled={plan.current}
                      className={`w-full ${
                        plan.current
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : plan.popular
                          ? 'bg-gradient-to-r from-peach to-sage hover:from-peach/90 hover:to-sage/90 text-dark-bg font-semibold'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {plan.current ? 'Current Plan' : 'Get Started'}
                    </Button>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-center mb-6">Frequently Asked Questions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
                  <p className="text-muted-foreground text-sm">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h4 className="font-semibold mb-2">What happens if I cancel?</h4>
                  <p className="text-muted-foreground text-sm">
                    You'll keep your premium features until the end of your billing period, then revert to the free plan.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h4 className="font-semibold mb-2">Are there any hidden fees?</h4>
                  <p className="text-muted-foreground text-sm">
                    No hidden fees! The price you see is exactly what you'll pay. Cancel anytime.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                  <p className="text-muted-foreground text-sm">
                    We offer a 14-day money-back guarantee for all new subscriptions.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation className="md:hidden" />
    </div>
  );
};

export default Subscription;
