import React from "react";

interface Step {
  title: string;
  isVisited: boolean;
  isCompleted: boolean;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Stepper Row */}
      <div className="flex w-full justify-between items-center max-w-3xl">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = step.isCompleted;
          const isVisited = step.isVisited;

          return (
            <div key={index} className="flex flex-1 flex-col items-center relative">
              {/* Step Icon */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-medium relative z-10 ${
                  isActive
                    ? "bg-blue-500"
                    : isCompleted
                    ? "bg-green-500"
                    : isVisited
                    ? "bg-yellow-500"
                    : "bg-gray-300"
                }`}
              >
                {isCompleted ? "✓" : isVisited && !isCompleted ? "⚠️" : index + 1}
              </div>

              {/* Step Label */}
              <p
                className={`mt-2 text-sm ${
                  isActive || isCompleted
                    ? "text-gray-900"
                    : isVisited
                    ? "text-yellow-700"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 -right-1/2 h-1 w-full ${
                    steps[index + 1].isVisited ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
