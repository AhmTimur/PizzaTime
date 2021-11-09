import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, LoadingBlock } from '../components';
import { addPizzaToCart } from '../redux/actions/cart';
import { setCategory, setSortOption } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryItems = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'minPrice', order: 'asc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

const Home = React.memo(function Home() {
  const dispatch = useDispatch();
  const { isLoaded, pizzasArray } = useSelector(({ pizzas }) => pizzas);
  const { activeCategory, sortType, sortOrder } = useSelector(({ filters }) => filters);
  const cartItems = useSelector(({ cart }) => cart.items);

  console.log(cartItems);

  React.useEffect(() => {
    dispatch(fetchPizzas(activeCategory, sortType, sortOrder));
  }, [activeCategory, sortType, sortOrder, dispatch]);

  const onSelectCategory = React.useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch],
  );
  const onSelectSortType = React.useCallback(
    (type, order) => {
      dispatch(setSortOption(type, order));
    },
    [dispatch],
  );

  const handleAddPizza = (params) => {
    dispatch(addPizzaToCart(params));
  };

  const countItems = (cartItems, type) => {
    const sameType = Object.keys(cartItems).filter((x) => parseInt(x[0]) === type);
    return sameType.reduce((sum, key) => {
      return sum + cartItems[key].items.length;
    }, 0);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryItems={categoryItems}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
        />
        <SortPopup sortItems={sortItems} sortType={sortType} onSelectSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzasArray.map((obj) => {
              return (
                <PizzaBlock
                  addedPizzas={countItems(cartItems, obj.id)}
                  onClickAddPizza={handleAddPizza}
                  key={obj.id}
                  {...obj}
                />
              );
            })
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
});

export default Home;
