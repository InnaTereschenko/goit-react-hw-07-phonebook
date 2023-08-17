import { ContactForm } from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import {Filter} from './Filter/Filter';

import { getContacts } from 'redux/selectors';
import { useSelector} from 'react-redux';


export function App() {
  const contacts = useSelector(getContacts);
 
    
  return (
        <div>
      <h1 className="mainTitle">Phonebook</h1>
      <ContactForm />
      {contacts.length > 0 && 
        <>
      <Filter />
      <ContactList />
        </>
      }
      
        </div>
      
    // <div>
    //   <h1 className="mainTitle">Phonebook</h1>

    //   <ContactForm handleSubmit={handleSubmit} />
    //   <Filter filter={filter} handleInputChange={handleInputChange} />
    //   <ContactList
    //     contacts={getFilteredContacts()}
    //     handleDelete={handleDelete}
    //   />
    // </div>
  );
}
