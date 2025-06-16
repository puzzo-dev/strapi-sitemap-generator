import React from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft, Briefcase, Mail, Phone, Linkedin, Twitter, Github, ArrowRight, Calendar, MapPin } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { useTeamMembers } from '@/hooks/useStrapiContent';
import { extendedTeamMembers } from '@/lib/data';
import { TeamMember as TeamMemberType, ExtendedTeamMember } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const TeamMemberPage: React.FC = () => {
  const [, params] = useRoute('/team/:id');
  const memberId = params?.id ? parseInt(params.id, 10) : -1;
  const { toast } = useToast();

  // Fetch team members from Strapi
  const { data: apiTeamMembers, isLoading, error } = useTeamMembers();

  // If there's an error loading from API, show a toast notification
  React.useEffect(() => {
    if (error) {
      toast({
        title: "API Data Unavailable",
        description: "Using local data as fallback.",
        variant: "default",
      });
    }
  }, [error, toast]);

  // Get base team member from API or fallback to local data
  const apiMember = apiTeamMembers?.find(member => member.id === memberId);

  // Get extended data from local data
  const extendedMemberData = extendedTeamMembers.find(member => member.id === memberId);

  // Combine API data with extended data, or just use extended data if API fails
  const member = apiMember
    ? { ...extendedMemberData, ...apiMember }
    : extendedMemberData;

  // Combine all team members (for related team members)
  const allTeamMembers = apiTeamMembers?.length
    ? apiTeamMembers.map(m => {
      const extended = extendedTeamMembers.find(ext => ext.id === m.id);
      return { ...extended, ...m };
    })
    : extendedTeamMembers;

  // Handle not found case
  if (!member) {
    return (
      <div className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Team Member Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The team member profile you're looking for doesn't exist or has been removed.</p>
            <Link href="/team">
              <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Team</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get related team members if they exist
  const relatedMembers = member.relatedTeamMembers
    ? member.relatedTeamMembers.map(id => allTeamMembers.find(m => m.id === id)).filter(Boolean)
    : allTeamMembers.filter(m => m.id !== member.id).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 border-b border-blue-100 dark:border-blue-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
        </div>

        <div className="container-custom relative z-10">
          <Link href="/team">
            <a className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Team</span>
            </a>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative w-48 h-48 md:w-full md:h-auto aspect-square mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white dark:border-[#132f4c] shadow-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-9 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h1>
              <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
                <Briefcase className="h-4 w-4 mr-2" />
                {member.role}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {member.expertise && member.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {member.socialMedia?.linkedin && (
                  <a
                    href={member.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}

                {member.socialMedia?.twitter && (
                  <a
                    href={member.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}

                {member.socialMedia?.github && (
                  <a
                    href={member.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Bio */}
              <div className="card p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About {member.name}</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300">
                  {member.bio?.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )) || (
                      <p className="text-gray-600 dark:text-gray-300">
                        {member.name} is an experienced {member.role?.toLowerCase() || member.position?.toLowerCase() || 'professional'} at I-VARSE Technologies
                        {member.expertise && member.expertise.length > 0 ? `, specializing in ${member.expertise.join(', ').toLowerCase()}.` : '.'}
                      </p>
                    )}
                </div>
              </div>

              {/* Projects */}
              {member.projects && member.projects.length > 0 && (
                <div className="card p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Key Projects</h2>
                  <div className="space-y-8">
                    {member.projects.map((project, index) => (
                      <div key={index} className="relative pl-8 border-l-2 border-blue-100 dark:border-blue-800">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">{project.year}</div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="card p-6 md:p-8 gradient-bg text-white">
                <h2 className="text-2xl font-bold mb-4">Work with {member.name?.split(' ')[0] || 'Our Team'}</h2>
                <p className="mb-6 text-white/90">
                  Interested in collaborating or have questions about our services? Reach out directly to discuss your project needs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <GradientButton href={`mailto:${member.email}`} variant="light" className="border border-white/20">
                    Send Email
                  </GradientButton>
                  <GradientButton href="/contact" variant="light" className="border border-white/20">
                    Contact Us
                  </GradientButton>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Info card */}
              <div className="card p-6 md:p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Details</h3>
                <div className="space-y-4">
                  {member.location && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</div>
                        <div className="text-gray-800 dark:text-white">{member.location}</div>
                      </div>
                    </div>
                  )}

                  {member.joinDate && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</div>
                        <div className="text-gray-800 dark:text-white">{member.joinDate}</div>
                      </div>
                    </div>
                  )}

                  {member.email && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Mail className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</div>
                        <div className="text-gray-800 dark:text-white">
                          <a href={`mailto:${member.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {member.phone && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Phone className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</div>
                        <div className="text-gray-800 dark:text-white">
                          <a href={`tel:${member.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {member.position && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Briefcase className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</div>
                        <div className="text-gray-800 dark:text-white">{member.position}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Expertise */}
              {member.expertise && member.expertise.length > 0 && (
                <div className="card p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Areas of Expertise</h3>
                  <ul className="space-y-2">
                    {member.expertise.map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600 dark:text-gray-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Team Members */}
      {relatedMembers && relatedMembers.length > 0 && (
        <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Meet More Team Members</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover other talented professionals who make our team exceptional.
              </p>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedMembers.map((relatedMember) => (
                <div key={relatedMember.id} className="card p-6 hover-lift group">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={relatedMember.image}
                        alt={relatedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{relatedMember.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{relatedMember.position || relatedMember.role}</p>
                    </div>
                  </div>

                  {relatedMember.expertise && relatedMember.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {relatedMember.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {relatedMember.expertise.length > 3 && (
                        <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300">
                          +{relatedMember.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <Link href={`/team/${relatedMember.id}`}>
                    <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                      <span>View Profile</span>
                      <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                    </a>
                  </Link>
                </div>
              ))}
            </div> */}

            <div className="mt-12 text-center">
              <GradientButton href="/team" variant="outline">
                View All Team Members
              </GradientButton>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 md:p-12 gradient-bg shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Work With Our Team?</h2>
            <p className="text-white/90 max-w-3xl mx-auto mb-8">
              Contact us today to discuss how our experts can help you achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" variant="light" className="border border-white/20">
                Get in Touch
              </GradientButton>
              <GradientButton href="/services" variant="light" className="border border-white/20">
                Explore Our Services
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamMemberPage;