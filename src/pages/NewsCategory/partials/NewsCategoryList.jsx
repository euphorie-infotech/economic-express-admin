import React from "react";
import {
  deleteApiData,
  getApiData,
  putApiData,
} from "../../../Services/apiFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useStateValue } from "../../../states/StateProvider";

const NewsCategoryList = () => {
  const [{ authToken }] = useStateValue();
  const queryClient = useQueryClient();

  // deleting an entry from the server
  const deleteCategory = (categoryId) => {
    return deleteApiData("admin/category", categoryId, authToken);
  };
  const { mutate: deleteMutate } = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries(["news-category"]),
  });

  // updating the active/inactive status
  const updateCategory = (data) => {
    return putApiData("admin/category", data.id, data, authToken);
  };

  const { mutate: updateMutate } = useMutation(updateCategory, {
    onSuccess: () => queryClient.invalidateQueries(["news-category"]),
  });

  // fetching news category data from server
  const getCategoryList = () => {
    return getApiData("admin/category", authToken);
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

  const updateStatus = (category) => {
    const status = category.status === "active" ? "inactive" : "active";
    const updatedData = { ...category, status };
    updateMutate(updatedData);
  };

  const categoryList = data.data;

  if (categoryList.length === 0) {
    return;
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
          {categoryList?.map((category, index) => (
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
                <ul className="flex justify-center">
                  {category.metaKeywords.map((keyword, index) => (
                    <li
                      className="px-[2px] rounded-md m-1 border border-slate-300"
                      key={`slug-${index}`}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
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
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-red-600"
                    onClick={() => deleteMutate(category.id)}
                  />
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
