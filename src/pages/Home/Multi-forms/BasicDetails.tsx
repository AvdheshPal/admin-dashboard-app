import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";

interface BasicDetailsProps {
    onNext: (data: any) => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ onNext }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Name</label>
                <input
                    type="text"
                    {...register("name", { 
                        required: "* Name is required",
                        validate : (value) => value.trim() !== "" || "* Name cannot be empty or just whitespace"
                     })}
                    className="w-full p-2 border rounded-md"
                />
                {errors.name && <p className="text-red-500">{(errors.name as any)?.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "* Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "* Enter a valid email address",
                        },
                    })}
                    className="w-full p-2 border rounded-md"
                />
                {errors.email && <p className="text-red-500">{(errors.email as any)?.message}</p>}
            </div>

            <div>
                <label>Phone</label>
                <input
                    type="number"
                    {...register("phone", {
                        required: "* Phone is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "* Enter a valid 10-digit phone number",
                        },
                        minLength: {
                            value: 10,
                            message: "* Phone number must be 10 digits",
                        },
                        maxLength: {
                            value: 10,
                            message: "* Phone number must be 10 digits",
                        },
                    })}
                    className="w-full p-2 border rounded-md"
                />

                {errors.phone && <p className="text-red-500">{(errors.phone as any)?.message}</p>}
            </div>

            <Button type="submit">
                Submit
            </Button>
        </form>
    );
};

export default BasicDetails;
