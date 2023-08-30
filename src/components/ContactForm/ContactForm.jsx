import { useState } from 'react';
// import { setContacts } from 'redux/contactSlice';
import css from './ContactForm.module.css';
import {addContacts} from 'redux/operetions';

import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function ContactForm() {
 const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');


  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;
      default:
        return;
    }
  };
  
//   const reducerInput = (state, action) => {

//     switch (action.type) {
//       case 'name':
//         return { ...state, name: action.payload };
//       case 'phone':
//         return { ...state, number: action.payload };
//       case 'reset':
//         return initialValue;
//       default:
//         return state;
//     }
//   };

//  const initialValue = { name: '', number: '' };

//   const [{ name, number }, dispatchReducer] = useReducer(reducerInput, initialValue);

//   const handleInputChange = evt => {
//     const { name, value } = evt.target;
//     dispatchReducer({ type: name, payload: value });
//   };

  
  const isUniqueName = name => {
    const searchUnique = name.toLowerCase();

    if (contacts.find(({ name }) => name.toLowerCase() === searchUnique)) {
      Notify.failure(`"${name}" is already in contacts`);
      return false;
    }
    return true;
  };

const handleFormSubmit = evt => {
  evt.preventDefault();

  if (isUniqueName(name)) {
    dispatch(addContacts({ name, phone }));
    alert(`"${name}" added to your contacts`);
    
  }
setName('');
setPhone('');
   
};

  
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

      <h2 className={css.nameTxt}>PhoneNumber</h2>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        className={css.formTel}
        placeholder="Please enter phone number"
        value={phone}
        onChange={handleInputChange}
      />
      <button
        className={css.addContactBtn}
        type="submit"
        disabled={!name || !phone}
      >
        Add contact
      </button>
    </form>
  );
}
