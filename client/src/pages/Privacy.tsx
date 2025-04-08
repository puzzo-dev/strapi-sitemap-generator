import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';

const Privacy: React.FC = () => {
  return (
    <PolicyPageLayout
      title="Privacy Policy"
      slug="privacy"
      description="Learn how I-Varse Technologies collects, uses, and protects your personal information."
      fallbackContent={
        <>
          <h2>Introduction</h2>
          <p>
            At I-Varse Technologies, we respect your privacy and are committed to protecting the personal information 
            you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website or use our services.
          </p>
          
          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          
          <h3>Personal Information</h3>
          <ul>
            <li>Name, email address, phone number, and other contact details</li>
            <li>Company information if you're representing a business</li>
            <li>Information you provide when filling out forms on our website</li>
            <li>Records of correspondence if you contact us</li>
          </ul>
          
          <h3>Non-Personal Information</h3>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Referring website</li>
            <li>Pages visited on our website</li>
            <li>Time and date of your visit</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, maintaining, and improving our services</li>
            <li>Responding to your inquiries and fulfilling your requests</li>
            <li>Sending administrative information, such as updates or changes to our services</li>
            <li>Personalizing your experience on our website</li>
            <li>Conducting data analysis and research to improve our services</li>
            <li>Protecting our rights and preventing fraud</li>
            <li>Complying with legal obligations</li>
          </ul>
          
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities. 
            Cookies are small text files stored on your device that help us provide a better user experience. 
            You can generally set your browser to refuse cookies or alert you when cookies are being sent. 
            Please note that disabling cookies may affect some features of our website.
          </p>
          
          <h2>Data Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer, such as a merger or acquisition</li>
            <li>With your consent or at your direction</li>
          </ul>
          
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
            over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than the country in which you reside. 
            These countries may have data protection laws that differ from your country. By using our services, 
            you consent to the transfer of your information to countries outside your country of residence.
          </p>
          
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to rectify inaccurate information</li>
            <li>The right to erasure of your information</li>
            <li>The right to restrict processing of your information</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your information</li>
          </ul>
          
          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18, and we do not knowingly collect 
            personal information from children. If we learn that we have collected personal information from a child, 
            we will take steps to delete that information as quickly as possible.
          </p>
          
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <address>
            I-Varse Technologies<br />
            5 Adams Street, Off Nnamdi Rd,<br />
            Surulere, Lagos, Nigeria<br />
            Email: privacy@ivarse.com<br />
            Phone: +234 123 456 7890
          </address>
          
          <p><strong>Last Updated:</strong> April 2023</p>
        </>
      }
    />
  );
};

export default Privacy;