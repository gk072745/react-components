import { routes } from './base/apiRoutes';
import { deleteAPIResponse, getAPIResponse, postAPIResponse, putAPIResponse } from './base/api';
import queryString from 'query-string';

const handle401 = e => {
  if (e.response && e.response.status === 401) {
    localStorage.setItem('Authorization', '');
    window.location = window.origin;
  }

  return e;
};

export const createProject = async data => {
  return postAPIResponse(routes.projects, data).catch(e => {
    return handle401(e);
  });
};

export const getProjects = async (params = {}) => {
  const query = queryString.stringify(params);
  const url = query ? `${routes.projects}?${query}` : routes.projects;
  return getAPIResponse(url).catch(e => {
    return handle401(e);
  });
};

export const getProjectById = async id => {
  return getAPIResponse(`${routes.projects}/${id}`).catch(e => {
    return handle401(e);
  });
};

export const updateProject = async (id, data) => {
  return putAPIResponse(`${routes.projects}/${id}`, data).catch(e => {
    return handle401(e);
  });
};

export const deleteProject = async id => {
  return deleteAPIResponse(`${routes.projects}/${id}`).catch(e => {
    return handle401(e);
  });
};
