import Icon from "components/AppIcon";

export default function ExperienceEducation({ profileData }) {
  const recentRoles = Array.isArray(profileData?.workExperience)
    ? profileData?.workExperience.slice(0, 3)
    : [];

  const education = profileData?.education;
  console.log(education, profileData);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
              <Icon name="Briefcase" size={20} color="#1B365D" />
              <span>Recent Roles</span>
            </h3>
            <div className="space-y-5">
              {recentRoles.map((role, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-4">
                  <div className="font-semibold text-primary">
                    {role.position} • {role.company}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {role.duration} • {role.location}
                  </div>
                </div>
              ))}
              {recentRoles.length === 0 && (
                <div className="text-text-secondary">
                  Experience details coming soon.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
              <Icon name="GraduationCap" size={20} color="#1B365D" />
              <span>Education</span>
            </h3>
            <div className="space-y-5">
              {education?.map((ed, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4">
                  <div className="font-semibold text-primary">{ed.degree}</div>
                  <div className="text-sm text-text-secondary">
                    {ed.institution}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {ed.year}
                    {ed.location ? ` • ${ed.location}` : ""}
                  </div>
                </div>
              ))}
              {(!education || education.length === 0) && (
                <div className="text-text-secondary">
                  Education details coming soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
