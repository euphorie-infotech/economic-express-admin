import React from "react";

import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DevTool } from "@hookform/devtools";
import { postApiData } from "../../../Services/apiFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewsCategoryForm = ({ visibility, onFormSubmit }) => {
  const queryClient = useQueryClient();
  const form = useForm();
  const postNewsCategory = (data) => {
    return postApiData("newsCategory", data);
  };

  const { mutate } = useMutation(postNewsCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["news-category"]);
    },
  });

  const { register, control, handleSubmit, reset, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    mutate(data);
    reset();
    onFormSubmit("false");
  };

  return (
    <div
      className={`w-full py-5 px-10 flex flex-col justify-center border-b border-slate-500 ${
        visibility === "false" ? "hidden" : "visible"
      } transition duration-300 ease-in-out`}
    >
      <h1 className="text-3xl font-serif font-light">
        Create new News Category
      </h1>
      <form
        action="submit"
        className="my-5 flex flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faFontAwesome} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                id="name"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("name", {
                  required: "Category name is required",
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
              <FontAwesomeIcon icon={faFontAwesome} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="text"
                name="slug"
                placeholder="Category Slug"
                id="slug"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("slug", {
                  required: "Category slug is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.name ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.slug?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faFontAwesome} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="text"
                name="metaTitle"
                placeholder="Meta Title"
                id="metaTitle"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("metaTitle", {
                  required: "Meta title is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.name ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.metaTitle?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faFontAwesome} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="text"
                name="metaDescription"
                placeholder="Meta Description"
                id="metaDescription"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("metaDescription", {
                  required: "Meta description is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.name ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.metaDescription?.message}`}
          </p>
        </div>
        <div className="basis-1/3 w-3/4 my-4">
          <div className="flex w-full px-2">
            <div className="basis-1/6 border border-slate-600 text-center p-2 rounded-l-lg bg-slate-300">
              <FontAwesomeIcon icon={faFontAwesome} />
            </div>
            <div className="basis-5/6 border border-slate-600 rounded-r-lg overflow-clip w-full px-5">
              <input
                type="text"
                name="metaKeywords"
                placeholder="Meta Keywords"
                id="metaKeywords"
                className="w-full h-full placeholder:font-light focus-within:outline-none focus-visible:outline-none"
                {...register("metaKeywords", {
                  required: "Meta keyword is required",
                })}
              />
            </div>
          </div>
          <p
            className={`${
              errors.name ? "visible" : "hidden"
            } text-xs text-red-600 pl-2 mt-2`}
          >
            {`** ${errors.metaKeywords?.message}`}
          </p>
        </div>
        <div className="basis-1/3 px-2 flex items-center">
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
        <div className="w-full flex justify-between items-center">
          <div className="basis-1/3 px-2 flex items-center">
            <input
              type="radio"
              name="lang"
              checked
              id="bn"
              value="bn"
              {...register("lang")}
            />
            <label htmlFor="lang" className="ml-3 mr-10">
              বাংলা
            </label>
            <input
              type="radio"
              name="lang"
              id="en"
              value="en"
              {...register("lang")}
            />
            <label htmlFor="lang" className="ml-3 mr-10">
              English
            </label>
          </div>
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

export default NewsCategoryForm;
