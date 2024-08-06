import React from 'react';
import '../homepage.css';
import { Link } from 'react-router-dom'; 

function HomePage() {
  return (
    <div  data-testid="background-container" style={{backgroundImage:"url('https://as1.ftcdn.net/v2/jpg/03/50/81/90/1000_F_350819076_VYSOrEOhrEFYiRLTEX4QPzYWyFKHOKgj.jpg')", height: "100vh",
      width:'100%',
      marginTop: "0px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      }}>
    <div className="container" style={{height:'100vh'}}>
      <div className="row">
        <div className="col-md-4 d-flex">
          <div className="buttons-container text-center">
            <div className="mb-2" style={{ minWidth: "200%" }}> 
              <Link to="/register">
                <button className="btn btn-warning btn-lg w-100">Create Account</button>
              </Link>
            </div>

            <div style={{ minWidth: "200%" }}> 
              <Link to="/login">
                <button className="btn btn-light btn-lg  w-100">Log In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;

    