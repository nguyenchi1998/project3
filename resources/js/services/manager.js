import {request} from 'utils/request';

const all = async () => {
  const {data} = await request().get('/managers');

  return data;
};

const find = async (id) => {
  const {data} = await request().get(`/managers/${id}`);

  return data;
};

const store = async (manager) => {
  const {data} = await request().post(`/managers`, manager);

  return data;
};

const update = async (manager) => {
  const {data} = await request().put(`/managers/${manager.uuid}`, manager);

  return data;
};

const destroy = async (uuid) => {
  const {data} = await request().post(`/managers/${uuid}`);

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
};
