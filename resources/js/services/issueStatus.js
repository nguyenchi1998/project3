import { request } from '../utils/request';

const baseResourceUri = '/issue-states';

const all = async (filter) => {
  const { data } = await request().get(`${baseResourceUri}`, {
    params: { ...filter },
  });

  return data;
};

const find = async (id) => {
  const { data } = await request().get(`${baseResourceUri}/${id}`);

  return data;
};

const store = async (resource) => {
  const { data } = await request().post(`${baseResourceUri}`, resource);

  return data;
};

const update = async (resource) => {
  const { data } = await request().put(
    `${baseResourceUri}/${resource.id}`,
    resource,
  );

  return data;
};

const destroy = async (id) => {
  const { data } = await request().delete(`${baseResourceUri}/${id}`);

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
};
