import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import { useRouter } from "next/navigation";
import { personalInfo } from "config/personalInfo";

const FAQSection = ({ isAdmin = false }) => {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [faqList, setFaqList] = useState([]);

  const initialFaqs = [
    {
      id: 1,
      category: "General",
      question: "How quickly can you help reduce our AWS costs?",
      answer: `Most clients see immediate cost reductions within the first week of our engagement. Quick wins like right-sizing instances, eliminating unused resources, and optimizing storage can deliver 20-30% savings immediately.

For comprehensive optimization including reserved instances, auto-scaling, and architectural improvements, expect 30-50% cost reduction within 4-6 weeks. The exact timeline depends on your current setup complexity and team availability for implementation.`,
      // videoUrl: "https://example.com/cost-optimization-video",
    },
    {
      id: 2,
      category: "Services",
      question: "What's included in the monthly mentorship program?",
      answer: `The monthly mentorship program includes:

• 4 weekly 1-on-1 sessions (1 hour each) via video call
• Personalized learning roadmap based on your career goals
• Hands-on project guidance and code reviews
• Resume optimization and interview preparation
• Industry networking opportunities and job referrals
• 24/7 Slack/WhatsApp support for quick questions
• Monthly progress tracking and goal adjustment
• Access to exclusive resources and templates

Each session is recorded for your reference, and I provide detailed action items after every call.`,
      // videoUrl: "https://example.com/mentorship-overview-video",
    },
    {
      id: 3,
      category: "Pricing",
      question: "Do you offer payment plans or flexible pricing?",
      answer: `Yes, I understand that different organizations have different budget constraints:

**For Individuals (Mentorship):**
• Monthly payments (₹8,000/month)
• Quarterly discount (₹21,000 for 3 months - save ₹3,000)
• Annual discount (₹80,000 for 12 months - save ₹16,000)

**For Companies (Consulting):**
• Milestone-based payments for enterprise projects
• Retainer arrangements for ongoing support
• Success-based pricing for cost optimization (you pay a percentage of savings achieved)

All payments can be made via UPI, bank transfer, or international wire transfer. I also accept USD payments for global clients.`,
      videoUrl: null,
    },
    {
      id: 4,
      category: "Results",
      question: "What if I don't see the promised results?",
      answer: `I stand behind my work with a comprehensive satisfaction guarantee:

**30-Day Money-Back Guarantee:** If you're not completely satisfied with the results within the first 30 days, I'll refund your investment completely.

**Cost Optimization Guarantee:** For enterprise consulting, I guarantee at least 30% cost reduction. If we don't achieve this, you don't pay for the optimization work.

**Mentorship Success Guarantee:** If you don't see measurable career progress within 3 months of mentorship, I'll extend the program at no additional cost until you do.

My track record speaks for itself - 98% client satisfaction rate and 100+ success stories. But if for any reason you're not happy, I'll make it right.`,
      // videoUrl: "https://example.com/guarantee-explanation-video",
    },
    {
      id: 5,
      category: "Process",
      question: "How do you ensure security and confidentiality?",
      answer: `Security and confidentiality are paramount in my practice:

**Legal Protection:**
• Comprehensive NDA signed before any engagement
• SOC2 compliant processes and tools
• Professional liability insurance coverage

**Technical Security:**
• All communications encrypted (Zoom, Slack, email)
• Secure document sharing via encrypted platforms
• No storage of sensitive data on personal devices
• Regular security audits of my own systems

**Access Management:**
• Principle of least privilege for any AWS access
• Temporary, role-based access only when necessary
• Complete audit trail of all activities
• Immediate access revocation post-engagement

I've worked with fintech companies, healthcare startups, and enterprise clients with strict compliance requirements. Your data and systems are always protected.`,
      videoUrl: null,
    },
    {
      id: 6,
      category: "Technical",
      question: "What AWS services do you specialize in?",
      answer: `I have deep expertise across the full AWS ecosystem, with particular specialization in:

**Compute & Containers:**
• EC2, Lambda, ECS, EKS, Fargate
• Auto Scaling, Load Balancers
• Serverless architectures

**Storage & Databases:**
• S3, EBS, EFS optimization
• RDS, DynamoDB, ElastiCache
• Data lifecycle management

**Networking & Security:**
• VPC design and optimization
• CloudFront, Route 53
• IAM, WAF, GuardDuty, Security Hub

**DevOps & Monitoring:**
• CloudFormation, CDK, Terraform
• CodePipeline, CodeBuild, CodeDeploy
• CloudWatch, X-Ray, Systems Manager

**Cost Management:**
• Cost Explorer, Budgets, Trusted Advisor
• Reserved Instances, Savings Plans
• Resource tagging and allocation

I stay current with new AWS services and regularly attend AWS events and training.`,
      videoUrl: "https://example.com/aws-expertise-overview-video",
    },
    {
      id: 7,
      category: "Career",
      question: "How much salary increase can I expect from AWS mentorship?",
      answer: `Based on my mentees' outcomes over the past 3 years:

**Average Salary Increases:**
• Junior to Mid-level: 40-60% increase
• Mid-level to Senior: 50-80% increase
• Senior to Lead/Architect: 60-100% increase

**Typical Timeline:**
• 3-6 months: First promotion or job change
• 6-12 months: Significant salary increase
• 12-18 months: Leadership or architect roles

**Success Factors:**
• Consistent effort and practice
• Hands-on project experience
• Strong fundamentals in cloud concepts
• Interview preparation and networking

**Real Examples:**
• Priya: ₹12L to ₹19.2L in 6 months (60% increase)
• Arjun: ₹8L to ₹15L in 4 months (87% increase)
• Meera: ₹18L to ₹27L in 8 months (50% increase)

Your results depend on your starting point, effort level, and market conditions, but I'll work with you to maximize your potential.`,
      videoUrl: "https://example.com/career-growth-video",
    },
    {
      id: 8,
      category: "General",
      question: "Do you work with international clients?",
      answer: `Absolutely! I work with clients across multiple time zones:

**Primary Markets:**
• India (IST timezone)
• United States (EST/PST)
• Europe (CET/GMT)
• Australia/New Zealand (AEST)

**Services Available Globally:**
• All consulting and mentorship services
• Video calls scheduled across time zones
• USD and local currency pricing
• International payment methods (wire transfer, PayPal, Stripe)

**Communication:**
• Fluent in English and Hindi
• Flexible scheduling for different time zones
• Asynchronous communication via Slack/email
• Cultural sensitivity for different business practices

**Success Stories:**
• US startups: 15+ successful engagements
• European companies: 8+ cost optimization projects
• Australian clients: 5+ mentorship success stories

Distance is never a barrier to delivering exceptional results. Many of my best client relationships are with international companies.`,
      videoUrl: null,
    },
    {
      id: 9,
      category: "AI/ML",
      question: "How do you integrate AI and LLM into cloud architectures?",
      answer: `As someone pursuing PG Certificate in Agentic AI from IIT Roorkee, I specialize in building production-ready AI systems:

**AI Services Expertise:**
• AWS Bedrock for LLM integration
• SageMaker for ML model deployment
• Lambda functions for AI workflow automation
• EventBridge for AI-driven event processing

**Recent AI Projects:**
• Agentic-AI workflow using Bedrock + LangChain for auto-triaging cloud incidents
• AI-powered DevOps systems boosting development velocity by 60%
• Chatbot development using AWS Lex and Azure Bot Service
• LLM training and fine-tuning for enterprise use cases

**Architecture Patterns:**
• Serverless AI pipelines with Lambda and Step Functions
• Real-time AI inference with API Gateway and Lambda
• Event-driven AI workflows for automated decision making
• Cost-optimized AI infrastructure reducing inference costs by 40%

**AI Integration Benefits:**
• Automated incident response and resolution
• Intelligent resource optimization
• Predictive scaling and cost management
• Enhanced developer productivity through AI assistance

I help enterprises integrate AI capabilities while maintaining security, scalability, and cost-effectiveness.`,
      videoUrl: null,
    },
    {
      id: 10,
      category: "Serverless",
      question: "What makes you a serverless architecture expert?",
      answer: `I'm a 4x AWS Community Builder (Serverless) with 8+ years of hands-on serverless experience:

**Serverless Achievements:**
• Architected zero-downtime migration to AWS Lambda + EventBridge processing 5M orders/month <200ms
• Reduced infrastructure costs by 60% through serverless optimization
• Built event-driven architectures handling massive scale
• Eliminated server management overhead for 50+ applications

**Core Serverless Services:**
• AWS Lambda (Node.js, Go, Python)
• API Gateway for serverless APIs
• DynamoDB for serverless databases
• EventBridge for event-driven architectures
• Step Functions for workflow orchestration
• S3 for serverless storage solutions

**Serverless Patterns I Implement:**
• Microservices with Lambda functions
• Event-driven data processing pipelines
• Serverless web applications with Next.js
• Real-time data streaming with Kinesis
• Serverless CI/CD pipelines

**Benefits for Your Business:**
• Pay only for what you use (no idle server costs)
• Automatic scaling from zero to millions of requests
• Reduced operational overhead and maintenance
• Faster time-to-market for new features
• Built-in high availability and fault tolerance

Serverless isn't just a technology choice—it's a business advantage that I help companies leverage effectively.`,
      videoUrl: null,
    },
    {
      id: 11,
      category: "Kubernetes",
      question: "How do you help with Kubernetes and container orchestration?",
      answer: `I specialize in Kubernetes & Container Orchestration with extensive experience in both AWS EKS and self-managed clusters:

**Container Expertise:**
• Docker containerization and optimization
• Kubernetes cluster design and management
• AWS EKS (Elastic Kubernetes Service)
• Container security and compliance
• Multi-cluster and hybrid deployments

**Kubernetes Services I Implement:**
• Production-ready EKS clusters with auto-scaling
• CI/CD pipelines integrated with Kubernetes
• Service mesh implementation (Istio, Linkerd)
• Monitoring and observability (Prometheus, Grafana)
• GitOps workflows with ArgoCD or Flux

**Container Optimization:**
• Right-sizing containers for cost efficiency
• Multi-stage Docker builds for smaller images
• Resource limits and requests optimization
• Horizontal Pod Autoscaling (HPA) configuration
• Cluster autoscaling for dynamic workloads

**Real-World Results:**
• Reduced deployment times by 70% through optimized K8s pipelines
• Achieved 99.99% uptime across multiple production clusters
• Cut container infrastructure costs by 40% through optimization
• Automated scaling handling 10x traffic spikes seamlessly

**Migration Services:**
• Legacy application containerization
• Lift-and-shift to Kubernetes
• Microservices decomposition
• Zero-downtime migration strategies

Whether you're starting with containers or optimizing existing Kubernetes deployments, I ensure your container strategy aligns with business goals.`,
      videoUrl: null,
    },
    {
      id: 12,
      category: "Certifications",
      question: "What AWS certifications do you hold and how do they benefit my project?",
      answer: `I hold 3+ AWS certifications and am a 4x AWS Community Builder, demonstrating deep, validated expertise:

**Current AWS Certifications:**
• AWS Certified Solutions Architect
• AWS Certified DevOps Engineer
• AWS Certified Security Specialty
• AWS Community Builder (Serverless) - 4x recognition

**Continuous Learning:**
• Pursuing PG Certificate in Agentic AI from IIT Roorkee
• Regular AWS training and re-certifications
• Active participation in AWS events and community
• Stay current with latest AWS services and best practices

**How Certifications Benefit Your Project:**
• **Validated Expertise:** Proven knowledge of AWS best practices
• **Latest Knowledge:** Up-to-date with newest AWS features
• **Industry Standards:** Following AWS Well-Architected Framework
• **Risk Mitigation:** Certified professionals reduce project risks
• **Compliance Ready:** Understanding of security and compliance requirements

**Community Builder Benefits:**
• Direct access to AWS product teams
• Early access to new AWS services and features
• Influence on AWS product roadmaps
• Network of AWS experts and thought leaders
• Speaking opportunities and thought leadership

**Practical Application:**
• Architecture reviews following AWS best practices
• Cost optimization using latest AWS pricing models
• Security implementation with current AWS security services
• Performance optimization with newest AWS capabilities

My certifications aren't just credentials—they're proof of hands-on expertise that directly benefits your cloud transformation.`,
      videoUrl: null,
    },
    {
      id: 13,
      category: "DevOps",
      question: "How do you implement DevSecOps and CI/CD automation?",
      answer: `I specialize in DevSecOps pipelines that integrate security throughout the development lifecycle:

**DevSecOps Implementation:**
• Hardened fintech APIs with DevSecOps pipelines (SCA + DAST)
• Reduced vulnerability MTTR from 14 days → 48 hours
• Automated security scanning in CI/CD pipelines
• Infrastructure as Code with security controls

**CI/CD Automation Tools:**
• AWS CodePipeline, CodeBuild, CodeDeploy
• GitHub Actions and GitLab CI/CD
• Terraform and AWS CDK for infrastructure
• Docker and Kubernetes for containerized deployments

**Security Integration:**
• Static Application Security Testing (SAST)
• Dynamic Application Security Testing (DAST)
• Software Composition Analysis (SCA)
• Infrastructure security scanning
• Automated compliance checks

**Performance Results:**
• Reduced deployment times by 70%
• Achieved 99.99% uptime across production systems
• Freed 100+ engineering hours/month through automation
• Eliminated manual deployment errors

**Pipeline Features:**
• Automated testing at every stage
• Blue-green and canary deployments
• Rollback capabilities and disaster recovery
• Multi-environment promotion workflows
• Automated documentation and change logs

**Compliance & Governance:**
• PCI-DSS and ISO 27001 compliance automation
• Audit trail and change management
• Role-based access controls
• Automated backup and recovery testing

I help organizations build robust, secure, and efficient development workflows that accelerate delivery while maintaining high security standards.`,
      videoUrl: null,
    },
    {
      id: 14,
      category: "Performance",
      question: "How do you achieve such impressive performance improvements?",
      answer: `My performance optimization approach combines deep technical expertise with data-driven methodologies:

**Performance Metrics Achieved:**
• 5M orders/month processed <200ms response time
• 99.99% uptime across multiple production systems
• 30-70% cost reduction through optimization
• 60% boost in development velocity with AI-powered DevOps

**Optimization Strategies:**
• **Architecture Review:** Identifying bottlenecks and inefficiencies
• **Right-sizing:** Matching resources to actual usage patterns
• **Caching Layers:** Implementing Redis, CloudFront, and application caching
• **Database Optimization:** Query optimization and indexing strategies
• **Auto-scaling:** Dynamic resource allocation based on demand

**Monitoring & Observability:**
• Real-time performance monitoring with CloudWatch
• Application Performance Monitoring (APM) tools
• Distributed tracing with AWS X-Ray
• Custom metrics and alerting systems
• Performance budgets and SLA monitoring

**Cost-Performance Balance:**
• Reserved Instances and Savings Plans optimization
• Spot Instances for non-critical workloads
• Serverless architectures for variable workloads
• Storage lifecycle management
• Network optimization and CDN implementation

**Continuous Improvement:**
• Performance testing in CI/CD pipelines
• Load testing and capacity planning
• Regular architecture reviews
• Performance regression detection
• Automated optimization recommendations

**Real-World Example:**
• Migrated a monolithic e-commerce platform to serverless microservices
• Reduced infrastructure costs by 60% while improving response times
• Implemented auto-scaling that handles 10x traffic spikes
• Added comprehensive monitoring reducing MTTR by 80%

Performance isn't just about speed—it's about creating resilient, cost-effective systems that scale with your business.`,
      videoUrl: null,
    },
    {
      id: 15,
      category: "Security",
      question: "How do you implement enterprise-grade security in cloud environments?",
      answer: `Security is fundamental to every architecture I design, with experience in highly regulated industries:

**Security Achievements:**
• Implemented IAM least-privilege across 200+ resources
• Deployed KMS envelope encryption for data protection
• Passed compliance audits first try (PCI-DSS, ISO 27001)
• Reduced security vulnerability MTTR from 14 days to 48 hours

**Security Services Expertise:**
• AWS IAM, GuardDuty, Security Hub, WAF
• AWS KMS for encryption key management
• AWS Config for compliance monitoring
• VPC security groups and NACLs
• CloudTrail for audit logging

**Security Implementation:**
• **Identity & Access Management:** Role-based access with least privilege
• **Data Protection:** Encryption at rest and in transit
• **Network Security:** VPC design with proper segmentation
• **Monitoring:** Real-time threat detection and response
• **Compliance:** Automated compliance checking and reporting

**DevSecOps Integration:**
• Security scanning in CI/CD pipelines
• Infrastructure as Code security validation
• Automated vulnerability assessments
• Container security scanning
• Secrets management and rotation

**Compliance Frameworks:**
• PCI-DSS for payment processing
• ISO 27001 for information security
• SOC 2 for service organization controls
• GDPR for data privacy
• HIPAA for healthcare data

**Incident Response:**
• Automated incident detection and alerting
• Incident response playbooks and procedures
• Forensic analysis and root cause investigation
• Business continuity and disaster recovery
• Security awareness training and documentation

**Risk Management:**
• Regular security assessments and penetration testing
• Threat modeling and risk analysis
• Security architecture reviews
• Vendor security assessments
• Continuous security monitoring and improvement

Security isn't an afterthought—it's built into every layer of the architecture from day one.`,
      videoUrl: null,
    },
    {
      id: 16,
      category: "Migration",
      question: "What's your approach to cloud migration and modernization?",
      answer: `I specialize in zero-downtime migrations and cloud modernization with a proven methodology:

**Migration Expertise:**
• Zero-downtime migration to AWS Lambda + EventBridge
• Legacy system modernization to cloud-native architectures
• Database migrations with minimal disruption
• Multi-cloud and hybrid cloud strategies

**Migration Strategies:**
• **Rehost (Lift & Shift):** Quick migration with minimal changes
• **Replatform:** Optimize for cloud without major architecture changes
• **Refactor:** Modernize to cloud-native serverless architectures
• **Rebuild:** Complete redesign using cloud-native services

**Migration Process:**
• **Assessment:** Current state analysis and migration readiness
• **Planning:** Detailed migration strategy and timeline
• **Pilot:** Proof of concept with non-critical workloads
• **Execution:** Phased migration with rollback capabilities
• **Optimization:** Post-migration performance and cost optimization

**Risk Mitigation:**
• Comprehensive backup and recovery strategies
• Parallel running during transition periods
• Automated testing and validation
• Rollback procedures for every migration step
• 24/7 monitoring during critical migration phases

**Modernization Benefits:**
• 30-70% cost reduction through cloud optimization
• Improved scalability and performance
• Enhanced security and compliance
• Reduced operational overhead
• Faster time-to-market for new features

**Industry Experience:**
• Fintech: Secure, compliant financial systems
• E-commerce: High-traffic, scalable platforms
• Healthcare: HIPAA-compliant data processing
• Startups: Cost-effective, rapidly scalable solutions

**Post-Migration Support:**
• Performance monitoring and optimization
• Cost management and optimization
• Team training and knowledge transfer
• Ongoing architecture reviews
• 24/7 support during stabilization period

Every migration is unique, but my proven methodology ensures successful outcomes with minimal business disruption.`,
      videoUrl: null,
    },
  ];

  // Initialize FAQ list from initialFaqs
  useEffect(() => {
    setFaqList(initialFaqs);
  }, []);

  const categories = ["All", ...new Set(faqList.map((faq) => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = faqList.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Edit functionality
  const handleEditFAQ = (faq) => {
    setEditingFAQ({ ...faq });
  };

  const handleSaveFAQ = () => {
    if (editingFAQ) {
      setFaqList(prev => 
        prev.map(faq => 
          faq.id === editingFAQ.id ? editingFAQ : faq
        )
      );
      setEditingFAQ(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingFAQ(null);
  };

  const handleDeleteFAQ = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqList(prev => prev.filter(faq => faq.id !== id));
    }
  };

  const handleAddFAQ = () => {
    const newFAQ = {
      id: Math.max(...faqList.map(f => f.id), 0) + 1,
      category: "General",
      question: "New Question",
      answer: "New Answer",
      videoUrl: null
    };
    setFaqList(prev => [...prev, newFAQ]);
    setEditingFAQ(newFAQ);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get answers to common questions about AWS optimization, mentorship
            programs, and working together.
          </p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-800">Admin Controls</h3>
              <button
                onClick={handleAddFAQ}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Add FAQ</span>
              </button>
            </div>
            <p className="text-blue-600 text-sm">
              You can edit, delete, or add new FAQ items. Changes are saved locally.
            </p>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Icon
                name="Search"
                size={20}
                color="#4A5568"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search frequently asked questions"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-text-secondary hover:bg-surface border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                name="Search"
                size={48}
                color="#4A5568"
                className="mx-auto mb-4 opacity-50"
              />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No questions found
              </h3>
              <p className="text-text-secondary">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-lg border border-border overflow-hidden"
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex-1 px-6 py-4 text-left flex items-center justify-between hover:bg-surface transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="bg-accent text-white px-2 py-1 rounded text-xs font-semibold mt-1">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-primary pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <Icon
                      name={openFAQ === faq.id ? "ChevronUp" : "ChevronDown"}
                      size={20}
                      color="#4A5568"
                      className="flex-shrink-0"
                    />
                  </button>
                  
                  {/* Admin Edit Controls */}
                  {isAdmin && (
                    <div className="flex items-center space-x-2 px-4">
                      <button
                        onClick={() => handleEditFAQ(faq)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Edit FAQ"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteFAQ(faq.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Delete FAQ"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-border pt-4">
                      {faq.videoUrl && (
                        <div className="mb-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
                            <Icon name="Play" size={20} color="#1B365D" />
                            <div>
                              <h4 className="font-semibold text-blue-800">
                                Video Explanation Available
                              </h4>
                              <p className="text-sm text-blue-600">
                                Watch a detailed explanation of this topic
                              </p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200">
                              Watch Video
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="prose prose-lg max-w-none text-text-secondary">
                        {faq.answer.split("\n\n").map((paragraph, index) => (
                          <div key={index} className="mb-4">
                            {paragraph.includes("•") ? (
                              <div>
                                {paragraph
                                  .split("\n")
                                  .map((line, lineIndex) => {
                                    if (line.includes("•")) {
                                      return (
                                        <div
                                          key={lineIndex}
                                          className="flex items-start space-x-2 mb-2"
                                        >
                                          <Icon
                                            name="Check"
                                            size={16}
                                            color="#38A169"
                                            className="mt-1 flex-shrink-0"
                                          />
                                          <span>
                                            {line.replace("•", "").trim()}
                                          </span>
                                        </div>
                                      );
                                    } else if (
                                      line.includes("**") &&
                                      line.includes(":")
                                    ) {
                                      return (
                                        <h4
                                          key={lineIndex}
                                          className="font-semibold text-primary mt-4 mb-2"
                                        >
                                          {line.replace(/\*\*/g, "")}
                                        </h4>
                                      );
                                    } else {
                                      return line.trim() ? (
                                        <p key={lineIndex} className="mb-2">
                                          {line}
                                        </p>
                                      ) : null;
                                    }
                                  })}
                              </div>
                            ) : (
                              <p>{paragraph}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-text-secondary mb-6">
              Can't find the answer you're looking for? Let's discuss your
              specific situation on a free call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  router.push("/booking");
                }}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 cta-shadow inline-flex items-center justify-center space-x-2"
              >
                <Icon name="Calendar" size={20} />
                <span>Book Free Q&A Call</span>
              </button>

              <a
                href={`mailto:${personalInfo.email}`}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={20} />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingFAQ && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-primary">
                    {editingFAQ.id > Math.max(...initialFaqs.map(f => f.id), 0) ? 'Add New FAQ' : 'Edit FAQ'}
                  </h3>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={editingFAQ.category}
                      onChange={(e) => setEditingFAQ(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                    >
                      <option value="General">General</option>
                      <option value="Services">Services</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Results">Results</option>
                      <option value="Process">Process</option>
                      <option value="Technical">Technical</option>
                      <option value="Career">Career</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Serverless">Serverless</option>
                      <option value="Kubernetes">Kubernetes</option>
                      <option value="Certifications">Certifications</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Performance">Performance</option>
                      <option value="Security">Security</option>
                      <option value="Migration">Migration</option>
                    </select>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={editingFAQ.question}
                      onChange={(e) => setEditingFAQ(prev => ({ ...prev, question: e.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                      placeholder="Enter the FAQ question"
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={editingFAQ.answer}
                      onChange={(e) => setEditingFAQ(prev => ({ ...prev, answer: e.target.value }))}
                      rows={12}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                      placeholder="Enter the FAQ answer. Use ** for bold text and • for bullet points."
                    />
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Video URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={editingFAQ.videoUrl || ''}
                      onChange={(e) => setEditingFAQ(prev => ({ ...prev, videoUrl: e.target.value || null }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200"
                      placeholder="https://example.com/video"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFAQ}
                    className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="Save" size={16} />
                    <span>Save FAQ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
