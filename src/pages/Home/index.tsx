import React, { useState } from "react";
import Stepper from "../../components/Stepper";
import BasicDetails from "./Multi-forms/BasicDetails";
import Address from "./Multi-forms/Address";
import FileUpload from "./Multi-forms/FileUpload";
import FormDone from "./Multi-forms/FormDone";
import Button from "../../components/Button";

interface Step {
    title: string;
    isVisited: boolean;
    isCompleted: boolean;
}

const Home: React.FC = () => {
    const [steps, setSteps] = useState<Step[]>([
        { title: "Basic Details", isVisited: false, isCompleted: false },
        { title: "Address", isVisited: false, isCompleted: false },
        { title: "File Upload", isVisited: false, isCompleted: false },
    ]);
    const [activeStep, setActiveStep] = useState(0);

    const handleComplete = () => {
        setSteps((prevSteps) =>
            prevSteps.map((step, index) => {
                if (index === activeStep) {
                    return { ...step, isVisited: true, isCompleted: true };
                }
                return step;
            })
        );
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        setSteps((prevSteps) =>
            prevSteps.map((step, index) => {
                if (index === activeStep) {
                    return { ...step, isVisited: true };
                }
                if (index === activeStep + 1) {
                    return { ...step, isVisited: true };
                }
                return step;
            })
        );
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const allStepsCompleted = steps.every((step) => step.isCompleted);

    const renderStepContent = () => {
        if (allStepsCompleted) {
            return <FormDone />;
        }

        switch (activeStep) {
            case 0:
                return <BasicDetails onNext={handleComplete} />;
            case 1:
                return <Address onNext={handleComplete} />;
            case 2:
                return <FileUpload onNext={handleComplete} />;
            default:
                return <FormDone />;
        }
    };


    return (
        <div className="w-full flex flex-col items-center p-6">
            <Stepper steps={steps} activeStep={activeStep} />
            <div className="mt-8 w-full max-w-3xl">
                {/* Step Content */}
                <div className={!allStepsCompleted ? "border rounded-lg p-4 bg-gray-50" : ""}>{renderStepContent()}</div>

                {/* Navigation Buttons */}
                {!allStepsCompleted && (
                    <div className="mt-6 flex justify-between">
                        {/* Back Button */}
                        <Button
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            variant="outlined"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                            </svg>
                            Back
                        </Button>

                        {/* Next Button */}
                        <Button
                            onClick={handleNext}
                            disabled={activeStep === steps.length - 1}
                        >
                            Next
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 ml-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Home;
