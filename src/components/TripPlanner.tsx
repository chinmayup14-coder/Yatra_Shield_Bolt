import { useEffect, useState } from 'react';
import { Shield, MapPin, ArrowRight, ArrowLeft, Check, LogOut, Sparkles, Utensils, Landmark, Church, Mountain, Camera, ShoppingBag, Calendar, Users, Wallet, Clock, Languages, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

type TripPlannerProps = {
  onBack: () => void;
};

type Interest = {
  id: string;
  label: string;
  icon: typeof Utensils;
};

const INTERESTS: Interest[] = [
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'religious', label: 'Religious', icon: Church },
  { id: 'historical', label: 'Historical', icon: Landmark },
  { id: 'nature', label: 'Nature', icon: Mountain },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
];

const ALL_LOCATIONS = [
  'Agra', 'Ahmedabad', 'Amritsar', 'Andaman Islands', 'Arunachal Pradesh',
  'Ayodhya', 'Bangalore', 'Bhubaneswar', 'Bodh Gaya', 'Chandigarh',
  'Chennai', 'Coorg', 'Darjeeling', 'Delhi', 'Dholavira',
  'Dharamshala', 'Gangtok', 'Goa', 'Guwahati', 'Hampi',
  'Hyderabad', 'Imphal', 'Jaipur', 'Jaisalmer', 'Jodhpur',
  'Kashmir', 'Kaziranga', 'Kerala', 'Khajuraho', 'Kochi',
  'Konark', 'Kolkata', 'Kutch', 'Leh', 'Lucknow',
  'Madurai', 'Mahabaleshwar', 'Manali', 'Matheran', 'Meghalaya',
  'Mumbai', 'Munnar', 'Mysore', 'Nagaland', 'Nashik',
  'Ooty', 'Pondicherry', 'Puri', 'Ranthambore', 'Rishikesh',
  'Shillong', 'Sikkim', 'Spiti Valley', 'Sundarbans', 'Surat',
  'Tawang', 'Udaipur', 'Varanasi', 'Varkala', 'Wayanad',
];

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi',
  'Kannada', 'Gujarati', 'Punjabi', 'Malayalam', 'Odia', 'Urdu',
  'Assamese', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin',
];

const BUDGETS = [
  { id: 'budget', label: 'Budget', desc: 'Under ₹3,000/day' },
  { id: 'mid-range', label: 'Mid-Range', desc: '₹3,000–₹8,000/day' },
  { id: 'luxury', label: 'Luxury', desc: 'Above ₹8,000/day' },
];

const DURATIONS = [
  'Day trip', '1-3 days', '4-7 days', '1-2 weeks', '2+ weeks',
];

type SavedTrip = {
  id: string;
  location: string;
  interests: string[];
  created_at: string;
  trip_date: string | null;
  group_size: number | null;
  language: string | null;
  budget: string | null;
  duration: string | null;
};

