import { request } from '../utils/request';

const fetchProduct = async () => {
  const { data } = await request().get('/products');

  return data;
};

const GET = {
  fetchProduct,
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
