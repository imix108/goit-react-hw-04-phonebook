import { Component } from "react";
import { ContactForm } from "components/ContactForm/ContactForm";
import { ContactList } from "components/ContactList/ContactList";
import { Filter } from "components/Filter/Filter";
import { Section } from "components/Section/Section";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }
 componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const alreadyInContacts = this.state.contacts.some(contact => contact.name.toLowerCase() === this.state.name.trim().toLowerCase())
    if (alreadyInContacts) {
      alert(`Contact ${this.state.name} is already in List.`)
      return;
    }

    const newContact = { id: nanoid(), name: this.state.name, number: this.state.number}
    this.setState((prevState) => ({ contacts: [...prevState.contacts, newContact] }))
    e.currentTarget.reset();
  }

  onDeleteContact = idToDelete => {
    const isConfirmed = window.confirm('Are you sure want to delete this contact?');
    if (isConfirmed) {
      this.setState({contacts: this.state.contacts.filter(contact => contact.id !== idToDelete) })
    }
    
  }
  render() {
    const filteredContacts = this.state.contacts.filter(contactEl => contactEl.name.toLowerCase().includes(this.state.filter.trim().toLowerCase()))
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter filterValue ={this.state.filter} onInputChange = {this.onInputChange}></Filter>
          <ContactList contactsList={filteredContacts} onDeleteContact = {this.onDeleteContact}></ContactList>
        </Section>
      </div>
      
    )
  }
};