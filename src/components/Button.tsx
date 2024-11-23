import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}) => {

  const baseStyles = "font-medium focus:outline-none rounded-md inline-flex items-center justify-center";


  const variantStyles = {
    contained: "shadow bg-opacity-90 text-white",
    outlined: "border-2 bg-transparent",
    text: "bg-transparent",
  };


  const colorStyles = {
    primary: {
      contained: "bg-blue-600 hover:bg-blue-700",
      outlined: "border-blue-600 text-blue-600 hover:bg-blue-50",
      text: "text-blue-600 hover:bg-blue-50",
    },
    secondary: {
      contained: "bg-gray-600 hover:bg-gray-700",
      outlined: "border-gray-600 text-gray-600 hover:bg-gray-50",
      text: "text-gray-600 hover:bg-gray-50",
    },
    danger: {
      contained: "bg-red-600 hover:bg-red-700",
      outlined: "border-red-600 text-red-600 hover:bg-red-50",
      text: "text-red-600 hover:bg-red-50",
    },
  };


  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };


  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${colorStyles[color][variant]}
    ${sizeStyles[size]}
    ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  return (
    <button
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
