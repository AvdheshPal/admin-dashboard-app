import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "../../../Redux/features/formSlice";
import { RootState } from "../../../Redux/Store";
import { resetStepper } from "../../../Redux/features/stepperSlice";
import { SUBMIT_FORM } from "../../../Config/Service";

const FormDone: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ err: boolean; message: string | null }>({
    err: false,
    message: null,
  });
  const { basicDetails, address, files } = useSelector(
    (state: RootState) => state.form
  );
  const reduxDispatch = useDispatch();

  const submitTheForm = async () => {
    try {
      setLoading(true);
      setError({ err: false, message: null });

      const formData = new FormData();
      formData.append("name", basicDetails?.name || "");
      formData.append("email", basicDetails?.email || "");
      formData.append("phone", basicDetails?.phone || "");
      formData.append("address_1", address?.address_1 || "");
      formData.append("address_2", address?.address_2 || "");
      formData.append("city", address?.city || "");
      formData.append("state", address?.state || "");
      formData.append("pincode", address?.pincode || "");
      formData.append("country", address?.country || "");

      files.forEach((file: File, index: number) => {
        formData.append(`files[${index}]`, file);
      });

      await SUBMIT_FORM(formData);

      setError({ err: false, message: null });
    } catch (err: any) {
      setError({ err: true, message: err.message || "Something went wrong!" });
      console.error("Error submitting the form:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    submitTheForm();
  }, []);

  const handleResetForm = () => {
    reduxDispatch(resetForm());
    reduxDispatch(resetStepper());
  };

  const handleRetry = () => {
    submitTheForm();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      {/* Card container */}
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full text-center transition-all transform hover:scale-105 duration-300 ease-in-out">
        {/* Loading State */}
        {loading ? (
          <div>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-lg font-medium text-gray-700">Submitting your form...</p>
          </div>
        ) : error.err ? (
          // Error state
          <div>
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-gray-800 mt-4 mb-3">
              Oops, Something Went Wrong
            </h1>
            <p className="text-red-600 mb-6">{error.message}</p>

            <div className="flex space-x-4">
              <Button
                onClick={handleRetry}
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-200"
              >
                Retry
              </Button>
              <Button
                onClick={handleResetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-200"
              >
                Refill the Form
              </Button>
            </div>
          </div>
        ) : (
          // Success state
          <div>
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
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
            <h1 className="text-3xl font-semibold text-gray-800 mt-4 mb-3">
              Form Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for submitting the form. We have received your information and will process it shortly.
            </p>
            <Button
              onClick={handleResetForm}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Fill another form
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDone;
