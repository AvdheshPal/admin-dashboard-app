import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../../components/Stepper";
import BasicDetails from "./Multi-forms/BasicDetails";
import Address from "./Multi-forms/Address";
import FileUpload from "./Multi-forms/FileUpload";
import FormDone from "./Multi-forms/FormDone";
import Button from "../../components/Button";
import { RootState, AppDispatch } from "../../Redux/Store";
import { nextStep, prevStep, completeStep } from "../../Redux/features/stepperSlice";
// import { resetForm } from "../../Redux/features/formSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeStep, steps } = useSelector((state: RootState) => state.stepper);
  const [render] = useState<number>(2)

  const handleComplete = () => {
    dispatch(completeStep());
    if (activeStep < steps.length - 1) {
      dispatch(nextStep());
    }
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  const allStepsCompleted = steps.every((step) => step.isCompleted);


  // const handleResetForm = () => {
  //   setRender(p => p + 1)
  //   dispatch(resetForm())
  //   dispatch(resetStepper())
  // }

  return (
    <div className="w-full flex flex-col items-center p-6">
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="mt-8 w-full max-w-3xl">
        {/* Step Content */}
        <div key={render} 
        className={!allStepsCompleted ? "border rounded-lg p-4 bg-gray-50" : ""}
        >
          {allStepsCompleted ? <FormDone /> :
            activeStep === 0
              ? <BasicDetails onNext={handleComplete} />
              : activeStep === 1
                ? <Address onNext={handleComplete} />
                : activeStep === 2
                  ? <FileUpload onNext={handleComplete} />
                  : <FormDone />
          }
        </div>

        {/* Navigation Buttons */}
        {!allStepsCompleted && (
          <div className="mt-6 flex justify-between">
            {/* Back Button */}
            <Button onClick={handleBack} disabled={activeStep === 0} variant="outlined">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Back
            </Button>

            {/* <Button color="danger" variant="outlined" onClick={handleResetForm} >Reset Form</Button> */}

            {/* Next Button */}
            <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 ml-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
