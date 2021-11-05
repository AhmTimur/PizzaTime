export const setSortOption = (sortType, order) => {
  return {
    type: 'SET_SORT_OPTION',
    payload: { sortType, order },
  };
};
export const setCategory = (payload) => ({
  type: 'SET_ACTIVE_CATEGORY',
  payload,
});
