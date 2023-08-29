import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';


export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();


const handleFilterChange = evt => {
  const value = evt.target.value;

   dispatch(setFilter(value.toLowerCase().trim()));
  
}

return (
  <div className={css.filterSection}>
    <label className={css.filterLabel}>Find contacts by Name </label>
    <input
      className={css.filterName}
      type="text"
      name="filter"
      placeholder="Enter filter"
      value={filter}
      onChange={handleFilterChange}
    />
  </div>
);
};


