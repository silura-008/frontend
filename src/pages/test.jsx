import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, TrendingUp, Shield } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Emotional Support",
      description: "Get 24/7 support and understanding from our AI-powered wellness assistant"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
      title: "Personalized Chat",
      description: "Have meaningful conversations tailored to your emotional needs"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      title: "Mood Tracking",
      description: "Track your emotional well-being over time with interactive charts"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Private & Secure",
      description: "Your conversations and data are completely private and secure"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Personal Mental Wellness Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience 24/7 emotional support, personalized coping strategies, and mood tracking
          to improve your mental well-being.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/register')}
            className="text-lg px-8 py-6"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6"
          >
            Login
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-gray-50 p-3 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">Create your account to get started with personalized support</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Track Your Mood</h3>
            <p className="text-gray-600">Log your daily emotions and track your progress over time</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Get Support</h3>
            <p className="text-gray-600">Chat with our AI assistant whenever you need emotional support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;