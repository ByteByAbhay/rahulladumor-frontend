// Speaking Events Configuration
// This file contains all speaking events, conferences, and guest lectures

export const speakingEvents = [
  {
    id: "vnsgu-serverless-2025",
    slug: "vnsgu-serverless-development",
    staticPage: "/events/vnsgu-serverless-development",
    event: "VNSGU University Guest Lecture",
    title: "Serverless Development in Action: Build Without Servers",
    topic: "Serverless Architecture",
    date: "2025-10-1",
    location: "Surat, Gujarat, India",
    venue: "Veer Narmad South Gujarat University",
    type: "University Lecture",
    audience: "200+ students",
    duration: "90 minutes",
    image: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/vnsgu-event-1.jpeg`,
    description: "Comprehensive guest lecture on serverless development for university students, covering the fundamentals of serverless architecture, AWS Lambda, and real-world applications. Demonstrated how serverless means writing code, not running servers, with practical examples from enterprise projects.",
    keyTakeaways: [
      "Focus on Business Logic - No infrastructure overhead for OS updates, scaling rules, or monitoring agents",
      "Cost Efficiency - Pay only for execution time with no charge during idle periods",
      "Automatic Scalability - Concurrency scaling triggered by demand spikes",
      "Faster Innovation - Deploy small, independent functions rapidly",
      "Built-in Resilience - High availability and fault tolerance offered by AWS",
      "When to Consider Serverless - Rapid deployment, unpredictable workloads, automatic scaling"
    ],
    technologies: ["AWS Lambda", "Serverless Framework", "API Gateway", "DynamoDB", "EventBridge", "CloudWatch"],
    slides: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/Serverless%20Development.pptx`,
    recording: null,
    featured: true,
    gallery: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/vnsgu-event-1.jpeg`,
        caption: "Guest lecture at VNSGU University - Serverless Development"
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/vnsgu-event-2.jpeg`,
        caption: "Engaging with students on serverless architecture concepts"
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/vnsgu-event-3.jpeg`,
        caption: "Demonstrating AWS Lambda and serverless best practices"
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/vnsgu-event-4.jpeg`,
        caption: "Interactive Q&A session with university students"
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_DOMAIN || 'https://d3r07edv7sh3j9.cloudfront.net'}/images/events/vnsgu/vnsgu-event-5.jpeg`,
        caption: "Sharing real-world serverless implementation experiences"
      }
    ],
    highlights: [
      "Presented to 200+ computer science students at VNSGU",
      "Covered journey from student to AWS Solution Architect",
      "Shared experiences from working with KFC, HBO, ProtectOnce, NTT Data, ASTM International",
      "Demonstrated real-world serverless applications and use cases",
      "Discussed when and why to adopt serverless architecture"
    ]
  }
];

// Helper function to get event by slug
export const getEventBySlug = (slug) => {
  return speakingEvents.find(event => event.slug === slug);
};

// Helper function to get featured events
export const getFeaturedEvents = () => {
  return speakingEvents.filter(event => event.featured);
};

// Helper function to get events by type
export const getEventsByType = (type) => {
  return speakingEvents.filter(event => event.type === type);
};

// Get all unique event types
export const getEventTypes = () => {
  return [...new Set(speakingEvents.map(event => event.type))];
};
