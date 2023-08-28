import React, { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { postApiData } from "../Services/apiFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../states/StateProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [{ authToken }, dispatch] = useStateValue();
  const form = useForm();
  const navigate = useNavigate();

  const loginHandler = (data) => {
    return postApiData("admin/login", data);
  };
  const { mutate } = useMutation(loginHandler, {
    onSuccess: (response) => {
      setLoggedUser(response.data.token);
      navigate("/");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
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

  // set user after login
  const setLoggedUser = (token) => {
    const authToken = token.split("|")[1];
    dispatch({ type: "setIsLoggedIn", item: true });
    dispatch({ type: "setAuthToken", item: authToken });
  };

  console.log(authToken);

  return (
    <div className="w-full my-20 flex flex-col justify-center items-center">
      {errorMessage && <p className="text-red-800">**{errorMessage}</p>}
      <form
        action="submit"
        className=" flex flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-3/4 my-4">
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
        <div className="w-3/4 my-4">
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
        <div className="w-full flex justify-between items-center">
          <button
            type="submit"
            className="border border-slate-500 rounded-lg py-2 px-20 hover:px-28 hover:bg-slate-300 transition-all duration-300 mx-2 my-4"
          >
            Add Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
