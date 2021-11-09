import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';

const PizzaBlock = React.memo(function PizzaBlock({
  id,
  imageUrl,
  name,
  price,
  types,
  sizes,
  onClickAddPizza,
  addedPizzas,
}) {
  const typeName = ['тонкое', 'традиционное'];
  const pizzaSizes = ['26', '30', '40'];

  const [activeType, setActiveType] = React.useState(types[0]);
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);
  const [currentPrice, setCurrentPrice] = React.useState(price[selectedSize]);

  // console.log(addedPizzas);
  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectSize = (index) => {
    setSelectedSize(pizzaSizes[index]);
    setCurrentPrice(price[Object.keys(price)[index]]);
  };

  const handleAddPizza = (id, imageUrl, price, activeType, selectedSize) => {
    onClickAddPizza({ id, imageUrl, name, price, activeType, selectedSize });
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {typeName.map((type, index) => {
            return (
              <li
                key={type}
                onClick={() => onSelectType(index)}
                className={classNames({
                  active: activeType === index,
                  disabled: !types.includes(index),
                })}>
                {type}
              </li>
            );
          })}
        </ul>
        <ul>
          {pizzaSizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => onSelectSize(index)}
                className={classNames({
                  active: selectedSize == pizzaSizes[index],
                  disabled: !sizes.includes(+size),
                })}>
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{currentPrice} ₽</div>
        <Button
          className="button--add"
          onClick={() => handleAddPizza(id, imageUrl, currentPrice, activeType, selectedSize)}
          outline>
          <span>Добавить</span>
          {!!addedPizzas && <i>{addedPizzas}</i>}
        </Button>
      </div>
    </div>
  );
});

PizzaBlock.propTypes = {
  name: PropTypes.string,
  price: PropTypes.shape({
    [PropTypes.string]: PropTypes.number,
  }),
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

PizzaBlock.defautProps = {
  name: '------',
  price: 0,
  type: [],
};

export default PizzaBlock;
