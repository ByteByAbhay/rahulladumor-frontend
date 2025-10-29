import StickyNavigation from './StickyNavigation';
import FloatingBookingCTA from './FloatingBookingCTA';
import Footer from './Footer';
import AIChat from '../AIChat';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceMonitoring';
import SectionProgressIndicator from "./SectionProgressIndicator";
import { servicePages, pageSEO } from '../../config/personalInfo';

export default function MainLayout({ children, profileData }) {

    // Initialize performance monitoring
    usePerformanceMonitoring();

    return (
        <div className={`min-h-screen bg-background transition-opacity duration-500`}>
            <StickyNavigation profileData={profileData} />
            <SectionProgressIndicator />

            <main className="relative">
                {children}
            </main>

            <FloatingBookingCTA profileData={profileData} />
            <AIChat 
                profileData={profileData} 
                servicesData={servicePages}
                seoData={pageSEO}
            />
            <Footer profileData={profileData} />
        </div>
    );
}