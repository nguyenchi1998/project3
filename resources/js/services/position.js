import { request } from '../utils/request';

const baseResourceUri = '/positions';

const all = async (filter) => {
  const { data } = await request().get(`${baseResourceUri}`, {
    params: { ...filter },
  });

  return data;
};

const update = async ({ id, permissions }) => {
  const { data } = await request().put(`${baseResourceUri}/${id}`, {
    permissions,
  });

  return data;
};

export default {
  all,
  update,
};
