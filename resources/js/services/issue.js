import { request } from '../utils/request';

const baseResourceUri = '/issues';

const all = async () => {
  const { data } = await request().get(`${baseResourceUri}`);

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

const toggleLinkRelativeIssue = async ({ id, relative_issue_id, action }) => {
  const { data } = await request().post(
    `${baseResourceUri}/${id}/toggle-link-relative-issue`,
    {
      relative_issue_id,
      action,
    },
  );

  return data;
};

const removeLinkSubIssue = async ({ id, subIssueId }) => {
  const { data } = await request().post(
    `${baseResourceUri}/${id}/remove-link-sub-issue`,
    {
      subIssueId,
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
  toggleLinkRelativeIssue,
  removeLinkSubIssue,
};
