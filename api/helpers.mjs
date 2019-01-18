const ACCEPT_RANGES = 'accept-ranges';
const CONTENT_RANGE = 'content-range';

export const computePagination = (response) => {
  const paginations = {};
  for (const range of (response.headers[ACCEPT_RANGES] || '').split(',')) {
    const regex = new RegExp(`${range} (\\d*)-(\\d*)/(\\d*)`);
    const [, ...d] = regex.exec(response.headers[CONTENT_RANGE]) || [];
    const [offset, max, total] = d.map(n => parseInt(n, 10));

    paginations[range] = {
      offset,
      total,
      limit: max - offset + 1,
    };
  }
  return paginations;
};
