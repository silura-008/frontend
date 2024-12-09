import React from 'react'
import Card from './Card'
import { Heart, MessageCircle, TrendingUp, Shield } from 'lucide-react';

const features = [
  {
    icon: <Heart className="h-6 w-6 text-green-500" />,
    title: "Emotional Support",
    description: "Get 24/7 support and understanding from our AI-powered wellness assistant"
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-green-500" />,
    title: "Personalized Chat",
    description: "Have meaningful conversations tailored to your emotional needs"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    title: "Mood Tracking",
    description: "Track your emotional well-being over time with interactive charts"
  },
  {
    icon: <Shield className="h-6 w-6 text-green-500" />,
    title: "Private & Secure",
    description: "Your conversations and data are completely private and secure"
  }
];

function Features() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-[#609966]'>
      {features.map((feature, index) => (
        <Card 
          key={index} 
          icon={feature.icon} 
          title={feature.title} 
          description={feature.description} 
        />
      ))}
    </div>
  )
}

export default Features
