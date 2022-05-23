import { request } from 'utils/request';

const all = async (keyword) => {
  const { data } = await request().get('/specializations', {
    params: { keyword },
  });

  return data;
};

const find = async (uuid) => {
  const { data } = await request().get(`/specializations/${uuid}`);

  return data;
};

const store = (specialization) => {
  const { data } = request().post(`/specializations`, specialization);

  return data;
};

const update = (specialization) => {
  const { data } = request().put(
    `/specializations/${specialization.uuid}`,
    specialization,
  );

  return data;
};

const destroy = (uuid) => {
  const { data } = request().delete(`/specializations/${uuid}`);

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
};
