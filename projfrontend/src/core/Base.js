import React from "react";
import Nav from "./nav";
// TODO: Change image src
import logo from './logo.svg';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children
}) => {
  return (
    <div>
      <Nav></Nav>
      <div className='contain-fluid'>
        <div className=' jumbotron bg-dark text-white text-center'>
          <h2 className='display-6 mt-2'>{title}</h2>
          <p className='lead'>{description}</p>
        </div>
        <div className={className} style={{minHeight: '75vh'}}>{children}</div>
      </div>
      <div>
        <footer className='footer bg-dark mt-auto py-3 text-white'>
          <div className="container-fluid d-flex  justify-content-between">
            <div>
            <Link
            
            to='/'
          ><img src={logo} width={20}/></Link>  &nbsp;&nbsp;
          <a href="#" style={{textDecoration: 'None'}}>Who We Are</a>&nbsp;&nbsp;&nbsp;
          <a href="#" style={{textDecoration: 'None'}}>Contact Us</a>
            </div>
          
          </div>
          <hr className="bg-white m-2" />
          <div className='container-fluid '>
            <span className='text-muted '>
            <Link
            
            to='/'
          ><img src={logo} width={20}/></Link> Copyright &copy; 2023 AllAboutFly All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Base;
