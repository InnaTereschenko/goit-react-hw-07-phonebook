import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import ContactListItem from '../ContactListItem/ContactListItem';
import { selectError, selectFilteredContacts, selectIsLoading } from 'redux/selectors';
// import { fetchContacts } from 'redux/operetions';
import { Loader } from 'components/Loader';
// import { useEffect } from 'react';


export const ContactList = () => {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  // const dispatch = useDispatch();
  const filteredContacts =  useSelector(selectFilteredContacts);

  
  // useEffect(() => {
  //   dispatch(fetchContacts())
  // }, [dispatch]);
  
  
  return (
    <div className={css.listSection}>
      <h2 className={css.contactsTitle}>Contacts</h2>
      <ul>
        {isLoading && !error ? (<Loader />) :
          filteredContacts.length === 0 && !error ? (
            <p>The Phonebook is empty. Add your first contact. 🫤</p>
          ) : (
                    
              
              filteredContacts.map(({ id, name, phone }) => (
                <ContactListItem
                  key={id}
                  id={id}
                  name={name}
                  phone={phone}
                  
                />
              )))
            }
      </ul>
    </div>
  );
};



