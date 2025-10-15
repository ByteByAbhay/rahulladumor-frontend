import Icon from "components/AppIcon";

export default function Footer({ profileData }) {
  const personalInfo =
    {
      ...profileData?.personalInfo,
      ...profileData,
    } || {};
  const social = profileData?.social || {};
  const services = profileData?.services || [];
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Cloud" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{personalInfo.name}</h3>
                <p className="text-sm opacity-80">{personalInfo.title}</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              {personalInfo.tagline ||
                "Professional portfolio and consulting services"}
            </p>
            <div className="flex space-x-4">
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  aria-label="Visit LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors duration-200"
                >
                  <Icon name="Linkedin" size={20} />
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  aria-label="Visit GitHub profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors duration-200"
                >
                  <Icon name="Github" size={20} />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  aria-label="Visit Twitter profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors duration-200"
                >
                  <Icon name="Twitter" size={20} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {services.map((service) => (
                <li key={service.id}>{service.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>{personalInfo.email}</li>
              {personalInfo.phone && <li>{personalInfo.phone}</li>}
              <li>{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
