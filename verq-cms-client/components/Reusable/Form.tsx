'use client';

import { useState } from 'react';
import { HiBolt } from 'react-icons/hi2';
import { BsTwitterX, BsCalendar2Date } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import { BsLinkedin } from 'react-icons/bs';
import Link from 'next/link';
import ContainerLayout from '@/containerLayout/ContainerLayout';

const socialLinks = [
  { name: 'Calendly',  href: 'https://calendly.com/verqapp',              icon: <BsCalendar2Date className="w-5 h-5" /> },
  { name: 'X',         href: 'https://x.com/verqapp',                    icon: <BsTwitterX className="w-5 h-5" /> },
  { name: 'Instagram', href: 'https://www.instagram.com/verqapp/',        icon: <RiInstagramFill className="w-5 h-5" /> },
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/verqapp/', icon: <BsLinkedin className="w-5 h-5" /> },
];

const INPUT_BASE =
  'w-full  border-b border-white/10  px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors duration-200 font-family-inter tracking-tighter leading-tighter';

export default function Form() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    website: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire up to your API
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSubmitting(false);
  };

  return (
    <ContainerLayout className=' px-10! py-10!'>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px] font-family-inter tracking-tighter leading-tight">

      {/* Left — video + socials */}
      <div className="relative overflow-hidden rounded-xl min-h-[300px] lg:min-h-auto">
        <video
          src="https://res.cloudinary.com/dkuievjm4/video/upload/v1767589752/e4d8fe34_ac0f_4485_9c56_716f218acdc1_hd_4b94982c6b.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      </div>

      {/* Right — form */}
      <div className="bg-[#121212] rounded-2xl border border-white/8  border-l-0 p-8 md:p-10 flex flex-col justify-center">
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
            {/* <h3 className="text-2xl text-secondary tracking-tighter mb-2">Book a Call</h3> */}

            {/* Name + Email */}
            <div className="grid grid-cols-1  gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs tracking-widest uppercase">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  className={INPUT_BASE}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs tracking-widest uppercase">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  className={INPUT_BASE}
                />
              </div>
            </div>

            {/* Contact + Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs tracking-widest uppercase">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={form.contact}
                  onChange={set('contact')}
                  className={INPUT_BASE}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs tracking-widest uppercase">
                  Website <span className="text-white/20 normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={set('website')}
                  className={INPUT_BASE}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white text-xs tracking-widest uppercase">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={set('message')}
                className={`${INPUT_BASE} resize-none`}
              />
            </div>

            {/* Submit */}
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

     <div className='grid grid-cols-2 md:grid-cols-4 gap-2 justify-end mt-6 md:mt-10 w-full md:w-auto self-end'>
                {socialLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className='bg-primary text-black py-6 rounded-full px-2 md:px-3 flex items-center justify-center transition-colors duration-200'
                    >
                        {link.icon}
                    </Link>
                ))}
            </div>
    </ContainerLayout>
  );
}
