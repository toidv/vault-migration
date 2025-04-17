
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  steps, 
  currentStep, 
  className 
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300',
                  index < currentStep 
                    ? 'bg-krystal-success border-krystal-success' 
                    : index === currentStep 
                      ? 'border-krystal-primary bg-krystal-primary/20' 
                      : 'border-krystal-light bg-krystal-medium'
                )}
              >
                {index < currentStep ? (
                  <CheckIcon className="w-5 h-5 text-white" />
                ) : (
                  <span className={cn(
                    'text-sm font-medium',
                    index === currentStep ? 'text-krystal-primary' : 'text-krystal-light'
                  )}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span 
                className={cn(
                  'text-xs mt-2 font-medium',
                  index < currentStep 
                    ? 'text-krystal-success' 
                    : index === currentStep 
                      ? 'text-krystal-primary' 
                      : 'text-krystal-light'
                )}
              >
                {step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  'h-0.5 flex-1 mx-2',
                  index < currentStep 
                    ? 'bg-krystal-success' 
                    : 'bg-krystal-light'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
