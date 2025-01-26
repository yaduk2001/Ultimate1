import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import MuscleSelector from './MuscleSelector';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    goals: '',
    fitnessLevel: 'beginner',
    preferredWorkouts: []
  });
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const muscleGroups = {
    chest: {
      name: 'Chest',
      exercises: [
        {
          name: 'Bench Press',
          description: 'Lie on a flat bench and press the weight up',
          difficulty: 'intermediate',
          equipment: 'Barbell, Bench',
          image: '/exercises/bench-press.png'
        },
        {
          name: 'Push-Ups',
          description: 'Classic bodyweight exercise for chest',
          difficulty: 'beginner',
          equipment: 'None',
          image: '/exercises/push-ups.png'
        },
        // Add more exercises
      ]
    },
    back: {
      name: 'Back',
      exercises: [
        {
          name: 'Pull-Ups',
          description: 'Upper body pulling exercise',
          difficulty: 'intermediate',
          equipment: 'Pull-up bar',
          image: '/exercises/pull-ups.png'
        },
        {
          name: 'Bent Over Rows',
          description: 'Bend over and row the weight to your chest',
          difficulty: 'intermediate',
          equipment: 'Barbell/Dumbbell',
          image: '/exercises/bent-over-rows.png'
        },
        // Add more exercises
      ]
    },
    // Add more muscle groups
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUser({ ...user, ...userDoc.data() });
          setUserProfile({ ...userDoc.data() });
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `profile-images/${user.uid}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        await updateDoc(doc(db, 'users', user.uid), {
          profileImage: url
        });
        setProfileImage(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), userProfile);
      setEditMode(false);
      setUser({ ...user, ...userProfile });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleMuscleGroupSelect = (muscleGroup) => {
    setSelectedMuscleGroup(muscleGroup);
    setWorkouts(muscleGroups[muscleGroup].exercises);
  };

  const renderWorkoutsSection = () => {
    return (
      <div className="workouts-section">
        <h2>Workouts</h2>
        
        {!selectedMuscleGroup ? (
          <div className="workout-selection">
            <MuscleSelector onMuscleSelect={handleMuscleGroupSelect} />
          </div>
        ) : (
          <div className="selected-muscle-workouts">
            <div className="section-header">
              <button 
                className="back-button"
                onClick={() => setSelectedMuscleGroup(null)}
              >
                ← Back to Muscle Selection
              </button>
              <h3>{muscleGroups[selectedMuscleGroup].name} Exercises</h3>
            </div>
            
            <div className="exercises-grid">
              {workouts.map((exercise, index) => (
                <div key={index} className="exercise-card">
                  <img src={exercise.image} alt={exercise.name} />
                  <h4>{exercise.name}</h4>
                  <p>{exercise.description}</p>
                  <div className="exercise-meta">
                    <span className={`difficulty ${exercise.difficulty}`}>
                      {exercise.difficulty}
                    </span>
                    <span className="equipment">{exercise.equipment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your fitness journey...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="user-profile-brief">
          <div className="profile-image-container">
            <img 
              src={user?.profileImage || '/default-avatar.png'} 
              alt="Profile" 
              className="profile-image"
            />
            <label className="image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <span className="upload-icon">📷</span>
            </label>
          </div>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>

        <nav className="dashboard-nav">
          <button 
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            Profile
          </button>
          <button 
            className={`nav-item ${activeSection === 'workouts' ? 'active' : ''}`}
            onClick={() => setActiveSection('workouts')}
          >
            Workouts
          </button>
          <button 
            className={`nav-item ${activeSection === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveSection('progress')}
          >
            Progress
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        {activeSection === 'overview' && (
          <div className="dashboard-overview">
            <h2>Welcome back, {user?.name}! 🎉</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Workout Streak</h3>
                <p className="stat-number">5 days</p>
              </div>
              <div className="stat-card">
                <h3>Calories Burned</h3>
                <p className="stat-number">1,200</p>
              </div>
              <div className="stat-card">
                <h3>Next Goal</h3>
                <p className="stat-text">{user?.goals || 'Set your first goal!'}</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Profile Settings</h2>
              <button 
                className="edit-toggle"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label>Fitness Level</label>
                <select
                  value={userProfile.fitnessLevel}
                  onChange={(e) => setUserProfile({...userProfile, fitnessLevel: e.target.value})}
                  disabled={!editMode}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {editMode && (
                <button 
                  className="save-profile-btn"
                  onClick={handleProfileUpdate}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        )}

        {activeSection === 'workouts' && renderWorkoutsSection()}
      </main>
    </div>
  );
};

export default Dashboard; 