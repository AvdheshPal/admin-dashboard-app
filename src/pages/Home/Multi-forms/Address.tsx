import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { setAddress } from "../../../Redux/features/formSlice";

interface AddressProps {
  onNext: (data: any) => void;
}

const Address: React.FC<AddressProps> = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { address } = useSelector((state: RootState) => state.form);
  const reduxDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (address) {
      reset(address)
    }
  }, [])

  const onSubmit = (data: any) => {
    reduxDispatch(setAddress(data))
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Address Line 1</label>
        <input
          type="text"
          {...register("addressLine1", {
            required: "Address Line 1 is required",
            validate: (value) => value.trim() !== "" || "Address Line 1 cannot be empty or just whitespace",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.addressLine1 && <p className="text-red-500">* {(errors.addressLine1 as any)?.message}</p>}
      </div>

      <div>
        <label>Address Line 2</label>
        <input
          type="text"
          {...register("addressLine2", {
            required: "Address Line 2 is required",
            validate: (value) => value.trim() !== "" || "Address Line 2 cannot be empty or just whitespace",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.addressLine2 && <p className="text-red-500">* {(errors.addressLine2 as any)?.message}</p>}
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          {...register("city", {
            required: "City is required",
            validate: (value) => value.trim() !== "" || "City cannot be empty or just whitespace",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.city && <p className="text-red-500">* {(errors.city as any)?.message}</p>}
      </div>

      <div>
        <label>State</label>
        <input
          type="text"
          {...register("state", {
            required: "State is required",
            validate: (value) => value.trim() !== "" || "State cannot be empty or just whitespace",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.state && <p className="text-red-500">* {(errors.state as any)?.message}</p>}
      </div>

      <div>
        <label>Pincode</label>
        <input
          type="number"
          {...register("pincode", {
            required: "Pincode is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Enter a valid Pincode",
            },
            minLength: {
              value: 6,
              message: "Pincode must be 6 digits",
            },
            validate: (value) => value.toString().trim() !== "" || "Pincode cannot be empty or just whitespace",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.pincode && <p className="text-red-500">* {(errors.pincode as any)?.message}</p>}
      </div>

      <div>
        <label>Country</label>
        <input
          type="text"
          {...register("country", {
            required: "Country is required",
            validate: (value) => value.trim() !== "" || "Country cannot be empty or just whitespace",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.country && <p className="text-red-500">* {(errors.country as any)?.message}</p>}
      </div>

      <Button type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Address;
