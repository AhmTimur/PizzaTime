import axios from 'axios';

const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas =
  (category, sortType, sortOrder = 'desc') =>
  (dispatch) => {
    setLoaded(false);
    axios
      .get(
        `/pizzas?${
          category !== null ? `category=${category}` : ''
        }&_sort=${sortType}&_order=${sortOrder}`,
      )
      .then(({ data }) => {
        dispatch(setPizzas(data));
      });
  };

export const setPizzas = (items) => {
  console.log(items);
  return { type: 'SET_PIZZAS', payload: items };
};
