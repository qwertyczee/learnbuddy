import React from 'react';
import style from './privacy-policy.module.scss';

const PrivacyPolicy = () => {
  return (
    <div className={style.privacy_policy}>
      <h1>Privacy Policy</h1>
      <p>
        Welcome to our Privacy Policy page. We value your privacy and strive to protect your personal information.
      </p>
      
      <h2>1. Information We Collect</h2>
      <p>
        We collect various types of information in order to provide our services to you. This includes:
        <ul>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Usage data (e.g., how you interact with our website)</li>
          <li>Cookies and tracking data</li>
        </ul>
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        The information we collect is used for:
        <ul>
          <li>Providing and maintaining our services</li>
          <li>Notifying you about changes to our services</li>
          <li>Providing customer support</li>
          <li>Monitoring the usage of our services</li>
          <li>Detecting, preventing, and addressing technical issues</li>
        </ul>
      </p>

      <h2>3. Your Data Protection Rights</h2>
      <p>
        You have the following data protection rights:
        <ul>
          <li>The right to access, update, or delete the information we have on you</li>
          <li>The right of rectification</li>
          <li>The right to object</li>
          <li>The right of restriction</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>
      </p>

      <h2>4. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:
        <ul>
          <li>Email: support@example.com</li>
          <li>Phone: +1 234 567 890</li>
        </ul>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
