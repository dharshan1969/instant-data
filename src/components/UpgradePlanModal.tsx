import React from 'react';
import { 
  X, 
  Check, 
  Star, 
  Shield, 
  Zap, 
  Crown, 
  Users,
  HardDrive,
  Clock,
  Sparkles
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  storage: string;
  devices: string;
  support: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradePlanModal({ isOpen, onClose }: UpgradePlanModalProps) {
  const { addNotification } = useNotifications();

  const plans: Plan[] = [
    {
      id: 'plus',
      name: 'Plus',
      price: '$9.99',
      period: 'per month',
      description: 'Perfect for individuals and small teams',
      storage: '100 GB',
      devices: '3 devices',
      support: 'Email support',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      features: [
        '100 GB secure storage',
        'Automated backup scheduling',
        'Advanced encryption',
        'Version history (30 days)',
        'Email support',
        'Mobile apps'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$19.99',
      period: 'per month',
      description: 'Advanced features for growing businesses',
      popular: true,
      storage: '1 TB',
      devices: '10 devices',
      support: 'Priority support',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      features: [
        '1 TB secure storage',
        'Team collaboration',
        'Advanced analytics',
        'Unlimited version history',
        'Priority support',
        'API access',
        'Custom integrations'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$14.99',
      period: 'per month',
      description: 'Great for professionals and small businesses',
      storage: '500 GB',
      devices: '5 devices',
      support: 'Chat support',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
      features: [
        '500 GB secure storage',
        'Team sharing',
        'Advanced scheduling',
        'Version history (90 days)',
        'Chat support',
        'Mobile & desktop apps'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      price: '$39.99',
      period: 'per month',
      description: 'Enterprise-grade solution for large organizations',
      storage: 'Unlimited',
      devices: 'Unlimited',
      support: '24/7 phone support',
      icon: Crown,
      color: 'from-amber-500 to-amber-600',
      features: [
        'Unlimited secure storage',
        'Advanced team management',
        'Custom compliance',
        'Unlimited version history',
        '24/7 phone support',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    addNotification({
      type: 'success',
      message: `${plan.name} plan selected! Redirecting to payment...`,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="modal-glass rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="p-8 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Choose Your Plan
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Upgrade to unlock premium features and unlimited storage
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    plan.popular 
                      ? 'shadow-lg' 
                      : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: plan.popular ? 'var(--neon-purple)' : 'var(--card-border)',
                    boxShadow: plan.popular ? '0 10px 25px rgba(139, 92, 246, 0.25)' : undefined
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="gradient-secondary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: plan.color }}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {plan.name}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                        {plan.description}
                      </p>
                      
                      <div className="mb-6">
                        <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {plan.price}
                        </span>
                        <span className="ml-1" style={{ color: 'var(--text-muted)' }}>
                          {plan.period}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                        <div className="flex items-center justify-center space-x-2 rounded-lg py-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                          <HardDrive className="h-4 w-4" />
                          <span>{plan.storage}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 rounded-lg py-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                          <Users className="h-4 w-4" />
                          <span>{plan.devices}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 rounded-lg py-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                          <Clock className="h-4 w-4" />
                          <span>{plan.support}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                            <Check className="h-3 w-3" style={{ color: 'var(--neon-emerald)' }} />
                          </div>
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'gradient-secondary text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                          : 'btn-secondary'
                      }`}
                    >
                      {plan.id === 'plus' ? 'Try for Free' : 'Upgrade Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center" style={{ color: 'var(--text-primary)' }}>
              <Sparkles className="h-5 w-5 mr-2" style={{ color: 'var(--neon-purple)' }} />
              Frequently Asked Questions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Can I change plans anytime?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Is my data secure?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Absolutely. We use end-to-end encryption and your data is stored across multiple secure data centers.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    What happens if I cancel?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Your data remains accessible for 30 days after cancellation, giving you time to download everything.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Do you offer refunds?
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}