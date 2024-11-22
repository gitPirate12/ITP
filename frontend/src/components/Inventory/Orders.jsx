import emailjs from 'emailjs-com';
import { useState } from 'react';
import Sidebar from './Navbar';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ja68znw', 'template_mvm0w5r', e.target, 'DVOG8gLkyQuzRXDQD')
      .then((result) => {
        console.log(result.text);
        alert('Order sent succesfully.');
        setName('');
        setEmail('');
        setMessage('');
      }, (error) => {
        console.error(error);
        alert('There was an error submitting the form.');
      });
  };

  return (
    <div>
    <Sidebar/>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        <h2>Send inventory request</h2>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="from_name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="reply_to" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="message">Message:</label>
        <textarea style={{ width: '100%', height: '6rem', padding: '0.5rem' }} id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

        <button style={{ display: 'block', margin: 'auto', marginTop: '1rem' }} type="submit">Send</button>
      </form>
    </div>
    </div>
  );
};

export default ContactForm;
