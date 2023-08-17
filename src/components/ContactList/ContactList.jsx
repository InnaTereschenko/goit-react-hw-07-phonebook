import { useSelector, useDispatch } from 'react-redux';
import css from './ContactList.module.css';
import ContactListItem from '../ContactListItem/ContactListItem';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactSlice';
// import { Notify } from 'notiflix';
// import { useEffect } from 'react';

   const getFilteredContacts = (contacts, filter) => {
     const filterContactsList = contacts.filter(contact => {
      
         return contact.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase());
      });

    //  if (!filterContactsList.length && filter !== "") {
    //    Notify.info( 'No contacts matching your request' );
    //  }
      return filterContactsList;
    } 


export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const filteredContacts = getFilteredContacts(contacts, filter);
  
      const handleDelete = id => {
    dispatch(deleteContact(id));
  };
  
  // useEffect(() => {
  //     contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  //    }, [contacts]);
  
  
  return (
    <div className={css.listSection}>
      <h2 className={css.contactsTitle}>Contacts</h2>
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            handleDelete={() => handleDelete(id)}
          />
        ))}
      </ul>
    </div>
  );
};



