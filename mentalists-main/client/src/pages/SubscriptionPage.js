
import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Shield } from 'lucide-react';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Badge } from '../components/badge';

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Basic",
      description: "Perfect for small events",
      monthlyPrice: 999,
      yearlyPrice: 9999,
      icon: <Shield className="h-8 w-8" />,
      color: "from-muted to-muted/50",
      features: [
        "Up to 5 venue listings",
        "Basic vendor directory access",
        "Email support",
        "Standard listing visibility",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Premium",
      description: "Best for wedding planners",
      monthlyPrice: 2499,
      yearlyPrice: 24999,
      icon: <Star className="h-8 w-8" />,
      color: "from-primary to-destructive",
      features: [
        "Unlimited venue listings",
        "Priority vendor directory access",
        "24/7 phone & email support",
        "Featured listing placement",
        "Advanced analytics & insights",
        "Custom branding options",
        "Lead management tools",
        "Multi-location support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 4999,
      yearlyPrice: 49999,
      icon: <Crown className="h-8 w-8" />,
      color: "from-destructive to-primary",
      features: [
        "Everything in Premium",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solutions",
        "API access",
        "Advanced reporting",
        "Priority customer support",
        "Custom contract terms",
        "Training & onboarding"
      ],
      popular: false
    }
  ];

  const getPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: any) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-[#fdf6ee]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-destructive/20" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Unlock premium features and grow your venue business
            </p>

            {/* Billing Toggle */}
            <div className="glass rounded-2xl p-2 inline-flex mb-12">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setBillingCycle('monthly')}
                className={billingCycle === 'monthly' ? 'bg-primary' : ''}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                onClick={() => setBillingCycle('yearly')}
                className={`${billingCycle === 'yearly' ? 'bg-primary' : ''} relative`}
              >
                Yearly
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">
                  Save 20%
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative glass transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-6 py-2">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white mb-4`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      ₹{getPrice(plan).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per {billingCycle === 'monthly' ? 'month' : 'year'}
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {getSavings(plan)}% yearly
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                    size="lg"
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EazyVenue?</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage and grow your venue business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Instant Bookings</h3>
              <p className="text-muted-foreground">
                Get booked instantly with our automated booking system
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-destructive to-primary flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-muted-foreground">
                Safe and secure payment processing with instant settlements
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Premium Support</h3>
              <p className="text-muted-foreground">
                24/7 customer support to help you succeed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
