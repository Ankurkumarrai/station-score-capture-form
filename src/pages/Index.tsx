
import React from 'react';
import ScoreCardForm from '../components/ScoreCardForm';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Digital Score Card
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md">
              Clean Train Station Inspection Form
            </p>
          </div>
          <ScoreCardForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
