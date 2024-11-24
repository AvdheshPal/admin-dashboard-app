import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Card from '../components/Card';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { setToken } from '../Redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

interface LoginFormInputs {
    email: string;
    password: string;
}

interface ForgotPasswordFormInputs {
    email: string;
}

interface AuthCardProps {
    setForgetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC = () => {
    const [isForgetPassword, setForgetPassword] = useState(false);

    return (
        <div>
            {isForgetPassword ? (
                <ForgotPasswordCard setForgetPassword={setForgetPassword} />
            ) : (
                <LoginCard setForgetPassword={setForgetPassword} />
            )}
        </div>
    );
};

export default Login;

const LoginCard: React.FC<AuthCardProps> = ({ setForgetPassword }) => {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading , setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
        setLoading(true)
        toast.promise(
            axios.post('https://x8ki-letl-twmt.n7.xano.io/api:IAuUhB5G/auth/login', { ...data }),
            {
              loading: 'Logging In...',
              success: (response) => {
                setLoading(false)
                reduxDispatch(setToken(response.data.authToken));
                navigate('/')
                return `Login Successfully`;
              },
              error: (error) => {
                setLoading(false)
                return `Error: ${error?.response?.data?.message || 'Failled to login'}`;
              },
            }
          );

    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-left text-gray-600">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "* Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "* Enter a valid email address",
                                },
                            })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors?.email && (
                            <p className="text-red-500 text-sm mt-1 text-left">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-left text-gray-600">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "* Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "* Password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "* Password must be alphanumeric and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                                    },
                                })}
                                className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-3 text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors?.password && (
                            <p className="text-red-500 text-sm mt-1 text-left">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full"
                        loading={loading}
                    >
                        Login
                    </Button>
                </form>

                {/* Forgot Password */}
                <div className="mt-4">
                    <p
                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                        onClick={() => setForgetPassword(true)}
                    >
                        Forgot Password?
                    </p>
                </div>
            </Card>
        </div>
    );
};


const ForgotPasswordCard: React.FC<AuthCardProps> = ({ setForgetPassword }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>();

    const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
        alert(`Password reset link sent to: ${data.email}`);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-left text-gray-600">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full"
                    >
                        Send Reset Link
                    </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-4">
                    <p
                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                        onClick={() => setForgetPassword(false)}
                    >
                        Back to Login
                    </p>
                </div>
            </Card>
        </div>
    );
};
