import React from 'react';
import PolicyPageLayout from '@/components/layout/PolicyPageLayout';

const Accessibility: React.FC = () => {
  return (
    <PolicyPageLayout
      title="Accessibility Statement"
      slug="accessibility"
      description="Learn about I-Varse Technologies' commitment to making our website accessible to all users."
      fallbackContent={
        <>
          <h2>Our Commitment to Accessibility</h2>
          <p>
            I-Varse Technologies is committed to ensuring digital accessibility for people with disabilities.
            We are continuously improving the user experience for everyone and applying the relevant accessibility
            standards to achieve this.
          </p>

          <h2>Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to
            improve accessibility for people with disabilities. It defines three levels of conformance: Level A,
            Level AA, and Level AAA.
          </p>
          <p>
            The I-Varse Technologies website is partially conformant with WCAG 2.1 level AA. Partially conformant
            means that some parts of the content do not fully conform to the accessibility standard.
          </p>

          <h2>Accessibility Features</h2>
          <p>
            The I-Varse Technologies website includes the following accessibility features:
          </p>
          <ul>
            <li>Semantic HTML structure with appropriate headings and landmarks for screen reader navigation</li>
            <li>Keyboard accessibility for all interactive elements</li>
            <li>Sufficient color contrast for text and interface components</li>
            <li>Text resizing without loss of content or functionality</li>
            <li>Alternative text for images</li>
            <li>Dark mode for reduced eye strain and improved readability</li>
            <li>Focus indicators for keyboard navigation</li>
            <li>Skip to content link</li>
            <li>ARIA attributes where appropriate</li>
          </ul>

          <h2>Accessibility Limitations</h2>
          <p>
            Despite our best efforts, there may be some aspects of our website that are not fully accessible:
          </p>
          <ul>
            <li>Some older content may not yet be fully accessible</li>
            <li>Some third-party content or functionality may not be fully accessible</li>
            <li>Some interactive elements may not be fully accessible via keyboard navigation</li>
          </ul>

          <h2>Feedback and Contact Information</h2>
          <p>
            We welcome your feedback on the accessibility of the I-Varse Technologies website. Please let us know if you encounter any accessibility barriers:
          </p>
          <ul>
            <li>Email: accessibility@ivarse.com</li>
            <li>Phone: +234 123 456 7890</li>
            <li>Postal Address: 4 Adana Street, Off Tejuosho Rd, Surulere, Lagos, Nigeria</li>
          </ul>
          <p>
            We try to respond to feedback within 3 business days.
          </p>

          <h2>Assessment Approach</h2>
          <p>
            I-Varse Technologies has assessed the accessibility of its website by the following approaches:
          </p>
          <ul>
            <li>Self-evaluation using automated testing tools</li>
            <li>Manual testing with assistive technologies</li>
            <li>Testing with users with disabilities</li>
          </ul>

          <h2>Technical Specifications</h2>
          <p>
            Accessibility of the I-Varse Technologies website relies on the following technologies:
          </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>WAI-ARIA</li>
            <li>SVG</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the accessibility standards used.
          </p>

          <h2>Browser and Assistive Technology Compatibility</h2>
          <p>
            The I-Varse Technologies website is designed to be compatible with the following assistive technologies:
          </p>
          <ul>
            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
            <li>Zoom and magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
          <p>
            The website is designed to be compatible with the following browsers:
          </p>
          <ul>
            <li>Google Chrome (latest 2 versions)</li>
            <li>Mozilla Firefox (latest 2 versions)</li>
            <li>Apple Safari (latest 2 versions)</li>
            <li>Microsoft Edge (latest 2 versions)</li>
          </ul>

          <h2>Measures to Support Accessibility</h2>
          <p>
            I-Varse Technologies takes the following measures to ensure accessibility of its website:
          </p>
          <ul>
            <li>Include accessibility as part of our mission statement</li>
            <li>Include accessibility throughout our internal policies</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Provide accessibility training for our staff</li>
            <li>Assign clear accessibility goals and responsibilities</li>
            <li>Employ formal accessibility quality assurance methods</li>
          </ul>

          <h2>Legal Compliance</h2>
          <p>
            This statement was created on April 8, 2023, using the W3C Accessibility Statement Generator Tool.
          </p>
        </>
      }
    />
  );
};

export default Accessibility;