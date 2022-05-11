import { request } from 'utils/request';

const all = async () => {
  const { data } = await request().get('/students');

  return data;
};

const find = async (id) => {
  const { data } = await request().get(`/students/${id}`);

  return data;
};

const store = (student) => {
  const { data } = request().post(`/students`, student);

  return data;
};

const update = (student) => {
  const { data } = request().post(`/students/${student.id}`, student);

  return data;
};

const destroy = (student) => {
  const { data } = request().post(`/students/${student.id}`, student);

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
};
