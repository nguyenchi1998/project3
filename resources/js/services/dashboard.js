import {request} from 'utils/request';

const fetchBudget = async () => {
  const {data} = await request().get('/budget');

  return data;
};
const fetchCustomer = async () => {
  const {data} = await request().get('/customers');

  return data;
};
const fetchTaskProgress = async () => {
  const {data} = await request().get('/task-progress');

  return data;
};
const fetchTotalProfit = async () => {
  const {data} = await request().get('/total-profit');

  return data;
};

const GET = {
  fetchBudget,
  fetchCustomer,
  fetchTaskProgress,
  fetchTotalProfit,
};

const POST = {};

const PUT = {};

const DELETE = {};

export default {
  ...GET,
  ...POST,
  ...PUT,
  ...DELETE,
};
