import { Component, Fragment } from 'react';
import shortId from 'shortid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (!localStorage.getItem('phonebookContacts')) {
      localStorage.setItem(
        'phonebookContacts',
        JSON.stringify(this.state.contacts),
      );
    }
    this.setState({
      contacts: JSON.parse(localStorage.getItem('phonebookContacts')),
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      'phonebookContacts',
      JSON.stringify(this.state.contacts),
    );
  }

  handleFilterChange = value => {
    this.setState({ filter: value });
  };

  formSubmitHandler = data => {
    const allNames = this.state.contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );
    if (allNames.includes(data.name.toLocaleLowerCase())) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    const contact = {
      id: shortId.generate(),
      name: data.name,
      number: data.number,
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Fragment>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Fragment>
    );
  }
}

export default App;
