const initialState = {
  activeCategory: null,
  sortType: 'popular',
  sortOrder: 'desc',
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CATEGORY':
      return {
        ...state,
        activeCategory: action.payload,
      };
    case 'SET_SORT_OPTION':
      return {
        ...state,
        sortType: action.payload.sortType,
        sortOrder: action.payload.order,
      };
    default:
      return state;
  }
};

export default filters;
