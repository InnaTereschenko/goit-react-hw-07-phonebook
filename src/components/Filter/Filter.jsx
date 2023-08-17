import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { filterContacts } from 'redux/contactSlice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();


const handleInputChange = evt => {
  const value = evt.target.value;
  dispatch(filterContacts(value.toLowerCase().trim()));
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
      onChange={handleInputChange}
    />
  </div>
);
};