export function TripPlanner({ onBack }: TripPlannerProps) {
  const { user } = useAuth();
  const [location, setLocation] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [tripDate, setTripDate] = useState('');
  const [groupSize, setGroupSize] = useState('1');
  const [language, setLanguage] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [showAllLocations, setShowAllLocations] = useState(false);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    setLoadingTrips(true);
    const { data, error } = await supabase
      .from('trips')
      .select('id, location, interests, created_at, trip_date, group_size, language, budget, duration')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSavedTrips(data as SavedTrip[]);
    }
    setLoadingTrips(false);
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredLocations = ALL_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );
  const visibleLocations = showAllLocations ? filteredLocations : filteredLocations.slice(0, 12);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!location.trim()) {
      setError('Please select a destination.');
      return;
    }
    if (selectedInterests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    if (!language) {
      setError('Please select a preferred language for your guide.');
      return;
    }
    if (!tripDate) {
      setError('Please select a travel date.');
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase
      .from('trips')
      .insert({
        location: location.trim(),
        interests: selectedInterests,
        trip_date: tripDate,
        group_size: parseInt(groupSize, 10),
        language,
        budget: budget || null,
        duration: duration || null,
      });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    setLocation('');
    setLocationSearch('');
    setSelectedInterests([]);
    setTripDate('');
    setGroupSize('1');
    setLanguage('');
    setBudget('');
    setDuration('');
    setSubmitting(false);
    loadTrips();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onBack();
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/10 text-saffron-600 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Plan Your Trip
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-navy-700 tracking-tight">
            Where do you want to travel?
          </h1>
          <p className="mt-2 text-navy-400 text-lg">
            Tell us your destination, preferred language, and travel details. We will match you with the right guides.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 sm:p-8 space-y-7">
              {/* Location search + grid */}
              <div>
                <label className="block text-sm font-bold text-navy-600 mb-2">
                  Your Destination
                </label>
                <div className="relative mb-3">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => {
                      setLocationSearch(e.target.value);
                      setShowAllLocations(false);
                    }}
                    placeholder="Search 60+ destinations across India..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
                  />
                </div>
                {/* Selected location display */}
                {location && (
                  <div className="mb-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-saffron-500/10 text-saffron-700 text-sm font-bold">
                    <MapPin className="w-4 h-4" />
                    {location}
                    <button
                      type="button"
                      onClick={() => { setLocation(''); setLocationSearch(''); }}
                      className="ml-1 text-saffron-500 hover:text-saffron-800"
                    >
                      ×
                    </button>
                  </div>
                )}
                {/* Location grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 rounded-xl border border-navy-100 bg-surface/50">
                  {visibleLocations.length === 0 && (
                    <p className="col-span-full text-center text-navy-300 text-sm py-4">
                      No destinations found. Try a different search.
                    </p>
                  )}
                  {visibleLocations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                        location === loc
                          ? 'bg-navy-700 text-white'
                          : 'bg-white hover:bg-saffron-500/10 text-navy-500 hover:text-saffron-600 border border-navy-100'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
                {!showAllLocations && filteredLocations.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllLocations(true)}
                    className="mt-2 text-xs font-semibold text-saffron-600 hover:text-saffron-700 transition-colors"
                  >
                    Show all {filteredLocations.length} destinations
                  </button>
                )}
              </div>

              {/* Travel Date & Group Size */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy-600 mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-navy-400" />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy-600 mb-2">
                    <Users className="w-3.5 h-3.5 inline mr-1.5 text-navy-400" />
                    Group Size
                  </label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                    ))}
                    <option value="15">10+ people</option>
                  </select>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-bold text-navy-600 mb-2">
                  <Languages className="w-3.5 h-3.5 inline mr-1.5 text-navy-400" />
                  Guide Language
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                        language === lang
                          ? 'border-saffron-500 bg-saffron-500/10 text-saffron-700'
                          : 'border-navy-100 bg-surface text-navy-500 hover:border-navy-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-bold text-navy-600 mb-3">
                  What kind of trip do you want?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INTERESTS.map((interest) => {
                    const selected = selectedInterests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 ${
                          selected
                            ? 'border-saffron-500 bg-saffron-500/10'
                            : 'border-navy-100 bg-surface hover:border-navy-200'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                          selected ? 'bg-saffron-500 text-navy-900' : 'bg-navy-100 text-navy-400'
                        }`}>
                          {selected ? <Check className="w-5 h-5" /> : <interest.icon className="w-5 h-5" />}
                        </div>
                        <span className={`text-sm font-semibold ${selected ? 'text-navy-700' : 'text-navy-500'}`}>
                          {interest.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Duration */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy-600 mb-2">
                    <Wallet className="w-3.5 h-3.5 inline mr-1.5 text-navy-400" />
                    Budget (optional)
                  </label>
                  <div className="space-y-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudget(budget === b.id ? '' : b.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
                          budget === b.id
                            ? 'border-saffron-500 bg-saffron-500/10'
                            : 'border-navy-100 bg-surface hover:border-navy-200'
                        }`}
                      >
                        <span className={`text-sm font-bold ${budget === b.id ? 'text-navy-700' : 'text-navy-500'}`}>
                          {b.label}
                        </span>
                        <span className="text-xs text-navy-400">{b.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy-600 mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1.5 text-navy-400" />
                    Duration (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(duration === d ? '' : d)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                          duration === d
                            ? 'border-saffron-500 bg-saffron-500/10 text-saffron-700'
                            : 'border-navy-100 bg-surface text-navy-500 hover:border-navy-200'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
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
                {submitting ? 'Saving...' : 'Find My Guide'}
                {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>

          {/* Saved trips */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-navy-600 uppercase tracking-wide mb-4">Your Saved Trips</h2>
            {loadingTrips ? (
              <div className="bg-white rounded-2xl shadow-card p-6 text-center text-navy-400 text-sm">
                Loading...
              </div>
            ) : savedTrips.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                <MapPin className="w-8 h-8 text-navy-200 mx-auto mb-3" />
                <p className="text-navy-400 text-sm">
                  No trips yet. Plan your first trip and it will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedTrips.map((trip) => (
                  <div key={trip.id} className="bg-white rounded-2xl shadow-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-saffron-500 flex-shrink-0" />
                      <span className="text-navy-700 font-bold text-sm">{trip.location}</span>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {trip.trip_date && (
                        <div className="flex items-center gap-1.5 text-xs text-navy-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(trip.trip_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      )}
                      {trip.language && (
                        <div className="flex items-center gap-1.5 text-xs text-navy-400">
                          <Languages className="w-3 h-3" />
                          {trip.language}
                        </div>
                      )}
                      {trip.group_size != null && (
                        <div className="flex items-center gap-1.5 text-xs text-navy-400">
                          <Users className="w-3 h-3" />
                          {trip.group_size} {trip.group_size === 1 ? 'person' : 'people'}
                        </div>
                      )}
                      {trip.duration && (
                        <div className="flex items-center gap-1.5 text-xs text-navy-400">
                          <Clock className="w-3 h-3" />
                          {trip.duration}
                        </div>
                      )}
                      {trip.budget && (
                        <div className="flex items-center gap-1.5 text-xs text-navy-400">
                          <Wallet className="w-3 h-3" />
                          <span className="capitalize">{trip.budget}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {trip.interests.map((interest) => {
                        const found = INTERESTS.find((i) => i.id === interest);
                        return (
                          <span
                            key={interest}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-saffron-500/10 text-saffron-600"
                          >
                            {found?.label ?? interest}
                          </span>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-navy-300">
                      Booked {new Date(trip.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
