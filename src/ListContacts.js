import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
/*
  We can create a stateless component with this model.
  stateless function ListContacts will receive props as an argument and
  will return render function with all the UI which we used below under <ol> element
*/
class ListContacts extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState((currentState) => ({
        query: query.trim()
    }))
  }

  clearQuery = () => {
    this.setState({
      query: ''
    })
  }

  render(){

    const visibleContacts = this.state.query.trim() === ''
                  ? this.props.contacts
                  : this.props.contacts.filter((c) => {
                      return c.name.toLowerCase().includes(this.state.query.toLowerCase().trim())
                    })

    return(
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input className='search-contacts'
                 type='text'
                 placeholder='Search contacts'
                 value={this.state.query}
                 onChange={ (event) => this.updateQuery(event.target.value)}
                 />
          <Link to='/create' className='add-contact'>Add Contact</Link>
        </div>

        {visibleContacts.length !== this.props.contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {visibleContacts.length} of {this.props.contacts.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {
            visibleContacts.map((contact) => {
              return(
                <li key={contact.id} className='contact-list-item'>
                  <div className='contact-avatar'
                       style={ { backgroundImage: `url(${contact.avatarURL})`} }>
                  </div>
                  <div className='contact-details'>
                    <p>{contact.name}</p>
                    <p>{contact.handle}</p>
                  </div>
                  <button className='contact-remove' onClick={() => this.props.onDeleteContact(contact)}>
                    Remove
                  </button>
                </li>
              )
            })
          }
        </ol>
      </div>
    )
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}


export default ListContacts
