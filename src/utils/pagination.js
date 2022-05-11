export const pagination = ({ count, data, page, limit }) => {
  let results = {
    totalRecords: count,
    data,
  };
  if (page !== "") {
    results = { currentPage: page, totalPage: Math.ceil(count / limit), limit, ...results };
  }

  return results;
};
