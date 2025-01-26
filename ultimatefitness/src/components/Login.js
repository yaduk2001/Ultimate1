import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, collection, query, where, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';  // Make sure this path is 


const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'userId'
  const [credentials, setCredentials] = useState({
    identifier: '', // email or userId
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailVerifying, setIsEmailVerifying] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setError('');
    setMessage('');
    setCredentials({
      identifier: '',
      password: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const checkEmailVerification = async (user, userDocRef) => {
    if (user.emailVerified) {
      // Update the verified status in Firestore
      try {
        await updateDoc(userDocRef, {
          verified: true
        });
        setMessage('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } catch (error) {
        setError('Error updating verification status');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      let userDoc;
      let userCredential;
      
      if (loginMethod === 'email') {
        userCredential = await signInWithEmailAndPassword(
          auth, 
          credentials.identifier, 
          credentials.password
        );
        userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      } else if (loginMethod === 'userId') {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('userId', '==', credentials.identifier));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          userDoc = querySnapshot.docs[0];
          // After finding user by userId, verify password
          userCredential = await signInWithEmailAndPassword(
            auth,
            userDoc.data().email,
            credentials.password
          );
        }
      }

      if (!userDoc || !userDoc.exists()) {
        setError('User not found');
        return;
      }

      const userData = userDoc.data();
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      
      // Check if the user has verified their email
      await checkEmailVerification(userCredential.user, userDocRef);

      if (!userData.verified) {
        // Send verification email
        try {
          await sendEmailVerification(userCredential.user);
          setMessage('Your email is not verified. A new verification link has been sent to your email.');
        } catch (verificationError) {
          setError('Error sending verification email. Please try again later.');
        }
      } else {
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="login-method-selector">
          <button
            type="button"
            className={`method-btn ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => handleLoginMethodChange('email')}
          >
            Email
          </button>
          <button
            type="button"
            className={`method-btn ${loginMethod === 'userId' ? 'active' : ''}`}
            onClick={() => handleLoginMethodChange('userId')}
          >
            User ID
          </button>
        </div>

        <div className="form-group">
          <input
            type={loginMethod === 'email' ? 'email' : 'text'}
            name="identifier"
            value={credentials.identifier}
            onChange={handleInputChange}
            placeholder={loginMethod === 'email' ? 'Email' : 'User ID'}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>

        {message && <div className="info-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-btn">
          Login
        </button>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 