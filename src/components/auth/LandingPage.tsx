import React from 'react';
import { Shield, ArrowRight, CheckCircle, Cloud, Lock, Zap, Star, Users, Globe } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #000000 100%)'
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg animate-neon-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">SecureBackup</span>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Enterprise Grade</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('login')}
                className="font-medium transition-colors"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Star className="w-4 h-4 mr-2" style={{ color: 'var(--neon-orange)' }} />
                <span className="text-sm text-white font-medium">Trusted by 10,000+ professionals</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Secure Your Data with
                <span className="gradient-text block">
                  Enterprise Backup
                </span>
              </h1>
              
              <p className="text-xl mb-8 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Protect your valuable files with military-grade encryption, automated scheduling, 
                and lightning-fast restore capabilities. Your data security is our mission.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('signup')}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center space-x-8 mt-8 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--neon-emerald)' }} />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--neon-emerald)' }} />
                  <span>5GB free storage</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="card-glass p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 neon-border">
                  <img
                    src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="Secure backup dashboard"
                    className="rounded-xl shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 card-glass p-4 animate-pulse-slow neon-glow">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--neon-emerald)' }}></div>
                    <span className="text-sm text-white font-medium">Live Backup Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose SecureBackup?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Built for professionals who demand the highest level of data protection and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass card-hover p-8 text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg neon-glow">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">End-to-End Encryption</h3>
              <p className="leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Your files are encrypted before they leave your device. Only you have the keys to decrypt your data.
              </p>
            </div>

            <div className="card-glass card-hover p-8 text-center">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg neon-glow">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Advanced compression and delta sync technology ensures your backups complete quickly and efficiently.
              </p>
            </div>

            <div className="card-glass card-hover p-8 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg neon-glow" style={{
                background: 'linear-gradient(135deg, var(--neon-emerald), var(--neon-cyan))'
              }}>
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Multi-Cloud Storage</h3>
              <p className="leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Your data is replicated across multiple secure cloud providers for maximum redundancy and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50PB+</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Data Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-glass p-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to secure your data?
            </h2>
            <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Join thousands of professionals who trust SecureBackup with their most important files.
            </p>
            <button
              onClick={() => onNavigate('signup')}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-12 px-6 lg:px-8" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center neon-glow">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">SecureBackup</span>
              </div>
              <p className="max-w-md" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Enterprise-grade backup solution trusted by professionals worldwide. 
                Secure your data, secure your future.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                <li><a href="#" className="transition-colors hover:text-white">Features</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Pricing</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Security</a></li>
                <li><a href="#" className="transition-colors hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                <li><a href="#" className="transition-colors hover:text-white">About</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Privacy</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center" style={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.6)' 
          }}>
            <p>&copy; 2024 SecureBackup. All rights reserved. Built with ❤️ for data security.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}