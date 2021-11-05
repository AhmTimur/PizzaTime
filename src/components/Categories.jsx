import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(function Categories({
  categoryItems,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onSelectCategory(null)}>
          Все
        </li>
        {categoryItems &&
          categoryItems.map((category, index) => {
            return (
              <li
                className={activeCategory === index ? 'active' : ''}
                onClick={() => onSelectCategory(index)}
                key={`${category}_${index}`}>
                {category}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  categoryItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.number,
  onSelectCategory: PropTypes.func,
};

Categories.defaultProps = {
  categoryItems: [],
  activeCategory: null,
};

export default Categories;
