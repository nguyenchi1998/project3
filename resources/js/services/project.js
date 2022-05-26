import { request } from '../utils/request';

const baseResourceUri = '/projects';

const all = async ({ filter }) => {
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

const addMember = async ({ projectId, ...rest }) => {
  const { data } = await request().post(
    `${baseResourceUri}/${projectId}/members`,
    {
      ...rest,
    },
  );

  return data;
};

const removeMember = async ({ id, memberId }) => {
  const { data } = await request().post(
    `${baseResourceUri}/${id}/remove-member`,
    {
      memberId,
    },
  );

  return data;
};

const trackerIssuesStatistic = async (id) => {
  const { data } = await request().get(
    `${baseResourceUri}/${id}/tracker-issues-statistic`,
  );

  return data;
};

const priorityIssuesStatistic = async ({ projectId, ...rest }) => {
  const { data } = await request().get(
    `${baseResourceUri}/${projectId}/priority-issues-statistic`,
    {
      params: { ...rest },
    },
  );

  return data;
};

const getMembers = async ({ projectId, ...rest }) => {
  const { data } = await request().get(
    `${baseResourceUri}/${projectId}/members`,
    {
      params: { ...rest },
    },
  );

  return data;
};

const updateMember = async ({ projectId, memberId, ...rest }) => {
  const { data } = await request().put(
    `${baseResourceUri}/${projectId}/members/${memberId}`,
    {
      ...rest,
    },
  );

  return data;
};

const getIssues = async ({ projectId, ...filter }) => {
  const { data } = await request().get(
    `${baseResourceUri}/${projectId}/issues`,
    {
      params: { ...filter },
    },
  );

  return data;
};

const deleteMember = async ({ projectId, memberId }) => {
  const { data } = await request().delete(
    `${baseResourceUri}/${projectId}/members/${memberId}`,
  );

  return data;
};

export default {
  all,
  find,
  store,
  update,
  destroy,
  addMember,
  removeMember,
  trackerIssuesStatistic,
  priorityIssuesStatistic,
  getMembers,
  updateMember,
  getIssues,
  deleteMember,
};
