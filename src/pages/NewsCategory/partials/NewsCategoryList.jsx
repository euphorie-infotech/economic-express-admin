import React from "react";
import { getApiData, putApiData } from "../../../Services/apiFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

const NewsCategoryList = () => {
  const queryClient = useQueryClient();
  const getCategoryList = () => {
    return getApiData("newsCategory");
  };

  const updateCategory = (data) => {
    return putApiData("newsCategory", data.id, data);
  };

  const { mutate } = useMutation(updateCategory, {
    onSuccess: () => queryClient.invalidateQueries(["news-category"]),
  });

  const updateStatus = (category) => {
    const status = category.status === "active" ? "inactive" : "active";
    const updatedData = { ...category, status };
    mutate(updatedData);
  };

  const { isLoading, isError, error, data } = useQuery(
    ["news-category"],
    getCategoryList
  );

  if (isLoading) {
    return "Loading data... please wait";
  }
  if (isError) {
    return error.message;
  }

  return (
    <div className="px-10 py-5">
      <table className="w-full rounded-lg overflow-clip text-center">
        <tbody>
          <tr>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              No
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              Category Name
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              Category Slug
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              Meta Title
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              Meta Description
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              Meta Keywords
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse">
              Status
            </th>
            <th className="py-3 bg-stone-200 border border-white border-collapse"></th>
          </tr>
          {data.map((category, index) => (
            <tr key={`category-${index}`}>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {index + 1}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {category.name}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {category.slug}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {category.metaTitle}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {category.metaDescription}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {category.metaKeywords}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                {category.status}
              </td>
              <td
                className={`${
                  category.status === "inactive" ? "bg-red-400" : "bg-stone-200"
                } py-3 border border-white border-collapse`}
              >
                <button className="mx-2" onClick={() => updateStatus(category)}>
                  <FontAwesomeIcon
                    icon={
                      category.status === "active"
                        ? faCircleXmark
                        : faCircleCheck
                    }
                    className={`${
                      category.status === "active"
                        ? "text-orange-400"
                        : "text-green-600"
                    }`}
                  />
                </button>
                <button className="mx-2">
                  <FontAwesomeIcon icon={faTrashCan} className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsCategoryList;
