import React, { useState } from "react";
import Icon from "components/AppIcon";
import api from "utils/api/api";
import apiEndpoints from "utils/api/apiEndpoints";

const ContactSection = ({ profileData }) => {
  const personalInfo = profileData || {};
  const services = profileData?.services;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    customSubject: "",
    message: "",
    contactMethod: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const contactMethods = [
    {
      id: "email",
      name: "Email",
      icon: "Mail",
      value: personalInfo.email,
      description: "Best for detailed questions and project inquiries",
      responseTime: "24 hours",
    },
    personalInfo.social.linkedin && {
      id: "linkedin",
      name: "LinkedIn",
      icon: "Linkedin",
      value: personalInfo.social.linkedin.replace("https://", ""),
      description: "Professional networking and quick questions",
      responseTime: "48 hours",
    },
    personalInfo.phone && {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "MessageCircle",
      value: personalInfo.phone,
      description: "Urgent matters and quick consultations",
      responseTime: "4 hours",
    },
    {
      id: "calendly",
      name: "Schedule Call",
      icon: "Calendar",
      // value: "book-a-call",
      description: "Book a time that works for both of us",
      responseTime: "Immediate",
      onclick: () => {
        window.open(
          process.env.NEXT_PUBLIC_CALENDLY_URL ||
            "https://calendly.com/rahuldladumor/30min",
          "_blank"
        );
      },
    },
  ].filter(Boolean);

  const officeHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM IST" },
    { day: "Saturday", time: "10:00 AM - 2:00 PM IST" },
    { day: "Sunday", time: "Emergency only" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare the data to send to API
      const submitData = {
        name: formData.name,
        email: formData.email,
        subject:
          formData.subject === "other"
            ? formData.customSubject
            : formData.subject,
        message: formData.message,
        contactMethod: formData.contactMethod,
      };

      // Call the API
      const response = await api.post(apiEndpoints.contact, {
        data: submitData,
      });

      console.log("Contact form submitted successfully:", response);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitError(
        error?.message ||
          "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} color="#38A169" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Thank you for reaching out. I've received your message and will
              respond within 24 hours.
            </p>

            <div className="bg-surface rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-primary mb-4">
                What happens next?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <Icon
                    name="Clock"
                    size={16}
                    color="#38A169"
                    className="mt-1"
                  />
                  <span className="text-text-secondary">
                    I'll review your message and respond within 24 hours
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon
                    name="Mail"
                    size={16}
                    color="#38A169"
                    className="mt-1"
                  />
                  <span className="text-text-secondary">
                    You'll receive a detailed response at {formData.email}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon
                    name="Calendar"
                    size={16}
                    color="#38A169"
                    className="mt-1"
                  />
                  <span className="text-text-secondary">
                    If needed, I'll suggest a call to discuss further
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setSubmitError(null);
                setFormData({
                  name: "",
                  email: "",
                  subject: "",
                  customSubject: "",
                  message: "",
                  contactMethod: "email",
                });
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Icon name="RotateCcw" size={20} />
              <span>Send Another Message</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Let's Start the Conversation
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ready to optimize your AWS costs or accelerate your cloud career?
            Choose the best way to reach out and let's discuss your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Choose Your Preferred Method
              </h3>

              {contactMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    if (method.onclick) {
                      method.onclick();
                      return;
                    }
                    if (method.id === "email") {
                      window.location.href = `mailto:${method.value}`;
                    } else if (method.id === "linkedin") {
                      window.open(`https://${method.value}`, "_blank");
                    } else if (method.id === "whatsapp") {
                      window.open(
                        `https://wa.me/${method.value.replace(/\s/g, "")}`,
                        "_blank"
                      );
                    } else if (method.id === "calendly") {
                      const bookingSection = document.getElementById("booking");
                      if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-200">
                      <Icon
                        name={method.icon}
                        size={24}
                        color="#1B365D"
                        className="group-hover:text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-primary mb-2">
                        {method.name}
                      </h4>
                      <p className="text-accent font-medium mb-2">
                        {method.value}
                      </p>
                      <p className="text-text-secondary text-sm mb-3">
                        {method.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} color="#38A169" />
                        <span className="text-sm text-green-600 font-medium">
                          Response: {method.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Office Hours */}
              <div className="bg-white rounded-xl shadow-lg border border-border p-6">
                <h4 className="text-lg font-bold text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Clock" size={20} color="#1B365D" />
                  <span>Office Hours</span>
                </h4>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-text-secondary">
                        {schedule.day}
                      </span>
                      <span className="font-medium text-primary">
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary">
                    <Icon
                      name="MapPin"
                      size={14}
                      color="#4A5568"
                      className="inline mr-1"
                    />
                    Based in {personalInfo.location} ({personalInfo.timezone})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Send a Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Display */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <Icon
                      name="AlertCircle"
                      size={20}
                      color="#DC2626"
                      className="mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-red-800 font-semibold mb-1">
                        Error Sending Message
                      </h4>
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => {
                      handleInputChange("subject", e.target.value);
                      // Clear custom subject when switching away from "other"
                      if (e.target.value !== "other") {
                        handleInputChange("customSubject", "");
                      }
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                    required
                  >
                    <option value="">Select a subject</option>
                    {services?.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>

                  {/* Custom Subject Input - Only shown when "Other" is selected */}
                  {formData.subject === "other" && (
                    <div className="mt-3">
                      {/* <label htmlFor="customSubject" className="block text-sm font-medium text-text-primary mb-2">
                        Custom Subject *
                      </label> */}
                      <input
                        id="customSubject"
                        type="text"
                        value={formData.customSubject}
                        onChange={(e) =>
                          handleInputChange("customSubject", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                        placeholder="Please specify your subject"
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                    placeholder="Tell me about your AWS challenges, goals, or questions. The more details you provide, the better I can help you."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Preferred Response Method
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["email", "whatsapp", "linkedin", "call"].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.contactMethod === method
                            ? "border-accent bg-orange-50"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={formData.contactMethod === method}
                          onChange={(e) =>
                            handleInputChange("contactMethod", e.target.value)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-2 ${
                            formData.contactMethod === method
                              ? "border-accent bg-accent"
                              : "border-border"
                          }`}
                        >
                          {formData.contactMethod === method && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <span className="text-sm text-text-primary capitalize">
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? "bg-border text-text-secondary cursor-not-allowed"
                      : "bg-accent text-white hover:bg-orange-600 cta-shadow"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader" size={20} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Response Time Guarantee */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} color="#38A169" />
                  <span className="text-green-800 font-semibold text-sm">
                    Guaranteed response within 24 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center mt-16">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center justify-center space-x-2">
              <Icon name="AlertTriangle" size={24} color="#E53E3E" />
              <span>Emergency AWS Support</span>
            </h3>
            <p className="text-red-700 mb-4">
              Experiencing critical AWS issues affecting your production
              systems?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <Icon name="Phone" size={20} />
                  <span>Call: {personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`https://wa.me/${personalInfo.phone
                    .replace(/\s/g, "")
                    .replace("+", "")}`}
                  className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-200 inline-flex items-center space-x-2"
                >
                  <Icon name="MessageCircle" size={20} />
                  <span>WhatsApp Emergency</span>
                </a>
              )}
            </div>
            <p className="text-sm text-red-600 mt-4">
              Emergency support available 24/7 for existing clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
