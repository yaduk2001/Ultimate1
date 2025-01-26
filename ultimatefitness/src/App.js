import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registration from './components/Registration';

function App() {
  const testimonials = [
    {
      quote: "Excellent personal training. Trainers who really care and go above and beyond to help you achieve your goals. Highly recommended!"
    },
    {
      quote: "The best gym I've ever been to! Great equipment, amazing trainers, and a really motivating atmosphere."
    },
    {
      quote: "Transformed my fitness journey completely. The personal attention and custom programs are outstanding."
    },
    {
      quote: "Professional trainers and state-of-the-art equipment. Couldn't ask for a better fitness experience!"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [selectedStep, setSelectedStep] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const activityLevels = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Lightly active (1-3 days/week)",
    moderate: "Moderately active (3-5 days/week)",
    very: "Very active (6-7 days/week)",
    extra: "Extra active (very active + physical job)"
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleNextSlide = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevSlide = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmiResult(bmi);
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal Weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="App">
      <div 
        className="location-section"
        onClick={() => window.open('https://www.google.com/maps/place/Ultimate+fitness+Gym/@9.5003573,76.6403805,18.83z/')}
      >
        <i className="fas fa-location-dot"></i>
        Find us: Ultimate Fitness Karukachal
      </div>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="logo">Ultimate Fitness</div>
        
        <div className="nav-right">
          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#classes" onClick={() => setIsMobileMenuOpen(false)}>Classes</a>
            <a href="#membership" onClick={() => setIsMobileMenuOpen(false)}>Membership</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <Link to="/register" className="join-btn" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
          </div>
        </div>
      </nav>

      <main className="hero-section">
        <h1>Transform Your Life</h1>
        <h2>Join the Ultimate Fitness Experience</h2>
        <Link to="/register" className="cta-button">Join Now</Link>
      </main>

      <section className="programs-section">
        <div className="program-card">
          <img src="https://cathe.com/wp-content/uploads/2018/09/shutterstock_223390039.jpg" alt="Weight Loss" />
          <div className="program-content">
            <i className="fas fa-weight-scale"></i>
            <h3>Weight Loss & Gain</h3>
          </div>
        </div>
        
        <div className="program-card">
          <img src="https://www.thfi.com/cdn/shop/articles/Wk61-HowToBecomeASuccessfulMobilePT-Blog-1200x800px.jpg?v=1718370878&width=1200" alt="Personal Trainer" />
          <div className="program-content">
            <i className="fas fa-dumbbell"></i>
            <h3>Personal Trainer</h3>
          </div>
        </div>
        
        <div className="program-card">
          <img src="https://i.ytimg.com/vi/ImI63BUUPwU/maxresdefault.jpg" alt="Cardio Program" />
          <div className="program-content">
            <i className="fas fa-heart-pulse"></i>
            <h3>Cardio Program</h3>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-video">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
            alt="Gym Interior" 
          />
          <div className="play-button">
            <i className="fas fa-play-circle"></i>
          </div>
        </div>
        <div className="about-content">
          <h2>Ultimate Fitness - The Best Gym in Karukachal</h2>
          <p>
            Are you looking for the best gym in Karukachal? Then Ultimate Fitness welcomes
            people from all walks of life to join and experience the unique, holistic
            approach to fitness training on offer at this gym. From adults who want
            to lose weight and tone their muscles to kids trying to channelize their
            energy into healthy pursuits, this gym has everything covered! Ultimate Fitness
            aims to bring the best out of you through our state-of-the-art fitness
            equipment and high-quality training, catering to your specific needs while
            working around your schedule so you can get the most out of your
            workout time every day.
          </p>
          <a href="#" className="read-more">
            READ MORE <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>

      <section className="reasons-section">
        <div className="reasons-content">
          <div className="reasons-number">02</div>
          <h2>7 Reasons to Join the Best Gym in Karukachal</h2>
          <div className="reasons-list">
            Free Personal Training, Body Building, Cardio Work Outs,
            (floor and machine) Belly Fat burning, Total Fitness solution
            for men and women, Fat Burning Workouts Healthy Diet Plans
          </div>
          <a href="#" className="join-now-button">
            JOIN NOW <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        <div className="reasons-image">
          <img 
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
            alt="Gym Equipment" 
          />
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonial-slider">
          <div className="testimonial">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <div className="testimonial-quote">
              {testimonials[currentTestimonial].quote}
            </div>
          </div>
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`slider-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="training-programs">
        <div className="training-programs-header">
          <h2>Training Programs</h2>
          <p>Come, Let us up your workout routines to the next level with our well planned training
             programs and personal challenges. Pick the training that matches your needs.</p>
        </div>
        
        <div className="program-grid">
          <div className="program-item dark">
            <div className="program-content-overlay">
              <div className="program-category">BODY SHAPE</div>
              <h3 className="program-title">Crossfit</h3>
              <p className="program-description">
                At Ultimate Fitness, we offer CrossFit classes that are designed to help you gain strength and endurance
              </p>
              <a href="#" className="read-more-link">
                READ MORE <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="program-item center-image">
            <img src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Weight Training" />
          </div>

          <div className="program-item red">
            <div className="program-content-overlay">
              <div className="program-category">RELAX PROGRAM</div>
              <h3 className="program-title">Weight Loss</h3>
              <p className="program-description">
                At Ultimate Fitness, we offer a comprehensive weight loss training program
              </p>
              <a href="#" className="read-more-link">
                READ MORE <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="program-item blue">
            <div className="program-content-overlay">
              <div className="program-category">CARDIO WORKFLOW</div>
              <h3 className="program-title">Cardio</h3>
              <p className="program-description">
                At Ultimate Fitness, we offer a variety of cardio exercises to get your heart pumping
              </p>
              <a href="#" className="read-more-link">
                READ MORE <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="program-item center-image">
            <img src="https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Cardio Training" />
          </div>

          <div className="program-item dark-purple">
            <div className="program-content-overlay">
              <div className="program-category">POWER-PRO</div>
              <h3 className="program-title">Kick Boxing</h3>
              <p className="program-description">
                Master the art of kickboxing with our professional trainers
              </p>
              <a href="#" className="read-more-link">
                READ MORE <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="fitness-goals">
        <div className="goals-header">
          <h2>Set Your Fitness Goals</h2>
          <p>Once you decide to start training we will make sure you get the best suitable fitness program.
             Our training experts and latest equipment are the best winning combination for you.</p>
        </div>
        
        <div className="goals-features">
          <div className="goal-item">
            <div className="goal-icon">
              <svg viewBox="0 0 24 24" className="custom-icon">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
              </svg>
            </div>
            <h3>Quality Equipment</h3>
            <p>Ultimate Fitness equipped with complete quality equipment to meet the standard of the new age</p>
          </div>

          <div className="goal-item">
            <div className="goal-icon">
              <svg viewBox="0 0 24 24" className="custom-icon">
                <path d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-4H9V4h6v11z"/>
              </svg>
            </div>
            <h3>Healthy Nutrition Plan</h3>
            <p>Ultimate Fitness has right combination of diet chart and workout plans to help reach your goals faster.</p>
          </div>

          <div className="goal-item">
            <div className="goal-icon">
              <svg viewBox="0 0 24 24" className="custom-icon">
                <path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zm0-4.5c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2z"/>
              </svg>
            </div>
            <h3>Shower Service</h3>
            <p>You can freshen up at the gym right after your workout without needing to return home to shower.</p>
          </div>

          <div className="goal-item">
            <div className="goal-icon">
              <svg viewBox="0 0 24 24" className="custom-icon">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3>Unique to Your Needs</h3>
            <p>Ultimate Fitness offers Yoga, Weight loss, CrossFit etc. to match your unique needs.</p>
          </div>
        </div>
      </section>

      <section className="bmi-section">
        <div className="bmi-container">
          <div className="bmi-chart">
            <h2>BMI Calculator Chart</h2>
            <table className="bmi-table">
              <thead>
                <tr>
                  <th>BMI</th>
                  <th>Weight Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Below 18.5</td>
                  <td>Underweight</td>
                </tr>
                <tr>
                  <td>18.5 - 24.9</td>
                  <td>Healthy</td>
                </tr>
                <tr>
                  <td>25.0 - 29.9</td>
                  <td>Overweight</td>
                </tr>
                <tr>
                  <td>30.0 and Above</td>
                  <td>Obese</td>
                </tr>
              </tbody>
            </table>
            <div className="bmi-note">
              * BMR Metabolic Rate / BMI Body Mass Index
            </div>
          </div>

          <div className="bmi-calculator">
            <h2>Calculate Your BMI</h2>
            <p>BMI is a measure of body fat based on height and weight that applies to adult men and women.</p>
            
            <div className="calculator-inputs">
              <div className="input-row">
                <div className="input-group">
                  <input 
                    type="number" 
                    placeholder="Height / cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input 
                    type="number" 
                    placeholder="Weight / kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <input 
                    type="number" 
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="input-group full-width">
                <select 
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="">Select an activity factor:</option>
                  {Object.entries(activityLevels).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              <button className="calculate-btn" onClick={calculateBMI}>
                Calculate <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="progress-steps">
        <div className="steps-container">
          <div className="step-item" onClick={() => setSelectedStep(selectedStep === 1 ? null : 1)}>
            <div className={`step-circle ${selectedStep === 1 ? 'large' : ''}`}>
              <div className="circle-content">
                <img src="https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=2000&auto=format&fit=crop" 
                     alt="Movement" 
                     className="circle-image" 
                />
                <span className="step-number">1</span>
              </div>
            </div>
            <h3>Movement</h3>
          </div>

          <div className="step-connector"></div>

          <div className="step-item" onClick={() => setSelectedStep(selectedStep === 2 ? null : 2)}>
            <div className={`step-circle ${selectedStep === 2 ? 'large' : ''}`}>
              <div className="circle-content">
                <img src="https://images.unsplash.com/photo-1589955791915-526198ae4ee9?q=80&w=2000&auto=format&fit=crop" 
                     alt="Time" 
                     className="circle-image" 
                />
                <span className="step-number">2</span>
              </div>
            </div>
            <h3>Time</h3>
          </div>

          <div className="step-connector"></div>

          <div className="step-item" onClick={() => setSelectedStep(selectedStep === 3 ? null : 3)}>
            <div className={`step-circle ${selectedStep === 3 ? 'large' : ''}`}>
              <div className="circle-content">
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop" 
                     alt="Practice" 
                     className="circle-image" 
                />
                <span className="step-number">3</span>
              </div>
            </div>
            <h3>Practise</h3>
          </div>

          <div className="step-connector"></div>

          <div className="step-item" onClick={() => setSelectedStep(selectedStep === 4 ? null : 4)}>
            <div className={`step-circle ${selectedStep === 4 ? 'large' : ''}`}>
              <div className="circle-content">
                <img src="https://i.pinimg.com/564x/5d/75/43/5d7543b1c8022931dc316b9b9b50cd02.jpg" 
                     alt="Weight Loss" 
                     className="circle-image" 
                />
                <span className="step-number">4</span>
              </div>
            </div>
            <h3>Weight Loss</h3>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <i className="fas fa-dumbbell"></i>
          <h3>Modern Equipment</h3>
          <p>State-of-the-art facilities for your best workout</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-users"></i>
          <h3>Expert Trainers</h3>
          <p>Professional guidance for your fitness journey</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-clock"></i>
          <h3>24/7 Access</h3>
          <p>Train on your schedule</p>
        </div>
      </section>
    </div>
  );
}

export default App;
