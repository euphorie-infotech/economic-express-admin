import axios from "axios";


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const liveUrl = import.meta.env.VITE_REACT_APP_API_LIVE_URL;



// function to get data from api using axios
export const getApiData = (url, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(liveUrl + "/" + url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
};

// function to post data to api using axios
export const postApiData = async (url,data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(liveUrl + "/" + url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      .then((response) => {

        resolve(response.data);
        return response;
      })
      .catch(reject);
  });
};

// function to update data using axios
export const putApiData = (url, taskId, data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(liveUrl + "/" + url + "/update/" + taskId, { ...data }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      .then((response) => {
        resolve(response.data);
        // console.log(response);
      })
      .catch(reject);
  });
};

// function to delete data using axios
export const deleteApiData = (url, taskId, token) => {
  axios({
    url: liveUrl + "/" + url + "/" + taskId,
    method: "DELETE", 
      headers: {
        Authorization: `Bearer ${token}`
      } 
  });
};
