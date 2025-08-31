import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-shift" style={{
        background: 'linear-gradient(-45deg, #000000, #1a1a2e, #16213e, #0f3460)',
        backgroundSize: '400% 400%'
      }}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', animationDelay: '4s' }}></div>
    </div>
  );
}