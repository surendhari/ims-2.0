import React , { useState }  from 'react'
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import welcome from "../assets/registration/welcome.png";
import auditsub from "../assets/registration/auditsub.png";
import auditmain from "../assets/registration/auditmain.png";
import author from "../assets/registration/author.png";
import dropdown from "../assets/registration/dropdown.png";

export const Welcome=()=> {
const navigate = useNavigate();

const roles = [
  "Intern",
  "Mentor",  
  "HR",
  "Company",
];


  const [selectedRole, setSelectedRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='ims-welcome-main-container'>
       <div className='ims-welcome-leftcontainer'>

        <div className='ims-welcome-titel'>
        <h4 className='ims-welcome-main-titel'> Welcome to your career <br />collaborative workspace.</h4>
        <p className='ims-welcome-sub-titel'> Join over 14,000+ ambitious students, corporate mentors, leading enterprises, and  <br />academic institutions shaping the future of workforce talent.</p>
        </div>


        <div  className='ims-welcome-illustration-container'>
         <img src={welcome} alt="Welocme-illustration" className='ims-welcome-illustration' />
         </div>


         <div className='ims-welcome-audit-main'>
        
        <div className='ims-welcome-audit'>
          <img src={auditsub} alt="ims-welcome-audit" className='ims-welcome-audit-image'/>
          <div className='ims-welcome-audit-text'>
          <p className='ims-welcome-audit-titel'>Unified Platform</p>
          <p className='ims-welcome-audit-subtitel'>Seamless identity, role-based workflows, and    organizational compliance</p>
          </div>
        </div>

           <div className='ims-welcome-audit'>
          <img src={auditmain} alt="ims-welcome-audit" className='ims-welcome-audit-image'/>
          <div className='ims-welcome-audit-text'>
          <p className='ims-welcome-audit-titel'>Enterprise Security</p>
          <p className='ims-welcome-audit-subtitel'>Zero-trust access with automated audit logs and real-time governance.</p>
          </div>
        </div>
          </div>

          <div className='ims-welcome-hr-div'>
            <hr/>
          </div>
         
          <p className='ims-welcome-para'>“Empowering our cross-functional teams with seamless access, verified identity governance, and <br />automated onboarding at global scale.”</p>
          
          <div className='ims-welcome-author'>
           <img src={author} alt="ims-welcome-author" className='ims-welcome-author-img' />
           <p className='ims-welcome-author-text'>Dr. Elena Vance — Dean of Experiential Education, Global University Network</p>
          </div>

      </div>
      <div className='ims-welcome-rightcontainer'> 
        <div className='ims-welcome-right-headingdiv'>
          <h4 className='ims-welcome-right-heading'>Your Journey Starts Here</h4>
          <p className='ims-welcome-right-subtitle'> Select your account type below to begin your tailored registration</p>
        </div>
        
        <div className="ims-welcome-registering-field">
      <label className="ims-welcome-registering-label">
        REGISTERING AS <span className='ims-welcome-dropdown-lable-star'>*</span>
      </label>

      <div className="ims-welcome-role-dropdown">
        <div
          className="ims-welcome-role-dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedRole ? "" : "role-placeholder"}>
            {selectedRole || "Select role"}
          </span>

          <span className={`role-arrow ${isOpen ? "open" : ""}`}>
             <img src={dropdown} alt="dropdown" className='ims-welcome-dropdown-img' />
          </span>
        </div>

        {isOpen && (
          <div className="ims-welcome-role-dropdown-menu">
          {roles.map((role) => (
  <div
    key={role}
    className={`ims-welcome-role-option ${
      selectedRole === role ? "selected" : ""
    }`}
    onClick={() => {
      setSelectedRole(role);
      setIsOpen(false);

      const roleRoutes = {
        Company: "/components-registration/CompanyRegistration",
        Intern:"/components-registration/InternRegistration",
        Mentor:"/components-registration/MentorRegistration",
        HR:"/components-registration/HrRegistration"
      };

      navigate(roleRoutes[role]);
    }}
  >
    {role}
  </div>
))}
          </div>
        )}
      </div>
    </div>
      </div>
    </div>
  )
}
