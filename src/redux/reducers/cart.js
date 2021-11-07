const initialState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const combinedId = {
        ...action.payload,
        id: `${action.payload.id}_${action.payload.activeType}_${action.payload.selectedSize}`,
      };
      const currentItems = !state.items[combinedId.id]
        ? [combinedId]
        : [...state.items[combinedId.id].items, combinedId];

      const newItems = {
        ...state.items,
        [combinedId.id]: {
          items: currentItems,
          totalPrice: getTotalPrice(currentItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'PLUS_PIZZA_COUNT': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case 'MINUS_PIZZA_COUNT': {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case 'REMOVE_CART_ITEM': {
      const newCartItems = { ...state.items };

      const currentTotalPrice = newCartItems[action.payload].totalPrice;
      const currentTotalCount = newCartItems[action.payload].items.length;
      delete newCartItems[action.payload];
      return {
        ...state,
        items: newCartItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }
    case 'CLEAR_CART': {
      return { totalPrice: 0, totalCount: 0, items: {} };
    }
    default:
      return state;
  }
};

export default cart;
