import React, { useState } from 'react';
import { exerciseData } from '../data/exerciseData';
import './MuscleSelector.css';

const MuscleSelector = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    setSelectedMuscle(null);
    setSelectedExercise(null);
  };

  const handleMuscleClick = (muscleId) => {
    setSelectedMuscle(muscleId);
    setSelectedExercise(null);
  };

  const renderSections = () => (
    <div className="section-grid">
      {Object.entries(exerciseData).map(([id, section]) => (
        <div
          key={id}
          className="section-card"
          onClick={() => handleSectionClick(id)}
        >
          <div className="section-image">
            <img src={section.image} alt={section.name} />
          </div>
          <h2>{section.name}</h2>
        </div>
      ))}
    </div>
  );

  const renderMuscles = () => (
    <>
      <button className="back-button" onClick={() => setSelectedSection(null)}>
        ← Back to sections
      </button>
      <h1>{exerciseData[selectedSection].name} Workouts</h1>
      <div className="muscle-grid">
        {Object.entries(exerciseData[selectedSection].muscles).map(([id, muscle], index) => (
          <div
            key={id}
            className="muscle-card"
            onClick={() => handleMuscleClick(id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3>{muscle.name}</h3>
            <span className="exercise-count">
              {muscle.exercises.length} exercises
            </span>
          </div>
        ))}
      </div>
    </>
  );

  const renderExercises = () => {
    const exercises = exerciseData[selectedSection].muscles[selectedMuscle].exercises;
    
    return (
      <div className="exercises-container">
        <button className="back-button" onClick={() => setSelectedMuscle(null)}>
          ← Back to {exerciseData[selectedSection].muscles[selectedMuscle].name}
        </button>
        
        {!selectedExercise ? (
          <div className="exercises-grid">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="exercise-card"
                onClick={() => setSelectedExercise(exercise)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="exercise-thumbnail">
                  <img src={exercise.thumbnailURL} alt={exercise.name} />
                </div>
                <h3>{exercise.name}</h3>
                <div className="exercise-meta">
                  <span className="difficulty">{exercise.difficulty}</span>
                  <span className="equipment">{exercise.equipment}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="exercise-detail">
            <button className="back-button" onClick={() => setSelectedExercise(null)}>
              ← Back to exercises
            </button>
            
            <h2>{selectedExercise.name}</h2>
            
            <div className="video-container">
              <img 
                src={selectedExercise.videoURL} 
                alt={selectedExercise.name}
                className="exercise-gif"
              />
            </div>
            
            <div className="exercise-instructions">
              <h3>Instructions</h3>
              <ol>
                {selectedExercise.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="muscle-selector">
      {!selectedSection ? renderSections() :
       !selectedMuscle ? renderMuscles() :
       renderExercises()}
    </div>
  );
};

export default MuscleSelector; 