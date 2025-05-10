import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';

const Terms: React.FC = () => {
  return (
    <PolicyPageLayout
      title="Terms of Service"
      slug="terms"
      description="Read the terms and conditions governing the use of I-Varse Technologies' website and services."
      fallbackContent={
        <>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the I-Varse Technologies website and services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service. These terms constitute a legal agreement
            between you and I-Varse Technologies.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            I-Varse Technologies provides various digital services including but not limited to web development,
            mobile application development, cloud infrastructure management, API programming & integration,
            SEO optimization, and content writing. The specific details, deliverables, and timelines of these
            services will be outlined in individual agreements or statements of work.
          </p>

          <h2>3. User Conduct</h2>
          <p>
            When using our website and services, you agree to:
          </p>
          <ul>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the intellectual property rights of I-Varse Technologies and third parties</li>
            <li>Provide accurate and complete information when submitting forms or communicating with us</li>
            <li>Not use our services for any illegal or unauthorized purpose</li>
            <li>Not attempt to compromise the security or integrity of our systems</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on the I-Varse Technologies website, including text, graphics, logos, icons, images, audio,
            and software, is the property of I-Varse Technologies or its content suppliers and is protected by
            international copyright laws. The compilation of content on this website is the exclusive property
            of I-Varse Technologies and is protected by international copyright laws.
          </p>

          <h2>5. Privacy Policy</h2>
          <p>
            Our Privacy Policy, which outlines how we collect, use, and protect your personal information,
            is incorporated into these Terms of Service. By using our services, you also agree to the terms
            of our Privacy Policy.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, I-Varse Technologies shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses,
            resulting from your access to or use of or inability to access or use the services.
          </p>

          <h2>7. Modifications to Terms</h2>
          <p>
            I-Varse Technologies reserves the right to modify these Terms of Service at any time. We will provide
            notice of significant changes by posting a prominent notice on our website. Your continued use of our
            services after such modifications constitutes your acceptance of the revised terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of Nigeria,
            without regard to its conflict of law provisions.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <address>
            I-Varse Technologies<br />
            4 Adana Street, Off Tejuosho Rd,<br />
            Surulere, Lagos, Nigeria<br />
            Email: info@ivarse.com<br />
            Phone: +234 123 456 7890
          </address>

          <p><strong>Last Updated:</strong> April 2023</p>
        </>
      }
    />
  );
};

export default Terms;