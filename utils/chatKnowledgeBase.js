// Knowledge base builder for AI Chat
// This extracts and structures data from personalInfo.js for intelligent responses

export const buildKnowledgeBase = (profileData, servicesData) => {
  return {
    profile: {
      name: profileData?.name || "Rahul Ladumor",
      title: profileData?.title || "4x AWS Community Builder",
      email: profileData?.email || "contact@acloudwithrahul.in",
      phone: profileData?.phone || "+91 958 666 1233",
      location: profileData?.location || "Surat, Gujarat, India",
      website: profileData?.website || "https://www.rahulladumor.in",
      experience: profileData?.experience || {},
      metrics: profileData?.metrics || [],
    },
    services: servicesData || {},
    keywords: {
      services: ['service', 'offering', 'what do you do', 'help with', 'provide'],
      pricing: ['cost', 'price', 'pricing', 'how much', 'charge', 'fee', 'rate'],
      experience: ['experience', 'background', 'who are you', 'about', 'bio'],
      skills: ['skill', 'technology', 'tech stack', 'expertise', 'tools'],
      aws: ['aws', 'amazon', 'cloud'],
      migration: ['migration', 'migrate', 'move to cloud'],
      serverless: ['serverless', 'lambda', 'function'],
      mentorship: ['mentor', 'learn', 'training', 'teach', 'coach'],
      ai: ['ai', 'machine learning', 'ml', 'artificial intelligence'],
      contact: ['contact', 'book', 'schedule', 'call', 'meeting', 'consultation'],
      location: ['location', 'where', 'available', 'remote', 'timezone'],
      results: ['result', 'success', 'case study', 'example', 'portfolio'],
      certifications: ['certification', 'certified', 'credential', 'qualification'],
      devops: ['devops', 'ci/cd', 'pipeline', 'automation'],
      security: ['security', 'compliance', 'secure', 'safe'],
      kubernetes: ['kubernetes', 'k8s', 'container', 'docker'],
      terraform: ['terraform', 'infrastructure as code', 'iac'],
    },
  };
};

export const extractServiceInfo = (servicesData) => {
  if (!servicesData || typeof servicesData !== 'object') return [];
  
  return Object.values(servicesData).map(service => ({
    slug: service.slug,
    title: service.title,
    subtitle: service.subtitle,
    benefits: service.benefits?.map(b => b.title) || [],
    tools: service.tools?.map(t => t.name) || [],
    stats: service.stats || [],
  }));
};

export const findRelevantService = (userMessage, servicesData) => {
  const lowerMessage = userMessage.toLowerCase();
  
  const serviceKeywords = {
    'cloud-migration-consulting': ['migration', 'migrate', 'move to cloud', 'transfer'],
    'technical-mentorship': ['mentor', 'learn', 'training', 'coaching', 'career'],
    'aws-cloud-architecture-review': ['architecture', 'review', 'audit', 'assessment', 'well-architected'],
    'serverless-application-development': ['serverless', 'lambda', 'function', 'event-driven'],
    'devops-automation-ci-cd': ['devops', 'ci/cd', 'pipeline', 'automation', 'deployment'],
    'ai-ml-model-development-deployment': ['ai', 'ml', 'machine learning', 'model', 'tensorflow', 'pytorch'],
    'ai-powered-cloud-optimization': ['optimization', 'cost', 'performance', 'ai optimization'],
    'data-engineering-mlops-consulting': ['data', 'mlops', 'pipeline', 'etl', 'data engineering'],
  };

  for (const [slug, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return servicesData[slug];
    }
  }

  return null;
};

export const formatServiceResponse = (service) => {
  if (!service) return null;

  const stats = service.stats?.map(s => `${s.value} ${s.label}`).join(', ') || '';
  const benefits = service.benefits?.slice(0, 3).map(b => `• ${b.title}`).join('\n') || '';

  return `**${service.title}**\n\n${service.subtitle}\n\n**Key Benefits:**\n${benefits}\n\n**Results:** ${stats}\n\nWould you like to learn more about this service?`;
};
