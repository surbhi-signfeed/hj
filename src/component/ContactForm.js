import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Swal from 'sweetalert2';
import '../css/Contactus.css';

const ContactForm = ({ title }) => {
  const [rtitle, setRtitle] = useState(title);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    setRtitle(title);
  }, [title]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      propertyName: '',
      msg: '',
    },
    
    onSubmit: async (values) => {
      setLoading(true); // Show loading spinner/logo

      try {
        const response = await fetch('http://localhost:4000/api/offplanForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          Swal.fire({
            title: 'Success',
            text: 'Form submitted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          const errorData = await response.json();
          Swal.fire({
            title: 'Error',
            text: `Error: ${errorData.error}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error submitting form',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      finally {
        setLoading(false); // Hide loading spinner/logo
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('propertyName', rtitle);
  }, [rtitle]);

  return (
    <div className="cont">
      <div className="contact-box">
        <div className="left"></div>
        <div className="right">
          <h2 id="h2">Schedule a Tour</h2>
          <p id="p">DON’T MISS THE PROPERTY TOUR</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Enter Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <PhoneInput
                country={'us'}
                className="PhoneInput"
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue('phone', phone)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="msg">Enter your Message</label>
              <textarea
                id="msg"
                name="msg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.msg}
              />
            </div>
            <button type="submit" id="submitb">
              Submit
            </button>
          </form>
        </div>
      </div>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
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