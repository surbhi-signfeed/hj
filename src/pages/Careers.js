import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomInput from '../component/CustomInput'

import 'react-phone-input-2/lib/style.css';
import Footer from '../component/Footer'
import '../css/Careers.css'
// Initialization for ES Users
import { Input, initMDB } from 'mdb-ui-kit';
import FilterNav from '../component/FilterNav';
import NavToAll from '../component/NavToAll';
import { HiArrowUpRight } from "react-icons/hi2";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../LanguageContext';


const Career = () => {
  const { language, translations, updateTranslations } = useLanguage();
  initMDB({ Input });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner/logo


    if (!name || !phone || !email || !file) {
      Swal.fire({
        title: 'warning',
        text: 'Please fill all fields and select a file.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });

      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('image', file);
   
    try {
      const response = await axios.post('http://localhost:4000/api/career', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // alert(response.data.message);
      Swal.fire({
        title: 'Success',
        text: 'Form submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error submitting form',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }finally {
      setLoading(false); // Hide loading spinner/logo
    }
    
  };
  console.log("formData",name,phone,email,file)

  const textKeys = {
    careerp1: 'careerp1',
    careerp2: 'careerp2',
    careerp3:'careerp3',
    careerh:'careerh',
    careerhp:'careerhp',
    careercv:'careercv',
    careerWhy:'careerWhy',
    careerTr:'careerTr,',
    careerp5:'careerp5',
    careerwork:'careerwork',
    careerworkp:'careerworkp',
    careeratt:'careeratt',
    careerattp:'careerattp',
    careercomp:'careercomp',
    careercompdsc:'careercompdsc',
    careerHead:'careerHead',
    careerHeadp:'careerHeadp',
    careerHeadp2:'careerHeadp2',
    careersend:'careersend',
    careersendp:'careersendp',
    choseFile:'choseFile',
    submint:'submint',
    name:'name',
    email:'email',
    phone:'phone',  };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.careerp1, 'The real estate market offers boundless job opportunities to make your career in it. Inside this sector, the property management jobs hold a lot of worth and progression chances. You can join HJ Real Estates to kickstart your career in various sectors of the real estate market.'); 
    updateTranslations(textKeys.careerp2, 'HJ Real Estates has made a remarkable presence felt in Dubai’s dynamic real estate sector. We are among the top recruiters from the real estate sector, having 100+ human resources working for us to deliver excellence and satisfaction. Also, we are actively looking for individuals who can contribute to taking HJ Real Estates’ brand success to new heights.');
    updateTranslations(textKeys.careerp3, '   We are looking for dedicated, ambitious, and passionate individuals with a keen interest in real estate to join our team and be part of our exciting journey.');
    updateTranslations(textKeys.careerh, 'Ready to take your real estate career to new heights?'); 
    updateTranslations(textKeys.careerhp, 'Speak with one of our team'); 
    updateTranslations(textKeys.careercv, 'Submit your CV'); 
    updateTranslations(textKeys.careerWhy, 'Why Choose HJ Real Estates?');   
    updateTranslations(textKeys.careerTr, 'Training Excellence');
    updateTranslations(textKeys.careerp5, '  At HJ Real Estates, we offer professional training to our joiners. We invest time and effort to help them be the best in the real estate market.');
    updateTranslations(textKeys.careerwork, ' Work-life Balance.');

    updateTranslations(textKeys.careerworkp, '  At HJ Real Estates, we prioritize work-life balance. We create a mutual community for our team by organizing in-house cultural events to unwind and recharge. Enjoy career progression and empower yourself in a dynamic atmosphere.');

    updateTranslations(textKeys.careeratt, 'Attractive Incentives');
    updateTranslations(textKeys.careerattp, '    HJ Real Estates offers incentive programs to our staff to encourage and reward them for their hard work and dedication. From performance bonuses to professional development opportunities, we empower our team to reach new heights.');
    updateTranslations(textKeys.careercomp, '  Competitive Commission Structure');
    updateTranslations(textKeys.careercompdsc, '     HJ Real Estates supports a forward-thinking approach with our dynamic profit-sharing model for our executives on achieving the set targets. Earn commission on prosperity you create.');
    updateTranslations(textKeys.careerHead, '    Be A Part of Growth');
    updateTranslations(textKeys.careerHeadp, '    HJ Real Estates offers various real estate services, including sales, leasing, currency, property management, conveyancing, mortgage advice, short-term rentals, and more. If you want a fulfilling career that rewards professional growth and good money, your search ends with us.');
    updateTranslations(textKeys.careerHeadp2, '    HJ Real Estates values each team member as a cherished part of our extended family. We prioritize personality and expertise in our recruitment process, allowing you to deal with Dubai’s maximum properties at the best locations.');
    updateTranslations(textKeys.careersend, 'SEND RESUME'); 
    updateTranslations(textKeys.choseFile, ' Choose file'); 
    updateTranslations(textKeys.submint, 'Submit'); 
    updateTranslations(textKeys.name, 'Enter Name'); 
    updateTranslations(textKeys.email, 'Enter Email'); 
    updateTranslations(textKeys.phone, 'Enter Phone'); 
    updateTranslations(textKeys.careersendp, 'Let Us Know About Your Experience With Us');
   
    // updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
}, [language, updateTranslations]);

  return (
    <div>
       <Helmet>
      <title>Career at HJ Real Estates</title>
      <meta name="title" content="Rewarding Careers And Exciting Job Opportunities | HJ Real Estates" />
        <meta name="description" content="Take your career to the next level with HJ Real Estates. Explore exciting job opportunities in India and Dubai and take the first step towards a rewarding real estate career with us." />
        <meta name="keywords" content="Career" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
    <NavToAll/>
    <div className='container'>
  <div className='row mt-5 mb-5'>
    <div className='col-12 col-md-7'>
      <p className='Careers-p'>
      {translations[textKeys.careerp1] || 'Loading...'} 
      </p>
      <br />
      <p className='Careers-p'>
      {translations[textKeys.careerp2] || 'Loading...'}     
      </p>
      <br />
      <p className='Careers-p'>
      {translations[textKeys.careerp3] || 'Loading...'}  
      </p>
    </div>
    <div className='col-12 col-md-5 mt-5'>
      <h4 class="career-h">  {translations[textKeys.careerh] || 'Loading...'}</h4>
      <p className='mt-3 Careers-p'>{translations[textKeys.careerhp] || 'Loading...'}</p>
      <button
        type='button'
        className='btn btn-primary btn-rounded mt-3'
        style={{ backgroundColor: '#16248c' }}
        data-mdb-ripple-init
      >
       {translations[textKeys.careercv] || 'Loading...'} <HiArrowUpRight/>
      </button>
    </div>
  </div>

  <div className='row mt-5'>
    <div className='col-12'>
      <h1 className='career-h2'>  {translations[textKeys.careerWhy] || 'Loading...'}</h1>
    </div>
    <div className='col-12 col-sm-6 col-md-3'>
      <div className='card img-fluid' style={{ width: '100%', border: 'none' }}>
        <img
          src='https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-career-training.jpg'
          className='card-img-career'
          alt='Training Excellence'
        />
        <div className='card-body'>
          <h4 className='card-title mt-3 career-h'>  {translations[textKeys.careerTr] || 'Loading...'}</h4>
          <p className='mt-1 Careers-p'>
          {translations[textKeys.careerp5] || 'Loading...'} </p>
        </div>
      </div>
    </div>
    <div className='col-12 col-sm-6 col-md-3'>
      <div className='card img-fluid' style={{ width: '100%', border: 'none' }}>
        <img
          src='https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-career-culture.jpg'
          className='card-img-career'
          alt='Work-life Balance'
        />
        <div className='card-body'>
          <h4 className='card-title mt-3 career-h'>         {translations[textKeys.careerwork] || 'Loading...'} </h4>
          <p className='mt-1 Careers-p'>
          {translations[textKeys.careerworkp] || 'Loading...'}
          </p>
        </div>
      </div>
    </div>
    <div className='col-12 col-sm-6 col-md-3'>
      <div className='card' style={{ width: '100%', border: 'none' }}>
        <img
          src='https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-career-incentives.jpg'
          className='card-img-career'
          alt='Attractive Incentives'
        />
        <div className='card-body'>
          <h4 className='card-title mt-3 career-h'>  {translations[textKeys.careeratt] || 'Loading...'}</h4>
          <p className='mt-1 Careers-p'>
          {translations[textKeys.careerattp] || 'Loading...'} 
          </p>
        </div>
      </div>
    </div>
    <div className='col-12 col-sm-6 col-md-3'>
      <div className='card' style={{ width: '100%', border: 'none' }}>
        <img
          src='https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-career-commision.jpg'
          className='card-img-career'
          alt='Competitive Commission Structure'
        />
        <div className='card-body'>
          <h4 className='card-title mt-3 career-h'>  {translations[textKeys.careercomp] || 'Loading...'} </h4>
          <p className='mt-1 Careers-p'>
          {translations[textKeys.careercompdsc] || 'Loading...'}  
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className='row mt-5'>
    <div className='col-12 col-md-2'>
      <h3 className='career-h' >   {translations[textKeys.careerHead] || 'Loading...'}  </h3>
    </div>
    <div className='col-12 col-md-10'>
      <p className='Careers-p'>
      {translations[textKeys.careerHeadp] || 'Loading...'} 
      </p>
      <p className='Careers-p'>
      {translations[textKeys.careerHeadp2] || 'Loading...'}  
      </p>
    </div>
  </div>

  <form onSubmit={handleSubmit} className='row mt-5 shadow-sm' style={{ borderRadius: "10px", border: "none" }}>
    <div className='col-md-12 mt-5'>
      <h4 className='text-center' style={{color:"black"}}>    {translations[textKeys.careersend] || 'Loading...'}</h4>
      <p className='text-center Careers-p'>  {translations[textKeys.careersendp] || 'Loading...'}</p>
    </div>
    <div className='col-md-4 mt-4'>
      <CustomInput id="name" label={translations[textKeys.name] || 'Loading...'} value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className='col-md-4 mt-4'>
      <CustomInput id="mobile" label={translations[textKeys.phone] || 'Loading...'} value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
    <div className='col-md-4 mt-4'>
      <CustomInput id="email" label={translations[textKeys.email] || 'Loading...'} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className='col-md-12 mt-3 col-12'>
      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange}  />
      <label className="custom-file-label" htmlFor="customFile">{translations[textKeys.choseFile] || 'Loading...'}</label>
    </div>
    <center>    <div className='col-md-12 mb-5 mt-5'>
      <button type="submit" className="btn btn-primary col-md-12" style={{ backgroundColor: '#16248c' }}id='careersubmit'>{translations[textKeys.submint] || 'Loading...'}</button>
    </div></center>

  </form>
  {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}
</div>

<br/><br/>
   
      <Footer/>
    </div>
  );
};

export default Career;
const styles = {
 
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  
  loadingLogo: {
   
    width: '320px',
    height: '320px',
    alignItems: 'center',
  },
 

};