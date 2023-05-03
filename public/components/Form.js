import axios from 'axios';
import { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validasi data
    const errors = {};
    
    if (!name) {
      errors.name = '*nama perlu diisi';
    }
    
    if (!address) {
      errors.address = '*alamat perlu diisi';
    }
    
    if (!birthdate) {
      errors.birthdate = '*tanggal lahir perlu diisi';
    }
    
    if (!occupation) {
      errors.occupation = '*pekerjaan perlu diisi';
    }

    if (!email) {
      errors.email = '*email perlu diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '*email tidak valid';
    }
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Kirim data ke server
    const data = {
      name,
      address,
      birthdate,
      occupation,
      email
    };
    
    axios.post('https://jsonplaceholder.typicode.com/posts', data)
      .then(response => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        console.log(response.data);
      })
      .catch(error => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        console.error(error);
      });
  }
  
  return (
    <>
      <header className='header'>
        <h1>Formulir</h1>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nama:
          <input className={errors.name ? 'input error' : 'input'} type="text" value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </label>
        <label>
          Email:
          <input className={errors.email ? 'input error' : 'input'} type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </label>
        <label>
          Alamat:
          <input className={errors.address ? 'input error' : 'input'} type="text" value={address} onChange={e => setAddress(e.target.value)} />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </label>
        <label>
          Tanggal lahir:
          <input className={errors.birthdate ? 'input error' : 'input'} type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          {errors.birthdate && <span className="error-message">{errors.birthdate}</span>}
        </label>
        <label>
          Pekerjaan:
          <input className={errors.occupation ? 'input error' : 'input'} type="text" value={occupation} onChange={e => setOccupation(e.target.value)} />
          {errors.occupation && <span className="error-message">{errors.occupation}</span>}
        </label>
        <button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        {submitStatus === 'success' && <p className="success-message">Formulir berhasil dikirim</p>}
        {submitStatus === 'error' && <p className="error-message">Terjadi kesalahan saat mengirimkan formulir</p>}
      </form>
    </>
  );
}

export default Form;


