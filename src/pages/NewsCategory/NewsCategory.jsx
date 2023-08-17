import React, { useState } from "react";
import NewsCategoryForm from "./partials/NewsCategoryForm";

import NewsCategoryList from "./partials/NewsCategoryList";

const NewsCategory = () => {
  const [visibility, setVisibility] = useState("false");
  const onFormSubmit = (formVisibility) => {
    setVisibility(formVisibility);
  };
  return (
    <>
      <div className="w-full py-5 px-10 border-y-2 border-slate-500 flex justify-between items-center">
        <h1 className="text-3xl font-serif font-light">News Category</h1>
        <button
          className="border border-slate-500 rounded-lg py-2 px-16 hover:px-20 hover:bg-slate-300 transition-all duration-300"
          onClick={() =>
            visibility === "false"
              ? setVisibility("true")
              : setVisibility("false")
          }
        >
          {visibility === "false" ? "Add New" : "Cancel"}
        </button>
      </div>
      <div className="overflow-hidden">
        <NewsCategoryForm visibility={visibility} onFormSubmit={onFormSubmit} />
      </div>
      <NewsCategoryList />
    </>
  );
};

export default NewsCategory;
