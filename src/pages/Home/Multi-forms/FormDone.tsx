import React from "react";
import Button from "../../../components/Button";

const FormDone: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Card container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m0 0a9 9 0 11-4.478-7.416M15 6l-6 6"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Form Submitted Successfully!</h1>

        {/* Message */}
        <p className="text-gray-600 mt-2">
          Thank you for submitting the form. We have received your information.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <Button
            onClick={() => console.log("Redirect to dashboard or form")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormDone;
