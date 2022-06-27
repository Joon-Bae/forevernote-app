import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import * as sessionActions from '../../store/session'
import './LoginForm.css'

function LoginFormModal() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    // setCredential('FakeUser1')
    // setPassword('password2')
    return dispatch(sessionActions.login({ credential:'FakeUser1', password:'password2' }))
  };

  return (
    <>
    <button  className='main-login-button' onClick={() => setShowModal(true)}>
      <img className='hamburger-menu' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
      </button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <LoginForm />
        <div id='demo-login-modal'>
        <button type='submit' className='demo-login-button' onClick={(e) => handleSubmit(e)}>Log In As Demo User</button>
        </div>
      </Modal>
    )}
  </>
  );
}

export default LoginFormModal;
