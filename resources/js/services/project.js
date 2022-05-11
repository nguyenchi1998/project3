import { request } from '../utils/request';

const baseResourceUri = '/projects';

const all = async (keyword) => {
  const { data } = await request().get(`${baseResourceUri}`, {
    params: { keyword },
  });

  return data;
};

const find = async (id) => {
  const { data } = await request().get(`${baseResourceUri}/${id}`);

  return data;
};

const store = (resource) => {
  const { data } = request().post(`${baseResourceUri}`, resource);

  return data;
};

const update = (resource) => {
  const { data } = request().put(`${baseResourceUri}/${resource.id}`, resource);

  return data;
};

const destroy = (id) => {
  const { data } = request().delete(`${baseResourceUri}/${id}`);

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
};
