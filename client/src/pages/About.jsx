import './About.css' 
import Navbar from '../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom';
  
export default function About() {
  const navigate = useNavigate(); 
  return (
    <div className="about-page"> 
      <Navbar />
      <div className="about-wrapper">
        <div className="about-content">
        <h1>About Task Manager</h1>
        <p className="subtitle">
          Task Manager helps students keep track of coursework, deadlines, and group projects in one place. 
          Add a task, mark it done when it's finished, and edit the details whenever your plans change.</p>
         
        <p className="subtitle">
          The app is built on the MERN stack — MongoDB for storing tasks and accounts, 
          Express and Node for the server, and React for the interface you interact with.</p>

        <p className="subtitle">
          Every account has a role, either admin or employee, which controls what a person can manage inside a shared workspace. 
          Instead of uploading a photo, each person is shown as a colored circle with their initials, 
          like the "JD" badge you'll see next to Jordan Diaz's tasks.
        </p>

        <div className="about-features">
          <h2>What you can do</h2>
          <ul>
            <li>✅Add, edit, and delete tasks in a few taps</li>
            <li>✅ Mark tasks done and see your progress at a glance</li>
            <li>✅ Sign up with a work or school email and set a department and job title</li>
            <li>✅ Switch between light and dark mode automatically based on your device</li>
          
          </ul>
        </div>

        <p className="footer-text">
          Built with React + Express + MongoDB 🚀
        </p>

        <button
          type="button"
          className="Home-button"
          onClick={() => navigate('/')}
        >
          Go To Home
        </button>
        </div>
      </div>
    </div>
  )
}

