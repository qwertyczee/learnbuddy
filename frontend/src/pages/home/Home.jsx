import React, { useState } from 'react'; // Import useState
import styles from './home.module.scss';
import { useNavigate } from "react-router-dom";

const LearnBuddy = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const toLogin = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const toRegister = async (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>LOGO</div>
        <ul className={styles.navLinks}>
          <li><a href="#about">About LearnBuddy</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <div className={styles.authButtons}>
          <button className={styles.loginButton} onClick={toLogin}>Login</button>
          <button className={styles.tryButton} onClick={toRegister}>Try For Free</button>
        </div>
      </nav>

      <div className={styles.textContent}>
        <div>
         {/* <div className={styles.stars}>
            ⭐⭐⭐⭐⭐ <span>Based on 10,000+ reviews</span>
          </div> */}
          <h1 className={styles.mainHeading}>Unlock Your Learning Potential with Learn Buddy</h1>
          <p className={styles.description}>
          Upload any audio, video, website, or PDF and get beautifully formatted notes with flashcards, questions, and much more!
          </p>

          <button className={styles.mainButton} onClick={toRegister}>Try For Free</button>
          
          <p className={styles.underTex}>Experience a smarter way to learn with Learn Buddy</p>
        </div>

        <div className={styles.videoSection}>
          <video autoPlay muted loop controls={false} className={styles.video}>
            <source src="/black.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
      

      <section id="about" className={styles.about}>
        <h2>About LearnBuddy</h2>
        <p>
          LearnBuddy is a platform dedicated to enhancing your learning experience. Founded by passionate students, our goal is to deliver personalized and adaptive study tools that cater to your unique learning style.
        </p>
      </section>

      <section id="pricing" className={styles.pricing}>
        <div className={styles.pricingHeader}>
          <h2>Affordable for all students.</h2>
          <div className={styles.pricingButtons}>
            <button 
              className={`${styles.pricingButton} ${!isYearly ? styles.active : ''}`}
              onClick={() => setIsYearly(false)} // Přepnutí na měsíční plán
            >
              Monthly
            </button>
            <button 
              className={`${styles.pricingButton} ${isYearly ? styles.active : ''}`}
              onClick={() => setIsYearly(true)} // Přepnutí na roční plán
            >
              Yearly
            </button>
          </div>
        </div>
        <div className={styles.plans}>
          <div className={styles.plan}>
            <p className={styles.planName}>Basic</p>
            <p className={styles.price}>{isYearly ? 'Free' : 'Free'}</p>
            <p className={styles.billed}>{isYearly ? 'Billed Yearly' : 'Billed Monthly'}</p>
            <p className={styles.features}>Basic features and support</p>
            <button className={styles.purchaseButton}>Buy Now</button>
          </div>
          <div className={styles.plan}>
            <h3>Standard</h3>
            <p className={styles.price}>{isYearly ? '$3.99/month' : '$8.99/month'}</p>
            <p className={styles.billed}>{isYearly ? 'Billed Yearly' : 'Billed Monthly'}</p>
            <p>Standard features, priority support</p>
            <button className={styles.purchaseButton}>Buy Now</button>
          </div>
          <div className={styles.plan}>
            <h3>Premium</h3>
            <p className={styles.price}>{isYearly ? '$8.99/month' : '$12.99/month'}</p>
            <p className={styles.billed}>{isYearly ? 'Billed Yearly' : 'Billed Monthly'}</p>
            <p>All features, dedicated support</p>
            <button className={styles.purchaseButton}>Buy Now</button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} LearnBuddy. All rights reserved.</p>
      </footer>

      <div className={styles.glowEffect1}></div>
      <div className={styles.glowEffect2}></div>
      <div className={styles.glowEffect3}></div>
      <div className={styles.glowEffect4}></div>
      
      <div className={styles.glowEffect5}></div>
      <div className={styles.glowEffect6}></div>
      <div className={styles.glowEffect7}></div>
      <div className={styles.glowEffect8}></div>
    </div>
  );
};

export default LearnBuddy;
