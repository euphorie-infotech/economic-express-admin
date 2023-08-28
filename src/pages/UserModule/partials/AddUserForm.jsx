import React, { useState } from "react";

import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DevTool } from "@hookform/devtools";
import { postApiData } from "../../../Services/apiFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStateValue } from "../../../states/StateProvider";

const AddUserForm = () => {
  const [{ authToken }] = useStateValue();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm();
  const postNewsCategory = (data) => {
    return postApiData("admin/registration", data, authToken);
  };

  const { mutate } = useMutation(postNewsCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const { register, control, handleSubmit, reset, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);

    mutate(data);
    reset();
    // onFormSubmit("false");
  };

  // password visibility
  const passwordVisibilityHandler = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div
      className={`w-full py-5 px-10 flex flex-col justify-center border-b border-slate-500  transition duration-300 ease-in-out`}
    >
      <h1 className="text-3xl font-serif font-light">Create new User</h1>
      <form
        action="submit"
        className="my-5 flex flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.name ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.name?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="email"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.email ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.email?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                id="phone"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.phone ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.phone?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon
                icon={!isPasswordVisible ? faEye : faEyeSlash}
                onClick={() => passwordVisibilityHandler()}
              />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                id="password"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.name ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.password?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon
                icon={!isPasswordVisible ? faEye : faEyeSlash}
                onClick={() => passwordVisibilityHandler()}
              />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("confirmPassword", {
                  required: "Please retype password",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.confirmPassword ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.confirmPassword?.message}`}
          </p>
        </div>
        <div className="basis-1/3 px-2 flex items-center">
          <label htmlFor="" className="mr-7">
            Select Role:
          </label>
          <input
            type="radio"
            name="role"
            id="admin"
            checked
            value="admin"
            {...register("role")}
          />
          <label htmlFor="admin" className="ml-3 mr-5">
            Admin
          </label>
          <input
            type="radio"
            name="role"
            id="publisher"
            value="publisher"
            {...register("role")}
          />
          <label htmlFor="publisher" className="ml-3 mr-5">
            Publisher
          </label>
        </div>
        <div className="basis-1/3 px-2 flex items-center">
          <label htmlFor="" className="mr-7">
            Status:
          </label>
          <input
            type="radio"
            name="status"
            id="active"
            checked
            value="active"
            {...register("status")}
          />
          <label htmlFor="active" className="ml-3 mr-10">
            Active
          </label>
          <input
            type="radio"
            name="status"
            id="inactive"
            value="inactive"
            {...register("status")}
          />
          <label htmlFor="active" className="ml-3 mr-10">
            Inactive
          </label>
        </div>
        {/* <div className="basis-1/2 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="w-full px-2 flex items-center">
              <label htmlFor="image" className="mr-7">
                Select Image
              </label>
              <Controller
                control={control}
                name={"image"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <input
                      type="file"
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files[0])}
                      id="image"
                    />
                  );
                }}
              />
            </div>
          </div>
        </div> */}
        <div className="w-full flex justify-between items-center">
          <button
            type="submit"
            className="border border-slate-500 rounded-lg py-2 px-20 hover:px-28 hover:bg-slate-300 transition-all duration-300 mx-2 my-4"
          >
            Add Now
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AddUserForm;
