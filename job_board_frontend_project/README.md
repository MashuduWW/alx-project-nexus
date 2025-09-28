# **HireSpot - Frontend**

A modern, responsive React application for the Job Board Platform that provides an intuitive interface for job seekers and employers to connect. Built with TypeScript, Tailwind CSS, and modern React patterns for optimal performance and user experience.



##  **Features**

### Core Functionality
- **Responsive Design**: Mobile-first approach with seamless desktop experience

- **Search**: Intelligent filtering


### User Experience
- **Dark/Light Mode**: Theme switching with system preference detection
- **Infinite Scroll**: Efficient job listing pagination
- **Drag & Drop**: Resume and file uploads with preview


- **Saved Searches**: Persistent search queries and job alerts

### Performance
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Image Optimization**: WebP format with fallbacks and lazy loading
- **Caching**: Aggressive caching with React Query for API responses
- **Service Worker**: Background sync and offline functionality

## Technology Stack

### Core Framework
- **React** 18.2+ with Concurrent Features
- **TypeScript** 5.0+ for type safety

### State Management
- **Zustand** for global state management
- **React Query** for server state and caching
- **React Hook Form** for form state management

### Styling & UI
- **Vanilla CSS** CSS Version: CSS3
- **Headless UI** for accessible, unstyled UI components
- **Framer Motion** for smooth animations and transitions
- **React Select** for enhanced select components

### Search & Filter
- **Advanced Search Capabilities** 
- **Multi-dimensional Filtering** 

### Routing & Navigation
- **React Router v6** with data loading
- **React Helmet Async** for SEO and meta tags

### Development Tools
- **ESLint** with TypeScript and React rules
- **Prettier** for code formatting
- **lint-staged** for pre-commit linting


### Build & Deployment
- **Bundle Analyzer** for size optimization

##  Prerequisites

- Node.js 18.0 or higher
- npm 9.0+ or yarn 1.22+ or pnpm 8.0+
- Modern browser with ES2020 support

## Getting Started

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/MashuduWW/alx-project-nexus.git
cd hirespot-frontend

# Install dependencies
npm install


```


### Development Commands

```bash
# Start development server
npm run dev

# Start with API mocking
npm run dev:mock

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Format code
npm run format

# Type check
npm run type-check

# Analyze bundle size
npm run analyze
```

##  Project Structure

```

job_board_frontend/
├── pages/
│   ├── index.tsx
│   ├── jobseeker/
│   │   └── index.tsx
│   ├── jobs/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── companies/
│   │   └── index.tsx
│   ├── applications/
│   │   └── index.tsx
│   └── login/                     
|    └── index.tsx
├── components/                  
│   ├── Navbar.tsx
│   ├── JobCard.tsx
│   ├── CompanyCard.tsx
│   ├── Logo.tsx
│   └── Footer.tsx
├── styles/
│   └── globals.css
├── interfaces/
│   ├── Job.ts
│   ├── Jobseeker.ts
│   ├── Company.ts
│   ├── Login.ts
│   └── User.ts
├── utils/
│   └── api.ts
└── public/

```

## Key Features Implementation


## Testing

### Testing Strategy
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Feature workflows and user interactions
- **Visual Tests**: Component appearance and responsive behavior



### Deployment 

#### Vercel 
```bash
Deploy platform:
https://vercel.com

Project link:
https://alx-project-nexus-hirespot.vercel.app/
```



##  Design System




### Coding Standards
- Use TypeScript for all new code
- Follow the existing ESLint and Prettier configuration
- Write meaningful commit messages following conventional commits
- Include tests for new features and bug fixes
- Update Storybook stories for UI components

### Code Review Checklist
- [ ] Code follows TypeScript and React best practices
- [ ] Components are accessible (WCAG 2.1 AA)
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Mobile responsiveness is maintained

##  Performance Monitoring

### Metrics Tracking
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Size**: Automated bundle analysis
- **Lighthouse Scores**: CI/CD performance checks
- **User Analytics**: Feature usage and engagement

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization and lazy loading
- Service worker caching
- Component memoization where appropriate
- Efficient re-renders with proper dependencies



## License

This project is for educational purposes only and is not licensed for external use or redistribution.


Built by **Mashudu Molema** as part of the ALX Full Stack Engineering Program © 2025
