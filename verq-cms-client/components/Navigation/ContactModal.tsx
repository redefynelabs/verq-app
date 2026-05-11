'use client';

import { useState, useEffect, useRef } from 'react';
import { HiBolt } from 'react-icons/hi2';
import { gsap } from 'gsap';

const INPUT_BASE =
  'w-full border-b border-white/10 px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors duration-200 font-family-inter tracking-tighter leading-tighter bg-transparent';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: '', email: '', contact: '', website: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwovkSUtHvAK5lzKNhURlh0t40ZGjaKNYwNysr6qwOba6htIMuJ14uDtPS010Dy5xwP/exec";

    try {
      // mode: 'no-cors' is required for Google Apps Script redirects
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      setSent(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!backdropRef.current || !panelRef.current) { onClose(); return; }
    gsap.to(panelRef.current, { y: 20, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose });
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!backdropRef.current || !panelRef.current) return;
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(panelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#101010] font-family-inter tracking-tighter leading-tight"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-10">
          {/* Left — video */}
          <div className="relative overflow-hidden rounded-xl min-h-[220px] lg:min-h-auto">
            <video
              src="https://res.cloudinary.com/dkuievjm4/video/upload/v1777023334/VERQ_Home_page_8mb_54e5986f2c_4889bcb907.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Right — form */}
          <div className=" rounded-2xl p-8 md:p-10 flex flex-col justify-center">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center py-12">
                <span className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <HiBolt className="text-primary text-2xl" />
                </span>
                <h3 className="text-2xl text-secondary tracking-tighter">Message sent!</h3>
                <p className="text-white/40 text-sm max-w-xs">We'll get back to you within 48 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', contact: '', website: '', message: '' }); }}
                  className="text-primary text-xs tracking-widest uppercase hover:underline mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-xs tracking-widest uppercase">Name</label>
                  <input type="text" required value={form.name} onChange={set('name')} className={INPUT_BASE} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-xs tracking-widest uppercase">Email</label>
                  <input type="email" required value={form.email} onChange={set('email')} className={INPUT_BASE} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-xs tracking-widest uppercase">Contact Number</label>
                    <input type="tel" required value={form.contact} onChange={set('contact')} className={INPUT_BASE} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-xs tracking-widest uppercase">
                      Website <span className="text-white/20 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input type="url" value={form.website} onChange={set('website')} className={INPUT_BASE} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-xs tracking-widest uppercase">Message</label>
                  <textarea required rows={4} value={form.message} onChange={set('message')} className={`${INPUT_BASE} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex items-center justify-center gap-2 bg-primary text-black font-medium px-6 py-4 rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <HiBolt className="text-lg" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}