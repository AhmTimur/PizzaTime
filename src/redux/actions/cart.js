export const addPizzaToCart = (payload) => ({
  type: 'ADD_PIZZA_CART',
  payload,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeItem = (id) => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
});

export const plusPizzaCount = (id) => ({
  type: 'PLUS_PIZZA_COUNT',
  payload: id,
});

export const minusPizzaCount = (id) => ({
  type: 'MINUS_PIZZA_COUNT',
  payload: id,
});
