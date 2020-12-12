import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
// import PropTypes from 'prop-types'

class Contacts extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  render() {
    const { contacts, onDeleteContact } = this.props;
    return (
      <Fragment>
        <ul className={s.list}>
          {contacts.map(({ id, name, number }) => {
            return (
              <li key={id} className={s.listItem}>
                <span className={s.name}>{name}:</span>
                <span className={s.num}>{number}</span>
                <button
                  className={s.button}
                  onClick={() => onDeleteContact(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default Contacts;
