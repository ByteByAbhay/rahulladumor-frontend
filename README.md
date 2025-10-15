# Rahul Ladumor Portfolio Frontend

A modern, responsive portfolio website built with Next.js 14, React 18, TypeScript, and TailwindCSS. Features a beautiful UI with smooth animations, Redux state management, and comprehensive content sections.

## 🚀 Features

### Core Features
- **Next.js 14** - Latest Next.js with App Router
- **TypeScript** - Full type safety
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Redux Toolkit** - State management with Redux Persist
- **Smooth Animations** - Framer Motion animations
- **Modern UI** - Lucide React icons and custom components
- **Form Handling** - React Hook Form with validation
- **Data Visualization** - Recharts for charts and D3.js integration
- **SEO Optimized** - Meta tags and semantic HTML

### Portfolio Sections
- **Hero Section** - Eye-catching introduction
- **About** - Personal information and bio
- **Skills** - Technical skills showcase
- **Education** - Academic background
- **Work Experience** - Professional experience timeline
- **Services** - Services offered
- **Certifications** - Professional certifications
- **Testimonials** - Client reviews and feedback
- **Case Studies** - Project showcases
- **Contact** - Contact form with validation

## 🛠️ Tech Stack

### Framework & Core
- **Next.js** ^14.0.0
- **React** ^18.2.0
- **TypeScript** ^5.8.3

### State Management
- **Redux Toolkit** ^2.6.1
- **React Redux** ^9.2.0
- **Redux Persist** ^6.0.0

### Styling & UI
- **TailwindCSS** 3.4.6
- **Tailwind Plugins**:
  - @tailwindcss/forms
  - @tailwindcss/typography
  - @tailwindcss/aspect-ratio
  - @tailwindcss/container-queries
  - tailwindcss-animate
  - tailwindcss-elevation
  - tailwindcss-fluid-type
- **Framer Motion** ^10.16.4 - Animations
- **Lucide React** ^0.484.0 - Icons

### Data & Forms
- **Axios** ^1.8.4 - HTTP client
- **React Hook Form** ^7.55.0 - Form handling
- **Date-fns** ^4.1.0 - Date utilities

### Data Visualization
- **Recharts** ^2.15.2 - Charts
- **D3.js** ^7.9.0 - Data visualization

### Content & Security
- **HTML React Parser** ^5.2.6 - HTML parsing
- **DOMPurify** ^3.2.7 - XSS protection

### Development Tools
- **ESLint** - Code linting
- **Vitest** ^3.2.4 - Testing framework
- **Testing Library** - React testing utilities
- **Autoprefixer** - CSS vendor prefixes
- **PostCSS** - CSS processing

## 📁 Project Structure

```
rahulladumor-frontend/
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   ├── ui/            # Reusable UI components
│   └── forms/         # Form components
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # Document wrapper
│   ├── index.tsx      # Home page
│   └── api/           # API routes
├── redux/              # Redux store
│   ├── store.ts       # Store configuration
│   ├── slices/        # Redux slices
│   └── hooks.ts       # Redux hooks
├── services/           # API services
│   └── api.ts         # API client
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles
│   └── globals.css    # Global CSS
├── public/             # Static assets
│   ├── images/        # Images
│   └── icons/         # Icons
├── config/             # Configuration files
├── providers/          # Context providers
├── .env               # Environment variables
├── .env.example       # Environment template
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Backend API running (see backend README)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📜 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm test                 # Run tests with Vitest
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate test coverage
npm run test:run         # Run tests once
npm run validate         # Validate content
npm run setup-check      # Run validation and type check
```

## 🎨 Styling

### TailwindCSS Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Fluid typography
- Elevation utilities
- Animation utilities
- Custom plugins for forms, typography, and more

### Global Styles

Global styles are defined in `styles/globals.css` with:
- CSS custom properties
- Base styles
- Utility classes
- Component styles

## 🔌 API Integration

The frontend connects to the backend API for:
- **Profile Data** - Personal information, skills, experience
- **Contact Form** - Send contact messages
- **Dynamic Content** - Education, certifications, testimonials
- **Case Studies** - Project showcases

API client is configured in `services/api.ts` using Axios with:
- Base URL configuration
- Request/response interceptors
- Error handling
- Type-safe requests

## 🧪 Testing

The project uses Vitest for testing:

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run tests once (CI)
npm run test:run
```

## 🎯 Key Features Implementation

### Redux State Management
- Centralized state with Redux Toolkit
- Persistent state with Redux Persist
- Type-safe hooks and selectors
- Async thunks for API calls

### Form Handling
- React Hook Form for performance
- Custom validation rules
- Error handling and display
- Accessible form components

### Animations
- Framer Motion for smooth transitions
- Scroll-based animations
- Page transitions
- Micro-interactions

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Fluid typography
- Touch-friendly interactions

## 🔧 Configuration Files

### next.config.js
- Image optimization
- Environment variables
- Webpack configuration
- Build optimization

### tailwind.config.js
- Custom theme
- Plugin configuration
- Content paths
- Utility extensions

### tsconfig.json
- TypeScript compiler options
- Path aliases
- Strict type checking
- Module resolution

## 🌐 Deployment

Build the application for production:
```bash
npm run build
```

Deploy the `.next` folder to your hosting platform.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- XSS protection with DOMPurify
- CSRF protection
- Secure environment variables
- Content Security Policy headers
- Input validation and sanitization

## 🎓 Typography System

Detailed typography guidelines are available in `TYPOGRAPHY.md`:
- Font families and weights
- Size scales and hierarchy
- Line heights and spacing
- Responsive typography
- Accessibility considerations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Rahul Ladumor**

- Website: [https://www.rahulladumor.in](https://www.rahulladumor.in)
- LinkedIn: [https://linkedin.com/in/rahulladumor](https://linkedin.com/in/rahulladumor)
- GitHub: [https://github.com/rahulladumor](https://github.com/rahulladumor)

## 🆘 Support

For support and questions, please contact: contact@acloudwithrahul.in

## 📝 Notes

- Ensure the backend API is running before starting the frontend
- Check `.env.example` for required environment variables
- Run `npm run setup-check` before committing changes
- Follow the TypeScript strict mode guidelines
- Use the provided ESLint configuration for code quality
