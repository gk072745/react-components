import { appAxios } from './appAxios';

export const getAPIResponse = async (url, config) => {
  return new Promise((resolve, reject) => {
    appAxios
      .get(url, config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const postAPIResponse = async (url, obj, config) => {
  return new Promise((resolve, reject) => {
    appAxios
      .post(url, obj, config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const putAPIResponse = async (url, obj, config) => {
  return new Promise((resolve, reject) => {
    appAxios
      .put(url, obj)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

// axios expects obj to be { data: your-obj-here }
export const deleteAPIResponse = async (url, obj) => {
  const data = { data: obj };
  return new Promise((resolve, reject) => {
    appAxios
      .delete(url, data)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
