import { FaMagic, FaFilePdf, FaMobileAlt, FaRegClock } from 'react-icons/fa';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/modules/LandingPage.module.css';

export default function LandingPage() {
  const location = useLocation();

  // Scroll to section if there's a hash in the URL (e.g., #features)
  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.substring(1));
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <nav className={styles.nav}>
          <div className={styles.logo}>ResumeBuilder</div>
          <div className={styles.navLinks}>
            <button onClick={() => scrollToSection('features')} className={styles.navButton}>
              Features
            </button>
            <button onClick={() => scrollToSection('templates')} className={styles.navButton}>
              Templates
            </button>
            <a href="/create" className={styles.navButton}>Create Resume</a>
          </div>
        </nav>
        
        <div className={styles.heroContent}>
          <h1>Craft Your Perfect Resume in Minutes</h1>
          <p>AI-powered resume builder with professional templates and instant PDF download</p>
          <div className={styles.ctaContainer}>
            <a href="/create" className={styles.ctaButton}>Start Building →</a>
          </div>
          <div className={styles.previewImage}>
            <div className={styles.imagePlaceholder}></div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2>Why Choose ResumeBuilder?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaMagic className={styles.featureIcon} />
            <h3>Smart Suggestions</h3>
            <p>AI-powered content recommendations tailored to your industry</p>
          </div>
          <div className={styles.featureCard}>
            <FaFilePdf className={styles.featureIcon} />
            <h3>Instant PDF Download</h3>
            <p>Get print-ready resumes in perfect A4 format</p>
          </div>
          <div className={styles.featureCard}>
            <FaMobileAlt className={styles.featureIcon} />
            <h3>Mobile Friendly</h3>
            <p>Edit your resume anywhere, on any device</p>
          </div>
          <div className={styles.featureCard}>
            <FaRegClock className={styles.featureIcon} />
            <h3>Save Time</h3>
            <p>Create professional resumes in 15 minutes or less</p>
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section id="templates" className={styles.templates}>
        <h2>Professional Templates</h2>
        <div className={styles.templateGrid}>
          <div className={styles.templateItem}></div>
          <div className={styles.templateItem}></div>
          <div className={styles.templateItem}></div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
