import { PostsGetAll } from 'apps/libs/contracts';

export const buildFilteringQuery = ({ to_filter }: PostsGetAll.Request) => {
  const usedFilter = {
    where: {
      AND: [],
    },
  };

  if (to_filter.qtitle) {
    usedFilter.where.AND.push({ title: { contains: to_filter.qtitle } });
  }

  return usedFilter;
};
