import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Residential Acquisition',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FAF9F5] border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl pb-10 border-b border-[#E7E4DC]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E7B3B] mb-2 flex items-center gap-2">
            <span>Direct Client Services</span>
            <span aria-hidden="true">·</span>
            <span>NEXTR Digital Solutions & Services</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
            Private Advisory Inquiries
          </h2>
          <p className="mt-2 text-sm text-[#5C574F] leading-relaxed">
            Connect directly with our digital team for bespoke web demonstrations, private real estate showcase implementations, or custom enterprise architecture.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7E4DC] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif-luxury text-2xl font-normal text-[#1A1A1A]">
                Global Representative Desk
              </h3>
              <p className="text-xs text-[#5C574F] leading-relaxed">
                NEXTR Haven & Stone is curated by <strong>NEXTR Digital Solutions & Services</strong>. Reach out for real estate technology solutions and premium web implementations.
              </p>

              {/* Email channel */}
              <div className="pt-4 border-t border-[#EAE6DE]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FAF9F5] border border-[#DDD9CE] text-[#1A1A1A]">
                    <Mail className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">
                      Direct Email Inquiry
                    </span>
                    <a
                      href="mailto:nextrsolutions@gmail.com"
                      className="text-sm font-medium text-[#1A1A1A] hover:text-[#9E7B3B] transition-colors"
                    >
                      nextrsolutions@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Channel - STRICT RULE: Visible CTA says exactly "Visit", phone number NEVER visible */}
              <div className="pt-4 border-t border-[#EAE6DE]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#FAF9F5] border border-[#DDD9CE] text-[#1A1A1A]">
                      <MessageCircle className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A746B] font-semibold block">
                        Instant WhatsApp Channel
                      </span>
                      <span className="text-xs text-[#5C574F]">
                        Direct Messaging Desk
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/923239943441"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </a>
                </div>
              </div>

              {/* Advisory Discretion Assurance */}
              <div className="pt-4 border-t border-[#EAE6DE] text-xs text-[#7A746B]">
                <p>
                  All inquiries sent through this demonstration form are simulated locally. No confidential or identifying personal data is stored on external databases.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-white border border-[#E7E4DC] p-6 sm:p-8">
            <h3 className="font-serif-luxury text-2xl font-normal text-[#1A1A1A] mb-1">
              Request Advisory Consultation
            </h3>
            <p className="text-xs text-[#5C574F] mb-6">
              Complete the demonstration form below for an illustrative advisory consultation.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#FAF9F5] border border-[#C5A059]/40 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#C5A059] mx-auto" />
                <h4 className="font-serif-luxury text-2xl font-normal text-[#1A1A1A]">
                  Consultation Request Simulated
                </h4>
                <p className="text-xs text-[#5C574F] max-w-md mx-auto">
                  Thank you, {formData.name}. Your demonstration inquiry for {formData.inquiryType} has been simulated locally. For real development and solutions, please contact <strong>nextrsolutions@gmail.com</strong> or click Visit above.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'Residential Acquisition', message: '' });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#F2EFE8] transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                      Corporate / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. elena@rostova-capital.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A] cursor-pointer"
                  >
                    <option value="Residential Acquisition">Residential Acquisition & Villa Portfolio</option>
                    <option value="Commercial Acquisition">Commercial Grade-A Tower / Retail Flagship</option>
                    <option value="Digital Platform Build">Website / App Architecture Inquiry (NEXTR Solutions)</option>
                    <option value="Private Office Representation">Family Office Advisory Representation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#524E48] mb-1 text-[11px]">
                    Message & Architectural Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify target geographies, capital parameters, or digital real estate platform specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#DDD9CE] focus:outline-none focus:border-[#C5A059] text-[#1A1A1A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-[#33312E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Send Advisory Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
