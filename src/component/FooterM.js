import React from 'react';
import '../css/Footerm.css';

const Footer = () => {
  return (
    <div className='footer-mm'>
      <div className="row justify-content-center">
        <div className="col-md-1 col-sm-0"></div>
        <div className="col-md-2 col-sm-6 mt-5">
          <h6>Features</h6>
          <p>Spark overview</p>
          <p>Beta access</p>
          <p>Main features</p>
        </div>
        <div className="col-md-2 col-sm-6 mt-5">
          <h6>Solutions</h6>
          <p>Collaboration</p>
          <p>Engagement</p>
          <p>Performance</p>
        </div>
        <div className="col-md-2 col-sm-6 mt-5">
          <h6>Menu category</h6>
          <p>Menu title</p>
          <p>Menu title</p>
        </div>
        <div className="col-md-2 col-sm-6 mt-5">
          <h6>Company</h6>
          <p>About Us</p>
          <p>Meet the Team</p>
          <p>Careers</p>
        </div>
        <div className="col-md-1 col-sm-0"></div>
      </div>

      <div className='row mt-5'>
        <div className='col-md-2 col-sm-0'></div>
        <div className='col-md-8 col-sm-12 footer-div'>
          <div className='row'>
            <div className='col-md-2 col-sm-6'>
              <img src='https://assets-global.website-files.com/64dabc5b090c45649a7f7127/64eda98950cef61635936c2a_Footer%20Logo.svg' alt='...' className='footer-logo'></img>
            </div>
            <div className='col-md-4 col-sm-6 footerm-social'>
              {/* Social icons here */}
            </div>
            <div className='col-md-6 col-sm-12'>
              <h4 className='mb-3'>Subscribe to our newsletter</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <p className='mt-3 footer-p2'>Spark is an advanced analytics tool providing insights into team performance, engagement, and satisfaction.</p>
            </div>
            <div className='col-md-6 col-sm-12 mt-3'>
              <input type='text' className='footer-text-input' placeholder='ENTER YOUR EMAIL'></input> &nbsp;
              <button type="button" className="btn-dark footer-buttonl">Get Started</button>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-md-2 col-sm-4'><p>Terms of use</p></div>
            <div className='col-md-2 col-sm-4'><p>Users Privacy</p></div>
            <div className='col-md-2 col-sm-4'><p>Help and Support</p></div>
            <div className='col-md-6 col-sm-12' style={{ paddingLeft: "20px" }}>
              <div className="form-check">
                <input className="form-check-input small-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  I agree with Terms and Conditions
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-2 col-sm-0'></div>
      </div>

      <div className='row mt-3'>
        <div className='col-md-2 col-sm-0'> </div>
        <div className='col-md-8 col-sm-12'>
          <p className='footer-p'>©2023; Spark is an advanced analytics tool providing insights into team performance, engagement, and satisfaction. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        <div className='col-md-2 col-sm-0'> </div>
      </div>
      <div className='footer-last'></div>
    </div>
  )
}

export default Footer;
