import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';
import nextgen from "../assets/landingpage/nextgen.png";
import imsdashboard from "../assets/landingpage/imsdashboard.png";
import success from "../assets/landingpage/success.png";
import automated from "../assets/landingpage/automated.png";
import realtime from "../assets/landingpage/realtime.png";
import secure from "../assets/landingpage/secure.png";
import bluearrow from "../assets/landingpage/bluearrow.png" ;
import tick from "../assets/landingpage/tick.png";
import office from "../assets/landingpage/office.png";
import global from "../assets/landingpage/global.png";
import mail from "../assets/landingpage/mail.png";
import heart from "../assets/landingpage/heart.png";


export const LandingPage = () => {
  const navigate = useNavigate();
const [activeTab, setActiveTab] = useState("Students");
  return (
   
  <div className="ims-landingpage-container">   
  <nav className="ims-landingpage-navbar">
      <div className="ims-landingpage-navbar-heading">
        <h2>InternMS</h2>
      </div>
      <div className="ims-landingpage-nav-buttons">
     
        <button className="ims-landingpage-login-btn"   onClick={() => navigate("/components-login/login")}>Login</button>
        <button className="ims-landingpage-register-btn"   onClick={() => navigate("/components-registration/welcome")}>Register</button>
      </div>
      </nav>



      <section className='ims-landingpage-dashboard'>

    <div className='ims-landingpage-leftbox'>

     <div className="ims-landingpage-hero-badge">

  <img src={nextgen} alt="NextGen" className="ims-landingpage-badge-icon" />
  <span>Next-Generation Placement OS</span>
</div>
    <h1>
      <span style={{color:"white"}}>Seamless</span> <br />
    <span style={{color:"white"}}>Internships.</span> <br />
     <span>Smarter</span><br />
    <span>Management.</span> <br />
     
   </h1>

    <p>
Bridging the gap between ambitious talent and global <br/>opportunities.
The definitive operating system for<br/> universities, students,
and world-class employers.
</p>

     <div className="ims-landingpage-buttons">
   <button className="ims-landingpage-start-btn">
  Get Started 
</button>

<button className="ims-landingpage-book-btn">
  Book a Demo
</button>
    </div>    
   </div> 
<div className="ims-landingpage-rightbox">
  <img src={imsdashboard} alt="Dashboard" />

  <div className="ims-landingpage-success-card">
    <img src={success} alt="Success" className="ims-landingpage-success-image" />

    <div className="ims-landingpage-success-text">
      <p>Success Rate</p>
      <h3>+24%Increase</h3>
    </div>
  </div>
</div>     
    </section>   


    <section className='ims-landing-status'>
    <div className="ims-landing-sts-box">
    <h2>500+</h2>
    <p>UNIVERSITIES</p>
     </div>

    <div className="ims-landing-sts-box">
    <h2>10k+</h2>
    <p> GLOBAL COMPANIES</p>
     </div>

 
 <div className="ims-landing-sts-box">
    <h2>1M+</h2>
    <p>PLACEMENTS</p>
     </div>
    </section>


    <section className="ims-landing-features">
  <h2 className="ims-landing-feature-heading">
    Engineered for Efficiency
  </h2>
<div className='ims-landing-features-link'>
  <p className='ims-landing-features-p'>Complex placement workflows simplified into an intuitive, high-speed <br />ecosystem designed for scale.</p>

  <a href="#">Explore all features
     <img  className='ims-landing-bluearrow' src={bluearrow} alt="arrow" /></a>
</div>
  <div className="ims-landing-feature-container">

    <div className="ims-landing-feature-card">
      <img src={automated} alt="automated" className="ims-landing-icon" />

      <h3>Automated Matching</h3>
      <p>Our AI-diven algorithm pairs candidates 
        <br /> with their ideal roles based on skills,
        <br />culture fit, and academic  requirements
      </p>
    </div>

    <div className="ims-landing-feature-card">
      <img src={realtime} alt="realtime" className="ims-landing-icon" />

      <h3>Real-time Tracking</h3>

    <p>
      Monitor progress from application to <br />
      final eveluation with granular <br />
      dashboards for all stakeholders.
    </p>
    </div>

    <div className="ims-landing-feature-card">
      <img src={secure} alt="secure" className="ims-landing-icon" />

      <h3>Secure Documents</h3>
<p>Enterprise-grade encryption for <br />
contracts, NDAs, and compliance <br />
certifications with automated <br />
reminders.
</p>
    </div>

  </div>

</section>




<section className="ims-landing-student">

  <div className="ims-landing-steps-container">
    <div className="ims-landing-step-card">

    <div>

      <h2 className="ims-landing-student-heading">
        For Students:
        <br />
        <span>Your Career Launchpad.</span>
      </h2>

      <div className="ims-landing-student-item">
        <div className="ims-landing-step-number"><img src={tick} alt="tick" /></div>

        <div>
          <h3>One-click Applications</h3>
          <p>
            Apply to top-tier firms instantly with your verified profile.
          </p>
        </div>
      </div>

      <div className="ims-landing-student-item">
        <div className="ims-landing-step-number"><img src={tick} alt="tick" /></div>

        <div>
          <h3>AI Career Coaching</h3>
          <p>
            Personalized insights to help you stand out and land the role.
          </p>
        </div>
      </div>

      <div className="ims-landing-student-item">
        <div className="ims-landing-step-number"><img src={tick} alt="tick" /></div>

        <div>
          <h3>Verified Credentials</h3>
          <p>
            A portable digital record of your internship success.
          </p>
        </div>
      </div>

      <div className="ims-landing-category-buttons">

  <button
    className={activeTab === "Students" ? "active" : ""}
    onClick={() => setActiveTab("Students")}
  >
    Students
  </button>

  <button
    className={activeTab === "Employers" ? "active" : ""}
    onClick={() => setActiveTab("Employers")}
  >
    Employers
  </button>

  <button
    className={activeTab === "Universities" ? "active" : ""}
    onClick={() => setActiveTab("Universities")}
  >
    Universities
  </button>

</div>

    </div>
    </div>
    <div>

    <div className="ims-landing-student-image-box">
      <img src={office} alt="Office" />
    </div>
</div>
  </div>

</section>



<footer className="ims-landing-footer">

      <div className="ims-landing-footer-top">

        <div className="ims-landing-footer-left">
          <h2>InternPulse</h2>

          <p>
            The ultimate platform for managing <br />
            internships, connecting talent, and <br />
            building the future of work.
          </p>

         <div className="ims-landing-footer-icons">
  <a href="#">
    <img src={global} alt="Global" />
  </a>

  <a href="#">
    <img src={mail} alt="Mail" />
  </a>
</div>
        </div>

        <div className="ims-landing-footer-links">

          <div className="ims-landing-footer-column">
            <h4>Product</h4>

            <a href="#">For Students</a>
            <a href="#">For Employers</a>
            <a href="#">For Universities</a>
            <a href="#">Pricing</a>
          </div>

          <div className="ims-landing-footer-column">
            <h4>Company</h4>

            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Resources</a>
            <a href="#">Contact Us</a>
          </div>

        </div>

      </div>

      <hr />

      <div className="ims-landing-footer-bottom">

        <p>&copy; 2024 InternMS. All rights reserved.</p>

        <p>
          Made with <img src={heart} alt="heart" /> for the future workforce
        </p>

      </div>

    </footer>

      

</div> 
    
  );
  
};