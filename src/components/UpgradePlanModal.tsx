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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upgrade to unlock premium features and unlimited storage
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl transition-colors"
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
                      ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${plan.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {plan.description}
                      </p>
                      
                      <div className="mb-6">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {plan.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          {plan.period}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <div className="flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg py-2">
                          <HardDrive className="h-4 w-4" />
                          <span>{plan.storage}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg py-2">
                          <Users className="h-4 w-4" />
                          <span>{plan.devices}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg py-2">
                          <Clock className="h-4 w-4" />
                          <span>{plan.support}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
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
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
              Frequently Asked Questions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I change plans anytime?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is my data secure?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Absolutely. We use end-to-end encryption and your data is stored across multiple secure data centers.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What happens if I cancel?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Your data remains accessible for 30 days after cancellation, giving you time to download everything.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Do you offer refunds?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
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