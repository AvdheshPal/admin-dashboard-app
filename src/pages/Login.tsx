import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Card from '../components/Card';
import Button from '../components/Button';

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
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        alert(`Logged in with Email: ${data.email}, and Password: ${data.password}`);
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
                            {...register("email", { required: "* Email is required" })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors?.email && (
                            <p className="text-red-500 text-sm mt-1 text-left">{errors?.email?.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-left text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "* Password is required" })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors?.password && (
                            <p className="text-red-500 text-sm mt-1 text-left">{errors?.password?.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full"
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
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                                errors.email ? "border-red-500" : "border-gray-300"
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
