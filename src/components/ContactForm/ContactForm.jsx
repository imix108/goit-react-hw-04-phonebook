import css from './ContactForm.module.css';

export const ContactForm = ({ onNameChange, onNumberChange, onSubmit }) => {
  return (
    <form className={css.form } onSubmit={onSubmit}>
      <label className={css.label } htmlFor="nameInput">Name</label>
      <input className={css.input }type="text" id="nameInput" name="name" onChange={onNameChange} required placeholder="Ivan"/>               

      <label className={css.label }htmlFor="telInput">Number</label>
      <input className={css.input }type="tel" id="telInput" name="number" onChange={onNumberChange} pattern="\+?[0-9\s\-()]+"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" required placeholder="987-65-43"/>

      <button className={css.submitBtn }type="submit">Add Contact</button>
    </form>
  )
}