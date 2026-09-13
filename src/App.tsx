import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Destinations } from '@/components/Destinations';
import { UnexploredPlaces } from '@/components/UnexploredPlaces';
import { HeritageSites } from '@/components/HeritageSites';
import { G20Destinations } from '@/components/G20Destinations';
import { WhyOurGuides } from '@/components/WhyOurGuides';
import { SafetyCenter } from '@/components/SafetyCenter';
import { Footer } from '@/components/Footer';
import { LoginPage } from '@/components/LoginPage';
import { TripPlanner } from '@/components/TripPlanner';
import { GuideLoginPage } from '@/components/GuideLoginPage';
import { GuideDashboard } from '@/components/GuideDashboard';

type View = 'landing' | 'login' | 'trip' | 'guide-login' | 'guide-dashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    if (loading) return;
    if (!user && (view === 'trip' || view === 'guide-dashboard')) {
      setView('landing');
    } else if (user && view === 'landing') {
      setView('trip');
    }
  }, [loading, user, view]);

  const handleExploreTraveller = () => {
    if (user) {
      setView('trip');
    } else {
      setView('login');
    }
  };

  const handleBecomeGuide = () => {
    if (user) {
      setView('guide-dashboard');
    } else {
      setView('guide-login');
    }
  };

  const handleAuthSuccess = () => {
    setView('trip');
  };

  const handleGuideAuthSuccess = () => {
    setView('guide-dashboard');
  };

  const handleBackToLanding = () => {
    setView('landing');
  };

  if (view === 'login') {
    return <LoginPage onAuthSuccess={handleAuthSuccess} onBack={handleBackToLanding} />;
  }

  if (view === 'trip') {
    return <TripPlanner onBack={handleBackToLanding} />;
  }

  if (view === 'guide-login') {
    return <GuideLoginPage onAuthSuccess={handleGuideAuthSuccess} onBack={handleBackToLanding} />;
  }

  if (view === 'guide-dashboard') {
    return <GuideDashboard onBack={handleBackToLanding} />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar
        onExploreTraveller={handleExploreTraveller}
        onBecomeGuide={handleBecomeGuide}
      />
      <main>
        <Hero
          onExploreTraveller={handleExploreTraveller}
          onBecomeGuide={handleBecomeGuide}
        />
        <Destinations />
        <UnexploredPlaces />
        <HeritageSites />
        <G20Destinations />
        <WhyOurGuides />
        <SafetyCenter />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
