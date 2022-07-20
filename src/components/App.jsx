import React, { useState, useEffect } from 'react';
import Filter from './filter/Filter';
import Phonebook from './phonebook/Phonebook'
import Contacts from './contacts/Contacts';

export function App() {
const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const getFilterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  const checkContact = newContact => {
    return contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
  };

  const changeFilter = event => {
   return setFilter(event.currentTarget.value);
  };

  const addContact = newContact => {
    if (checkContact(newContact)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

     setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contact) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (contacts) {
  //     this.setState({ contacts: contacts });
  //   }
  // }

  // render() {
  //   const { filter } = this.state;

  //   const visibleContacts = this.getFilterContact();
    useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);
  
    return (
      <div>
        <div>
          <Phonebook onRiseContact={addContact} />
        </div>

        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <Contacts
            contacts={getFilterContact()}
            onDeleteContacts={deleteContact}
          />
        </div>
      </div>
    );
  }


