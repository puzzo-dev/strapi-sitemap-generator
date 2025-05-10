import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';

const Cookies: React.FC = () => {
  return (
    <PolicyPageLayout
      title="Cookie Policy"
      slug="cookies"
      description="Information about how I-Varse Technologies uses cookies and similar technologies on our website."
      fallbackContent={
        <>
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to
            the website owners. Cookies can be "persistent" cookies that remain on your device until
            they expire or are deleted, or "session" cookies that are deleted when you close your browser.
          </p>

          <h2>How We Use Cookies</h2>
          <p>
            I-Varse Technologies uses cookies for various purposes, including:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be turned off in our systems. They are usually only set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.</li>
            <li><strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</li>
            <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
            <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</li>
          </ul>

          <h2>Specific Cookies We Use</h2>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Cookie Name</th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Purpose</th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">_ga</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Used by Google Analytics to distinguish users</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">2 years</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">_gid</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Used by Google Analytics to distinguish users</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">24 hours</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">_gat</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Used by Google Analytics to throttle request rate</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">1 minute</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">ivarse_session</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Used to maintain your session on our website</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Session</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">theme_preference</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Used to remember your light/dark mode preference</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">language_preference</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Used to remember your language preference</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
              </tr>
            </tbody>
          </table>

          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on and through the website. Some common third-party services we may use include:
          </p>
          <ul>
            <li>Google Analytics</li>
            <li>Google AdSense</li>
            <li>Facebook Pixel</li>
            <li>LinkedIn Insight Tag</li>
            <li>HubSpot</li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
          </p>

          <h3>How to manage cookies in your browser:</h3>
          <ul>
            <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
            <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
            <li><strong>Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
          </ul>

          <h2>Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
          </p>
          <address>
            I-Varse Technologies<br />
            4 Adana Street, Off Tejuosho Rd,<br />
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

export default Cookies;