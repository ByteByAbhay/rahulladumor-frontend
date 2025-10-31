# Service Integration Examples

## Dynamic Service Navigation & Listing

All services are automatically detected and can be integrated anywhere in your application using the service registry system.

---

## 1. Navigation Dropdown Menu

Add all services to your navigation automatically:

```jsx
// components/Navigation.jsx
import { getServiceNavItems } from '../config/serviceRegistry';
import { useRouter } from 'next/router';
import Icon from './AppIcon';

export default function Navigation() {
  const router = useRouter();
  const services = getServiceNavItems();

  return (
    <nav className="relative">
      {/* Services Dropdown */}
      <div className="group relative">
        <button className="px-4 py-2 hover:text-primary transition-colors">
          Services
          <Icon name="ChevronDown" className="inline w-4 h-4 ml-1" />
        </button>
        
        {/* Dropdown Menu */}
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-4 space-y-2">
            {services.map((service) => (
              <button
                key={service.path}
                onClick={() => router.push(service.path)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={service.icon} className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary text-sm">
                    {service.title}
                  </div>
                  <div className="text-xs text-text-secondary line-clamp-1">
                    {service.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

---

## 2. Homepage Featured Services

Display featured services on your homepage:

```jsx
// pages/index.jsx (or components/FeaturedServices.jsx)
import { getFeaturedServices } from '../config/serviceRegistry';
import { useRouter } from 'next/router';
import Icon from '../components/AppIcon';

