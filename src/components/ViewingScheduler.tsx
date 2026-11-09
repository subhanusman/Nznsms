import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Compass, ShieldCheck, CheckCircle2, X, Download, FileText, AlertCircle } from 'lucide-react';
import { Property, ViewingRequest } from '../types/property';

interface ViewingSchedulerProps {
  properties: Property[];
  preselectedPropertyId?: string;
  onClearPreselection?: () => void;
}

export const ViewingScheduler: React.FC<ViewingSchedulerProps> = ({
  properties,
  preselectedPropertyId,
  onClearPreselection,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    preselectedPropertyId || properties[0]?.id || 'azure-coast-villa'
  );

  useEffect(() => {
    if (preselectedPropertyId) {
      setSelectedPropertyId(preselectedPropertyId);
    }
  }, [preselectedPropertyId]);

  const [viewingType, setViewingType] = useState<
    'In-Person Private Tour' | 'Virtual Guided 4K Walkthrough' | 'Helicopter Aerial Arrival'
  >('In-Person Private Tour');

  const [selectedDate, setSelectedDate] = useState<string>('2026-11-20');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('16:30 – Twilight Golden Hour');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [ndaRequested, setNdaRequested] = useState<boolean>(true);

  // Modal confirmation state
  const [confirmedRequest, setConfirmedRequest] = useState<ViewingRequest | null>(null);

  const selectedProperty =
    properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      return;
    }

    const randomRef = `NHS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: ViewingRequest = {
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      viewingType,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName,
      clientEmail,
      clientPhone: clientPhone || 'Unspecified',
      clientNotes,
      bookingRef: randomRef,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setConfirmedRequest(newRequest);
  };

  const handleDownloadCalendarDemo = () => {
    if (!confirmedRequest) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NEXTR Digital Solutions//NEXTR Haven & Stone Demo//EN
BEGIN:VEVENT
SUMMARY:NEXTR Haven & Stone VIP Viewing Demo - ${confirmedRequest.propertyTitle}
DESCRIPTION:Simulated demonstration viewing request for ${confirmedRequest.propertyTitle}. Ref: ${confirmedRequest.bookingRef}. Developed by NEXTR Digital Solutions & Services.
DTSTART:20261120T163000Z
DTEND:20261120T180000Z
LOCATION:${selectedProperty.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NEXTR-Viewing-Demo-${confirmedRequest.bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="viewing-scheduler" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl pb-10 border-b border-[#E7E4DC]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
            <span>Discreet Advisory Concierge</span>
            <span aria-hidden="true">·</span>
            <span>Simulated Private Booking</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
            VIP Property Viewing Concierge
          </h2>
          <p className="mt-2 text-sm text-[#5C574F] leading-relaxed">
            Arrange a tailored inspection of any residential estate or commercial property. Choose between chauffeured on-site tours, 4K virtual telepresence, or executive aerial arrival.
          </p>
        </div>

        {/* Scheduler Form Grid */}
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Property & Experience Configuration */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Property Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
                1. Select Asset For Viewing
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedPropertyId(prop.id)}
                    className={`p-3.5 border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedPropertyId === prop.id
                        ? 'border-[#9E7B3B] bg-white ring-1 ring-[#9E7B3B]'
                        : 'border-[#DDD9CE] bg-[#F7F5EE] hover:bg-white'
                    }`}
                  >
                    <img
                      src={prop.mainImage}
                      alt={prop.title}
                      className="w-14 h-12 object-cover bg-stone-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1A1A1A] truncate">{prop.title}</p>
                      <p className="text-[11px] text-[#706B62] truncate">{prop.location}</p>
                      <p className="text-[11px] text-[#9E7B3B] font-semibold tabular-nums mt-0.5">{prop.priceFormatted}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Modality */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
                2. Inspection Experience Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'In-Person Private Tour',
                    label: 'Private In-Person',
                    desc: 'Dedicated architectural advisor & chauffeured transit',
                  },
                  {
                    id: 'Virtual Guided 4K Walkthrough',
                    label: 'Virtual 4K Walkthrough',
                    desc: 'Live interactive telepresence with spatial scans',
                  },
                  {
                    id: 'Helicopter Aerial Arrival',
                    label: 'Helicopter Arrival',
                    desc: 'Private aerial approach and direct helipad landing',
                  },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setViewingType(type.id as any)}
                    className={`p-4 border text-left transition-all cursor-pointer ${
                      viewingType === type.id
                        ? 'border-[#1A1A1A] bg-white shadow-xs'
                        : 'border-[#DDD9CE] bg-[#FAF9F5] hover:border-[#B5AFA2]'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-[#1A1A1A]">
                      {type.label}
                    </span>
                    <span className="block mt-1 text-[11px] text-[#706B62] leading-snug">
                      {type.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Date & Time Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
                3. Preferred Date & Lighting Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-[11px] text-[#706B62] mb-1">Select Inspection Date</span>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9C9487] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min="2026-11-10"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] text-[#706B62] mb-1">Viewing Slot</span>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#9C9487] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
                    >
                      <option value="10:00 AM – Morning Architectural Light">10:00 AM – Morning Architectural Light</option>
                      <option value="13:30 – Midday Interior Inspection">01:30 PM – Midday Interior Inspection</option>
                      <option value="16:30 – Twilight Golden Hour">04:30 PM – Twilight Golden Hour (Recommended)</option>
                      <option value="19:30 – Evening Ambience & Illumination">07:30 PM – Evening Ambience & Illumination</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Client Credentials & Confirmation Submission */}
          <div className="lg:col-span-5 bg-white border border-[#E7E4DC] p-6 sm:p-8 shadow-sm">
            <div className="border-b border-[#EAE6DE] pb-4">
              <span className="text-xs uppercase tracking-wider text-[#9E7B3B] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Client Confidentiality Dossier</span>
              </span>
              <h3 className="font-serif-luxury text-2xl font-normal text-[#1A1A1A] mt-1">
                Guest Credentials
              </h3>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                  Full Name / Principal Representative *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Sinclair"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                  Confidential Contact Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. principal@sinclair-holdings.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                  Direct Secure Telephone (Optional for demonstration)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                  Special Architectural Inquiries or Security Protocols
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Requesting structural seismic blueprints, acoustic engineering reports, or translator for German/French..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-[#4A4843]">
                  <input
                    type="checkbox"
                    checked={ndaRequested}
                    onChange={(e) => setNdaRequested(e.target.checked)}
                    className="mt-0.5 accent-[#C5A059]"
                  />
                  <span className="text-[11px] leading-relaxed">
                    Require bilateral Non-Disclosure Agreement (NDA) execution prior to releasing sovereign architectural blueprints and owner deed history.
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#EAE6DE]">
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Simulated Viewing Request</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 text-[11px] text-[#857F73]">
              <AlertCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <p>
                <strong>Simulated Request Notice:</strong> Submitting this form creates a simulated digital confirmation pass within this browser session. No real-world viewing is scheduled.
              </p>
            </div>
          </div>
        </form>

        {/* Modal: Simulated Digital Viewing Pass Confirmation */}
        {confirmedRequest && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF9F5] border border-[#DDD9CE] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-[#1A1A1A]">
              <button
                onClick={() => setConfirmedRequest(null)}
                className="absolute top-4 right-4 p-2 text-[#706B62] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                aria-label="Close confirmation pass"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E7B3B] mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Simulated Confirmation Generated</span>
              </div>

              <h3 className="font-serif-luxury text-3xl font-normal text-[#1A1A1A]">
                VIP Viewing Demonstration Pass
              </h3>

              <p className="mt-1 text-xs text-[#5C574F]">
                Demonstration confirmation produced locally by NEXTR Haven & Stone.
              </p>

              {/* Digital Pass Card */}
              <div className="mt-6 border border-[#DDD9CE] bg-white p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAE6DE] pb-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#857F73] block">
                      Booking Reference
                    </span>
                    <span className="font-mono font-semibold text-[#1A1A1A] text-sm tabular-nums">
                      {confirmedRequest.bookingRef}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#857F73] block">
                      Status
                    </span>
                    <span className="font-semibold text-emerald-700">
                      Simulated Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#857F73] block">
                      Asset Selected
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedRequest.propertyTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#857F73] block">
                      Experience
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedRequest.viewingType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#857F73] block">
                      Date & Slot
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedRequest.date} · {confirmedRequest.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#857F73] block">
                      Principal
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedRequest.clientName}</span>
                  </div>
                </div>

                {/* Simulated QR Code / Pass Stamp */}
                <div className="pt-3 border-t border-[#EAE6DE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1C1B19] text-[#D4AF37] p-1 flex items-center justify-center font-mono text-[9px] text-center leading-tight">
                      NHS QR DEMO
                    </div>
                    <div className="text-[11px] text-[#706B62]">
                      <span className="font-medium text-[#1A1A1A] block">NEXTR Concierge Protocol</span>
                      <span>Encrypted client record simulation</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadCalendarDemo}
                    className="px-3 py-1.5 text-xs font-semibold tracking-wide border border-[#DDD9CE] hover:border-[#1A1A1A] text-[#1A1A1A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#9E7B3B]" />
                    <span>Download .ICS Demo</span>
                  </button>
                </div>
              </div>

              {/* Strict disclaimer */}
              <div className="mt-4 p-3 bg-[#F2EFE8] border border-[#DDD9CE] text-[11px] text-[#5C574F]">
                <strong>Clear Fictional Disclosure:</strong> This viewing pass is an illustrative frontend demonstration. No physical appointments or reservations are held with property owners.
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setConfirmedRequest(null)}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1A1A1A] text-white hover:bg-[#33312E] transition-colors cursor-pointer"
                >
                  Dismiss Pass
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
