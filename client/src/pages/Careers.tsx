import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  Users, 
  Award, 
  PieChart, 
  Heart,
  Coffee,
  Globe,
  Laptop
} from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

// Sample job listings
const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "We're looking for an experienced Full Stack Developer to lead our development team in creating robust software solutions.",
    responsibilities: [
      "Design and implement scalable web applications",
      "Lead technical architecture decisions",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product and design teams"
    ],
    requirements: [
      "5+ years of experience in full stack development",
      "Proficiency in React, Node.js, and modern JavaScript",
      "Experience with cloud infrastructure (AWS, Azure, or GCP)",
      "Strong problem-solving skills and attention to detail"
    ]
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Join our creative team as a UX/UI Designer to craft intuitive and engaging user experiences for our products.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation"
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools like Figma or Adobe XD",
      "Strong portfolio demonstrating user-centered design projects",
      "Understanding of accessibility and responsive design principles"
    ]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "We're seeking a DevOps Engineer to optimize our infrastructure and streamline our development workflows.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Manage cloud infrastructure and containerization",
      "Implement monitoring and logging solutions",
      "Automate deployment processes and infrastructure"
    ],
    requirements: [
      "3+ years of experience in DevOps or related field",
      "Experience with container orchestration (Kubernetes)",
      "Knowledge of infrastructure as code (Terraform, CloudFormation)",
      "Familiarity with monitoring tools and log management systems"
    ]
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Help drive our digital marketing efforts to increase brand awareness and generate leads for our business.",
    responsibilities: [
      "Develop and implement digital marketing strategies",
      "Manage social media presence and content calendar",
      "Create and optimize ad campaigns across platforms",
      "Analyze marketing metrics and provide actionable insights"
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Proficiency in SEO, SEM, and social media marketing",
      "Experience with marketing analytics tools",
      "Strong written and verbal communication skills"
    ]
  }
];

// Benefits data
const benefits = [
  {
    title: "Competitive Compensation",
    description: "We offer industry-leading salaries and comprehensive benefits packages.",
    icon: <PieChart className="h-6 w-6" />
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family.",
    icon: <Heart className="h-6 w-6" />
  },
  {
    title: "Remote-Friendly",
    description: "Flexible work arrangements including remote and hybrid options.",
    icon: <Laptop className="h-6 w-6" />
  },
  {
    title: "Professional Growth",
    description: "Continuous learning opportunities, conferences, and career development.",
    icon: <Award className="h-6 w-6" />
  },
  {
    title: "Work-Life Balance",
    description: "Generous paid time off, parental leave, and flexible schedules.",
    icon: <Coffee className="h-6 w-6" />
  },
  {
    title: "Global Impact",
    description: "Work on projects that make a real difference for clients worldwide.",
    icon: <Globe className="h-6 w-6" />
  }
];

const Careers: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
          
          {/* Tech pattern elements */}
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 border border-blue-200 dark:border-blue-800/50 rounded-lg rotate-12"></div>
          <div className="hidden md:block absolute bottom-20 left-1/4 w-20 h-20 border-2 border-blue-200 dark:border-blue-800/50 rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              Careers at I-VARSE
            </div>
            
            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join Our <span className="gradient-text">Innovative Team</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Be part of a dynamic team that's creating cutting-edge solutions and shaping the future of technology.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <GradientButton href="#open-positions" endIcon={<ChevronRight />}>
                View Open Positions
              </GradientButton>
              <GradientButton href="/contact" variant="outline">
                Contact Us
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
                <Users className="h-4 w-4 mr-2" />
                Why Join Us
              </div>
              <h2 className="heading-lg mb-6 text-gray-800 dark:text-white">Be Part of Something <span className="gradient-text">Extraordinary</span></h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                At I-VARSE, we're more than just a technology company – we're a community of passionate innovators dedicated to creating solutions that make a difference. We believe in fostering a culture of creativity, collaboration, and continuous growth.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our team members enjoy a supportive environment where their ideas are valued, their skills are nurtured, and their contributions are recognized. We're committed to diversity and inclusion, creating a workplace where everyone feels welcome and empowered to do their best work.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-md">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Excellence</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Committed to the highest standards in everything we do.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center shadow-md">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Collaboration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Working together to achieve remarkable results.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center shadow-md">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Innovation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Constantly pushing boundaries and exploring new ideas.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center shadow-md">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Integrity</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Honest and ethical in all our interactions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/50 h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="I-VARSE Team at Work" 
                  className="object-cover w-full h-full"
                />
                
                {/* Tech corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 dark:border-blue-500 z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 z-10"></div>
              </div>
              
              {/* Background tech elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-700/50 z-0"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 border border-blue-200 dark:border-blue-700/50 rounded-lg rotate-12 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Award className="h-4 w-4 mr-2" />
              Employee Benefits
            </div>
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              We believe in taking care of our team members with comprehensive benefits and perks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-8 hover-lift">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
              <Briefcase className="h-4 w-4 mr-2" />
              Current Opportunities
            </div>
            <h2 className="section-title">Open Positions</h2>
            <p className="section-subtitle">
              Explore our current job openings and find the perfect role to match your skills and ambitions.
            </p>
          </div>
          
          <div className="space-y-6">
            {jobListings.map(job => (
              <div key={job.id} className="card p-6 md:p-8 hover-lift">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Briefcase className="h-4 w-4 mr-1.5" />
                        {job.department}
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        {job.location}
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {job.type}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                              <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                              <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:ml-6 flex-shrink-0">
                    <GradientButton href={`/careers/${job.id}`} endIcon={<ArrowRight />}>
                      Apply Now
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Don't See the Right Fit?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. If you don't see a position that matches your skills but are interested in working with us, send us your resume!
            </p>
            <GradientButton href="/contact" variant="outline">
              Submit General Application
            </GradientButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0a1929] dark:to-[#091d3e]">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6 text-gray-800 dark:text-white">Ready to Join Our Team?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Take the next step in your career and be part of a team that's shaping the future of technology.
            </p>
            <GradientButton href="#open-positions" size="lg" endIcon={<ArrowRight />}>
              Explore Opportunities
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;