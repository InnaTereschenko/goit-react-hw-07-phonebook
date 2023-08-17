import { useReducer } from 'react';
// import { setContacts } from 'redux/contactSlice';
import css from './ContactForm.module.css';
import { addContact } from 'redux/contactSlice';

import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function ContactForm() {
  const initialValue = { name: '', number: '' };

  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'name':
        return { ...state, name: action.payload };
      case 'number':
        return { ...state, number: action.payload };
      case 'reset':
        return initialValue;
      default:
        return state;
    }
  };

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [{ name, number }, dispatchReducer] = useReducer(reducer, initialValue);

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    dispatchReducer({ type: name, payload: value });
  };

  // switch (name) {
  //   case 'name': ;
  //     break;

  //   case 'number': setNumber(value);
  //     break;

  //   default: return;
  // }
  const isUniqueName = name => {
    const searchUnique = name.toLowerCase();

    if (contacts.find(({ name }) => name.toLowerCase() === searchUnique)) {
      Notify.failure(`"${name}" is already in contacts`);
      return false;
    }
    return true;
  };

  // const handleSubmit = (evt) => {
  //  const id = nanoid();
  //   const name = evt.name;
  //   const number = evt.number;
  //   const contactsLists = [...contacts];

  //     if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
  //       alert(`${name} is already in contacts.`);
  //     } else {
  //        contactsLists.push({ name, id, number });
  //     }

  //      setContacts(contactsLists);
  //  }

  const handleFormSubmit = evt => {
    evt.preventDefault();
    // перевірка, чи є вже таке ім'я в контактах
    if (isUniqueName(name)) {
      dispatch(addContact({ id: nanoid(), name, number }));
      
    dispatchReducer({ type: 'reset', payload: initialValue });
    }
    
      // Збереження контактів у localStorage
      // localStorage.setItem('contacts', JSON.stringify(contacts));
  };

// Перший рендер, якщо в ЛС щось є - парсимо дані
  //   useEffect(() => {
  //       const localStContacts = localStorage.getItem('contacts');
  //     if (localStContacts) {
  //       dispatch(setContacts(JSON.parse(localStContacts)));
  // }
  //   }, [dispatch]);


  return (
    <form className={css.contactForm} onSubmit={handleFormSubmit}>
      <h2 className={css.nameTxt}>Name</h2>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        className={css.formName}
        placeholder="Please enter name"
        value={name}
        onChange={handleInputChange}
      />

      <h2 className={css.nameTxt}>Number</h2>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        className={css.formTel}
        placeholder="Please enter phone number"
        value={number}
        onChange={handleInputChange}
      />
      <button
        className={css.addContactBtn}
        type="submit"
        disabled={!name || !number}
      >
        Add contact
      </button>
    </form>
  );
}
