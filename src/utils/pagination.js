export const pagination = ({ count, data, page, limit }) => {
  let meta = {
    totalRecords: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    limit,
  };
  console.log(data);
  if (page === 0) {
    return data;
  }

  return {
    meta,
    data,
  };
};
