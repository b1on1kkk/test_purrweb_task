import { UsersGetAll } from 'apps/libs/contracts';

export const buildFilteringQuery = ({ to_filter }: UsersGetAll.Request) => {
  const usedFilter = {
    where: {
      AND: [],
    },
  };

  if (to_filter.qrole) {
    usedFilter.where.AND.push({ role: to_filter.qrole });
  }

  if (to_filter.qmail) {
    usedFilter.where.AND.push({ email: { contains: to_filter.qmail } });
  }

  return usedFilter;
};
