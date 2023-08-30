import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { selectContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operetions';

export function App() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('це запрос з АПП')
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mainTitle">Phonebook</h1>
      <ContactForm />
      {contacts.length > 0 && (
        <>
          <Filter />

          <ContactList />
        </>
      )}
    </div>
  );
}
