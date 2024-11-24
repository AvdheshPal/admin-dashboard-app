import React, { useState } from "react";
import Stepper from "../components/Stepper";

const Home: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="mt-8 w-full max-w-3xl">
        {/* Step Content */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold">
            Form Content for Step {activeStep + 1}: {steps[activeStep]}
          </h3>
          <p className="mt-2 text-sm">Your form fields go here.</p>
        </div>
        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
