import { useState, useEffect, useMemo } from 'react';
import { X, MapPin, Calendar, Clock, Users, History, Check, ArrowRight, Sparkles, Star, BadgeCheck, Languages } from 'lucide-react';
import type { PlaceInfo } from '@/data';
import { getGuidesForPlace, type MockGuide } from '@/data';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

type PlaceDetailProps = {
  place: PlaceInfo | null;
  badge?: string;
  onClose: () => void;
  onBookGuide?: () => void;
};

export function PlaceDetail({ place, badge, onClose, onBookGuide }: PlaceDetailProps) {
  const { user } = useAuth();
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [groupSize, setGroupSize] = useState('1');
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (place) {
      setBooked(false);
      setError('');
      setTripDate('');
      setGroupSize('1');
      setInterests([]);
    }
  }, [place]);

  useEffect(() => {
    if (place) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [place]);

  const guides: MockGuide[] = useMemo(
    () => place ? getGuidesForPlace(place.name, place.guides) : [],
    [place]
  );

  if (!place) return null;

  const toggleInterest = (tag: string) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!tripDate) {
      setError('Please select a travel date.');
      return;
    }

    setBooking(true);

    if (user) {
      const { error: insertError } = await supabase
        .from('trips')
        .insert({
          location: place.name,
          interests: interests.length > 0 ? interests : place.tags,
          trip_date: tripDate,
          group_size: parseInt(groupSize, 10),
        });

      if (insertError) {
        setError(insertError.message);
        setBooking(false);
        return;
      }
    }

    setBooking(false);
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-fade-up">
        {/* Hero image */}
        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
          <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-navy-900/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy-900/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {badge && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-sm border border-saffron-400/30 text-saffron-300 text-xs font-bold tracking-wide">
                {badge}
              </span>
            </div>
          )}
          <div className="absolute bottom-4 left-5">
            <div className="flex items-center gap-1.5 text-saffron-300 text-xs font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              {place.state}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{place.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7">
          {/* Quick info */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface">
              <Calendar className="w-4 h-4 text-saffron-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-navy-300 uppercase tracking-wide">Best Time</p>
                <p className="text-xs font-semibold text-navy-600 leading-tight">{place.bestTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface">
              <Clock className="w-4 h-4 text-saffron-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-navy-300 uppercase tracking-wide">Duration</p>
                <p className="text-xs font-semibold text-navy-600 leading-tight">{place.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface">
              <Users className="w-4 h-4 text-saffron-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-navy-300 uppercase tracking-wide">Guides</p>
                <p className="text-xs font-semibold text-navy-600 leading-tight">{place.guides} available</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {place.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-saffron-500/10 text-saffron-600">
                {tag}
              </span>
            ))}
          </div>

          {/* History */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-navy-500" />
              <h3 className="text-sm font-extrabold text-navy-700 uppercase tracking-wide">History & Significance</h3>
            </div>
            <p className="text-navy-500 text-sm leading-relaxed">{place.history}</p>
          </div>

          {/* Available guides */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-navy-500" />
              <h3 className="text-sm font-extrabold text-navy-700 uppercase tracking-wide">Available Guides Here</h3>
            </div>
            <div className="space-y-3">
              {guides.map((g) => (
                <div key={g.id} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-navy-100 hover:border-saffron-200 transition-colors">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-navy-700 text-white flex items-center justify-center font-bold text-sm">
                    {g.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-navy-700 text-sm">{g.name}</span>
                      {g.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-navy-400 mb-1.5">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-saffron-500 fill-saffron-500" />
                        <span className="font-semibold text-navy-600">{g.rating}</span>
                        <span className="text-navy-300">({g.reviews})</span>
                      </span>
                      <span>{g.experienceYears} yr exp</span>
                      <span className="font-semibold text-navy-600">₹{g.pricePerDay}/day</span>
                    </div>
                    <p className="text-xs text-navy-400 leading-relaxed mb-2 line-clamp-2">{g.bio}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Languages className="w-3 h-3 text-navy-300" />
                      {g.languages.map((lang) => (
                        <span key={lang} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-navy-100 text-navy-500">{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking form */}
          {booked ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 mx-auto mb-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-navy-700 mb-1">Guide Request Sent!</h3>
              <p className="text-navy-400 text-sm">
                We have saved your trip to {place.name}. Our verified guides will be matched to your preferences.
              </p>
              {onBookGuide && (
                <button
                  onClick={onBookGuide}
                  className="mt-4 inline-flex items-center gap-2 text-saffron-600 font-semibold text-sm hover:text-saffron-700 transition-colors"
                >
                  View your trips
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleBook} className="rounded-2xl bg-navy-700 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-saffron-400" />
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">Book a Test for {place.name}</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wide mb-1.5">Travel Date</label>
                  <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wide mb-1.5">Group Size</label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-navy-700">{n} {n === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wide mb-2">Your Interests</label>
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag) => {
                    const selected = interests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterest(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selected
                            ? 'border-saffron-400 bg-saffron-500/20 text-saffron-300'
                            : 'border-white/20 bg-white/5 text-white/50 hover:border-white/40'
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 inline mr-1" />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <div className="mb-3 px-3 py-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={booking}
                className="group w-full flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-400 disabled:opacity-60 text-navy-900 font-bold px-6 py-3 rounded-xl transition-all duration-300"
              >
                {booking ? 'Sending...' : `Book a Test for ${place.name}`}
                {!booking && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>


            </form>
          )}
        </div>
      </div>
    </div>
  );
}
