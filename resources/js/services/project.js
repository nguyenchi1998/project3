import {request} from '../utils/request';

const baseResourceUri = '/projects';

const all = async () => {
  const {data} = await request().get(`${baseResourceUri}`);

  return data;
};

const find = async (id) => {
  const {data} = await request().get(`${baseResourceUri}/${id}`);

  return data;
};

const store = async (resource) => {
  const {data} = await request().post(`${baseResourceUri}`, resource);

  return data;
};

const update = async (resource) => {
  const {data} = await request().put(
    `${baseResourceUri}/${resource.id}`,
    resource,
  );

  return data;
};

const destroy = async (id) => {
  const {data} = await request().delete(`${baseResourceUri}/${id}`);

  return data;
};

const showEmployeeFormAddMembers = async (id) => {
  const {data} = await request().get(`${baseResourceUri}/${id}/add-members`);

  return data;
};

const addMembers = async ({id, employeeIds}) => {
  const {data} = await request().post(
    `${baseResourceUri}/${id}/add-members`,
    {
      employeeIds,
    },
  );

  return data;
};

const removeMember = async ({id, memberId}) => {
  const {data} = await request().post(
    `${baseResourceUri}/${id}/remove-member`,
    {
      memberId,
    },
  );

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
  showEmployeeFormAddMembers,
  addMembers,
  removeMember,
};
