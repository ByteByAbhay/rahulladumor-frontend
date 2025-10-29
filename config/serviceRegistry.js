/**
 * Service Registry
 * 
 * This file automatically detects and registers all service pages from personalInfo.js
 * New services can be added to personalInfo.js > servicePages object and they will be
 * automatically detected and available throughout the application.
 * 
 * Usage:
 * import { getAllServices, getServiceBySlug } from '@/config/serviceRegistry';
 * 
 * const services = getAllServices();
 * const service = getServiceBySlug('cloud-migration-consulting');
 */

import { servicePages } from './personalInfo';

/**
 * Get all available services
 * @returns {Array} Array of service objects with metadata
 */
export const getAllServices = () => {
  return Object.keys(servicePages).map((key) => {
    const service = servicePages[key];
    return {
      slug: service.slug,
      title: service.title,
      subtitle: service.subtitle,
      icon: service.icon,
      path: `/services/${service.slug}`,
      ...service,
    };
  });
};

/**
 * Get a specific service by slug
 * @param {string} slug - Service slug (e.g., 'cloud-migration-consulting')
 * @returns {Object|null} Service object or null if not found
 */
export const getServiceBySlug = (slug) => {
  const service = servicePages[slug];
  if (!service) return null;

  return {
    slug: service.slug,
    title: service.title,
    subtitle: service.subtitle,
    icon: service.icon,
    path: `/services/${service.slug}`,
    ...service,
  };
};

/**
 * Get service navigation items (for menus, dropdowns, etc.)
 * @returns {Array} Array of navigation items with title and path
 */
export const getServiceNavItems = () => {
  return getAllServices().map((service) => ({
    title: service.title,
    path: service.path,
    icon: service.icon,
  }));
};

/**
 * Check if a service exists by slug
 * @param {string} slug - Service slug
 * @returns {boolean} True if service exists
 */
export const serviceExists = (slug) => {
  return !!servicePages[slug];
};

/**
 * Get service count
 * @returns {number} Total number of services
 */
export const getServiceCount = () => {
  return Object.keys(servicePages).length;
};

/**
 * Get featured services (for homepage, etc.)
 * Can be filtered by a 'featured' property if added to service data
 * @returns {Array} Array of featured services
 */
export const getFeaturedServices = () => {
  const services = getAllServices();
  // If services have a 'featured' property, filter by it
  const featuredServices = services.filter((service) => service.featured);
  // If no featured services, return first 3
  return featuredServices.length > 0 ? featuredServices : services.slice(0, 3);
};

/**
 * Generate service paths for Next.js static generation
 * @returns {Array} Array of path objects for getStaticPaths
 */
export const getServicePaths = () => {
  return getAllServices().map((service) => ({
    params: { slug: service.slug },
  }));
};

export default {
  getAllServices,
  getServiceBySlug,
  getServiceNavItems,
  serviceExists,
  getServiceCount,
  getFeaturedServices,
  getServicePaths,
};
