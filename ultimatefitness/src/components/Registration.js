import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [showUserId, setShowUserId] = useState(false);
  const [generatedUserId, setGeneratedUserId] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.phone || isNaN(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }

    if (formData.phone && formData.phone.toString().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (value) => {
    const numericPhone = parseInt(value.replace(/\D/g, ''), 10);
    
    setFormData(prev => ({
      ...prev,
      phone: numericPhone
    }));
    
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const generateUserId = () => {
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `UL${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userId = generateUserId();
      setGeneratedUserId(userId);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        verified: false,
        userId: userId
      });

      setShowUserId(true);

      setTimeout(() => {
        navigate('/login');
      }, 5000);

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="registration-container">
      {showUserId ? (
        <div className="user-id-display">
          <div className="success-message">
            <h2>Registration Successful!</h2>
            <p>Your User ID is:</p>
            <div className="user-id">{generatedUserId}</div>
            <p>Please save this ID for future reference.</p>
            <p>Redirecting to login page in 5 seconds...</p>
          </div>
        </div>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Register Now</h2>
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <PhoneInput
              country={'in'}
              value={formData.phone ? formData.phone.toString() : ''}
              onChange={handlePhoneChange}
              inputProps={{
                required: true,
                name: 'phone'
              }}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
              />
              {errors.age && <span className="error-text">{errors.age}</span>}
            </div>
            
            <div className="form-group">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error-text">{errors.gender}</span>}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>

          <div className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Registration; 