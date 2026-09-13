import { useEffect, useState } from 'react';
import {
  Shield, MapPin, ArrowRight, ArrowLeft, Check, LogOut, UserCog,
  Languages, Award, Star, BookOpen, Briefcase, FileText, ShieldCheck, Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

type GuideDashboardProps = {
  onBack: () => void;
};

type Specialty = {
  id: string;
  label: string;
  icon: typeof BookOpen;
};

const SPECIALTIES: Specialty[] = [
  { id: 'food', label: 'Food', icon: Star },
  { id: 'religious', label: 'Religious', icon: Shield },
  { id: 'historical', label: 'Historical', icon: BookOpen },
  { id: 'nature', label: 'Nature', icon: MapPin },
  { id: 'photography', label: 'Photography', icon: Award },
  { id: 'shopping', label: 'Shopping', icon: Briefcase },
];

const LANGUAGE_OPTIONS = ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Punjabi', 'Gujarati', 'Urdu', 'Sanskrit', 'French', 'Spanish', 'German'];

const POPULAR_CITIES = ['Varanasi', 'Agra', 'Jaipur', 'Kerala', 'Delhi', 'Goa', 'Amritsar', 'Mumbai', 'Hyderabad', 'Kashmir'];

type GuideProfile = {
  id: string;
  full_name: string;
  city: string;
  languages: string[];
  specialties: string[];
  experience_years: number;
  bio: string | null;
  verified: boolean;
  created_at: string;
};

export function GuideDashboard({ onBack }: GuideDashboardProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState(0);
  const [bio, setBio] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guides')
      .select('id, full_name, city, languages, specialties, experience_years, bio, verified, created_at')
      .maybeSingle();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      const p = data as GuideProfile;
      setProfile(p);
      setFullName(p.full_name);
      setCity(p.city);
      setSelectedLanguages(p.languages ?? []);
      setSelectedSpecialties(p.specialties ?? []);
      setExperienceYears(p.experience_years);
      setBio(p.bio ?? '');
    }
    setLoading(false);
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleSpecialty = (id: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!city.trim()) {
      setError('Please enter your city.');
      return;
    }
    if (selectedLanguages.length === 0) {
      setError('Please select at least one language.');
      return;
    }
    if (selectedSpecialties.length === 0) {
      setError('Please select at least one specialty.');
      return;
    }

    setSubmitting(true);
    const payload = {
      full_name: fullName.trim(),
      city: city.trim(),
      languages: selectedLanguages,
      specialties: selectedSpecialties,
      experience_years: experienceYears,
      bio: bio.trim() || null,
    };

    if (profile) {
      const { error: updateError } = await supabase
        .from('guides')
        .update(payload)
        .eq('id', profile.id);
      if (updateError) {
        setError(updateError.message);
        setSubmitting(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from('guides')
        .insert(payload);
      if (insertError) {
        setError(insertError.message);
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
    setSuccess(true);
    loadProfile();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-navy-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header bar */}
      <header className="bg-navy-900 py-4 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-saffron-500" strokeWidth={2.2} />
            <span className="text-white font-extrabold text-base tracking-tight">
              YATRA<span className="text-saffron-400"> SHIELD</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-white/50 text-sm">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        {/* Back link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-navy-400 hover:text-navy-600 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-700/10 text-navy-600 text-xs font-bold tracking-wide uppercase mb-3">
            <UserCog className="w-3.5 h-3.5" />
            Guide Dashboard
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-navy-700 tracking-tight">
            {profile ? 'Your Guide Profile' : 'Register as a Guide'}
          </h1>
          <p className="mt-2 text-navy-400 text-lg">
            {profile
              ? 'Update your profile details. Travellers will find you based on this information.'
              : 'Tell us about yourself so travellers can find and book you.'}
          </p>
        </div>

        {/* Verification status banner */}
        {profile && (
          <div className={`mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl border ${
            profile.verified
              ? 'bg-green-50 border-green-200'
              : 'bg-saffron-500/5 border-saffron-500/20'
          }`}>
            {profile.verified ? (
              <>
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-700 font-bold text-sm">Verified Guide</p>
                  <p className="text-green-600/70 text-xs">Your profile has been verified by YATRA SHIELD.</p>
                </div>
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 text-saffron-500 flex-shrink-0" />
                <div>
                  <p className="text-saffron-700 font-bold text-sm">Verification Pending</p>
                  <p className="text-saffron-600/70 text-xs">Your profile is being reviewed. This usually takes 1-2 business days.</p>
                </div>
              </>
            )}
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl bg-green-50 border border-green-200">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-semibold text-sm">Profile saved successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 sm:p-8 space-y-8">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-navy-600 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold text-navy-600 mb-2">City / Region You Operate In</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city or region"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {POPULAR_CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className="px-3 py-1.5 rounded-lg bg-surface hover:bg-saffron-500/10 text-navy-500 hover:text-saffron-600 text-xs font-semibold transition-colors border border-navy-100"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-bold text-navy-600 mb-3">
              <span className="inline-flex items-center gap-1.5">
                <Languages className="w-4 h-4" />
                Languages You Speak
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => {
                const selected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
                      selected
                        ? 'border-saffron-500 bg-saffron-500/10 text-saffron-700'
                        : 'border-navy-100 bg-surface text-navy-500 hover:border-navy-200'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-bold text-navy-600 mb-3">Your Specialties</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SPECIALTIES.map((spec) => {
                const selected = selectedSpecialties.includes(spec.id);
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => toggleSpecialty(spec.id)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 ${
                      selected
                        ? 'border-saffron-500 bg-saffron-500/10'
                        : 'border-navy-100 bg-surface hover:border-navy-200'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                      selected ? 'bg-saffron-500 text-navy-900' : 'bg-navy-100 text-navy-400'
                    }`}>
                      {selected ? <Check className="w-5 h-5" /> : <spec.icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-sm font-semibold ${selected ? 'text-navy-700' : 'text-navy-500'}`}>
                      {spec.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-bold text-navy-600 mb-2">
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Years of Experience
              </span>
            </label>
            <input
              type="number"
              min={0}
              max={50}
              required
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-32 px-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-bold text-navy-600 mb-2">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                About You
              </span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio about your experience, what makes you a great guide, and what travellers can expect..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all resize-none"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300"
          >
            {submitting ? 'Saving...' : profile ? 'Update Profile' : 'Submit Registration'}
            {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}
