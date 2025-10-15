import StickyNavigation from './StickyNavigation';
import FloatingBookingCTA from './FloatingBookingCTA';
import Footer from './Footer';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceMonitoring';
import SectionProgressIndicator from "./SectionProgressIndicator"

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
            <Footer profileData={profileData} />
        </div>
    );
}