export default function FeaturedServices() {
  const router = useRouter();
  const services = getFeaturedServices(); // Returns first 3 by default

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Comprehensive AWS consulting services to accelerate your cloud journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
              onClick={() => router.push(service.path)}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-br from-primary to-secondary p-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Icon name={service.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.subtitle}
                </p>

                {/* Stats */}
                {service.stats && service.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                    {service.stats.slice(0, 2).map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <button className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3">
                  Learn More
                  <Icon name="ArrowRight" className="w-5 h-5 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/services')}
            className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 inline-flex items-center gap-2"
          >
            View All Services
            <Icon name="ArrowRight" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. Service Grid with Filtering

Advanced service grid with category filtering:

```jsx
// components/ServicesGrid.jsx
import { useState } from 'react';
import { getAllServices } from '../config/serviceRegistry';
import { useRouter } from 'next/router';
import Icon from './AppIcon';

export default function ServicesGrid() {
  const router = useRouter();
  const allServices = getAllServices();
  const [filter, setFilter] = useState('all');

  // Define categories (you can add category to service data)
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'optimization', label: 'Optimization' },
    { id: 'development', label: 'Development' },
    { id: 'automation', label: 'Automation' },
  ];

  // Filter logic (simple example - enhance based on your needs)
  const filteredServices = filter === 'all' 
    ? allServices 
    : allServices.filter(s => {
        // Add category field to your service data for real filtering
        if (filter === 'optimization') {
          return s.slug.includes('optimization') || s.slug.includes('architecture') || s.slug.includes('migration');
        }
        if (filter === 'development') {
          return s.slug.includes('serverless') || s.slug.includes('application');
        }
        if (filter === 'automation') {
          return s.slug.includes('devops') || s.slug.includes('ci-cd');
        }
        return true;
      });

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                filter === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface text-text-secondary hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => router.push(service.path)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={service.icon} className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {service.subtitle}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group">
                Learn More
                <Icon name="ArrowRight" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Related Services Sidebar

Show related services on individual service pages:

```jsx
// components/RelatedServices.jsx
import { getAllServices } from '../config/serviceRegistry';
import { useRouter } from 'next/router';
import Icon from './AppIcon';

export default function RelatedServices({ currentSlug }) {
  const router = useRouter();
  const allServices = getAllServices();
  
  // Filter out current service
  const relatedServices = allServices
    .filter(s => s.slug !== currentSlug)
    .slice(0, 3); // Show max 3

  return (
    <aside className="bg-surface p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-primary mb-6">
        Other Services
      </h3>
      
      <div className="space-y-4">
        {relatedServices.map((service) => (
          <button
            key={service.slug}
            onClick={() => router.push(service.path)}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-200 text-left border border-gray-100 group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon name={service.icon} className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-primary text-sm mb-1 group-hover:text-primary-dark">
                {service.title}
              </div>
              <div className="text-xs text-text-secondary line-clamp-1">
                {service.subtitle}
              </div>
            </div>
            <Icon name="ChevronRight" className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => router.push('/services')}
          className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          View All Services
          <Icon name="ExternalLink" className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

// Usage in service page:
// <RelatedServices currentSlug="aws-cloud-architecture-review" />
```

---

## 5. Service Comparison Table

Compare all services side-by-side:

```jsx
// components/ServiceComparison.jsx
import { getAllServices } from '../config/serviceRegistry';
import { useRouter } from 'next/router';
import Icon from './AppIcon';

export default function ServiceComparison() {
  const router = useRouter();
  const services = getAllServices();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Compare Our Services
          </h2>
          <p className="text-lg text-text-secondary">
            Find the perfect service for your needs
          </p>
        </div>

        {/* Desktop: Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface">
                <th className="p-4 text-left font-bold text-primary">Service</th>
                <th className="p-4 text-center font-bold text-primary">Timeline</th>
                <th className="p-4 text-center font-bold text-primary">Key Benefit</th>
                <th className="p-4 text-center font-bold text-primary">Best For</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr key={service.slug} className={idx % 2 === 0 ? 'bg-white' : 'bg-surface/50'}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon name={service.icon} className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-semibold text-primary">
                          {service.title}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {service.subtitle.slice(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {service.process?.steps?.[service.process.steps.length - 1]?.duration || 'Varies'}
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {service.stats?.[0]?.value || 'Results'} {service.stats?.[0]?.label || 'Guaranteed'}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm text-text-secondary">
                    {service.whyChooseUs?.[0]?.title || 'All businesses'}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => router.push(service.path)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold whitespace-nowrap"
                    >
                      Learn More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card View */}
        <div className="lg:hidden space-y-6">
          {services.map((service) => (
            <div key={service.slug} className="bg-surface p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Icon name={service.icon} className="w-8 h-8 text-primary" />
                <h3 className="font-bold text-primary">{service.title}</h3>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Timeline:</span>
                  <span className="font-semibold">
                    {service.process?.steps?.[service.process.steps.length - 1]?.duration || 'Varies'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Key Benefit:</span>
                  <span className="font-semibold text-green-600">
                    {service.stats?.[0]?.value || 'Results'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push(service.path)}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Footer Service Links

Add services to footer automatically:

```jsx
// components/Footer.jsx
import { getAllServices } from '../config/serviceRegistry';
import Link from 'next/link';

export default function Footer() {
  const services = getAllServices();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">Rahul Ladumor</h3>
            <p className="text-white/80 text-sm">
              AWS Community Builder helping businesses optimize cloud infrastructure
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={service.path}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other sections... */}
        </div>
      </div>
    </footer>
  );
}
```

---

## 7. Service Search

Implement service search functionality:

```jsx
// components/ServiceSearch.jsx
import { useState } from 'react';
import { getAllServices } from '../config/serviceRegistry';
import { useRouter } from 'next/router';
import Icon from './AppIcon';

export default function ServiceSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const allServices = getAllServices();

  // Filter services based on search query
  const filteredServices = query
    ? allServices.filter(service =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allServices;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Search Input */}
      <div className="relative mb-8">
        <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <button
              key={service.slug}
              onClick={() => router.push(service.path)}
              className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={service.icon} className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-1">
                    {service.subtitle}
                  </p>
                </div>
                <Icon name="ArrowRight" className="w-5 h-5 text-text-secondary" />
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-12 text-text-secondary">
            <Icon name="Search" className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No services found matching "{query}"</p>
          </div>
        )}
      </div>

      {/* Service Count */}
      <div className="text-center mt-8 text-sm text-text-secondary">
        Showing {filteredServices.length} of {allServices.length} services
      </div>
    </div>
  );
}
```

---

## Summary

All these integration examples work **automatically** with your service registry system. When you add a new service to `personalInfo.js`, it will:

✅ Appear in navigation dropdowns  
✅ Show in homepage featured services  
✅ Display in service grids  
✅ Be searchable  
✅ Appear in footer links  
✅ Show in comparison tables  
✅ Be available in related services  

**Zero manual updates required!** 🎉

The service registry (`/config/serviceRegistry.js`) handles all the detection and organization automatically.
