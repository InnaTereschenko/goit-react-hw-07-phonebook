import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';


const ContactListItem = ({ name, phone, handleDelete }) => {


  
  return (
    <li className={css.contactItem}>
      <span className={css.contactTxt}>{name}</span> :{' '}
      <span className={css.contactTxt}>{phone}</span>
      <button onClick={handleDelete} type="button" className={css.deleteBtn}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
