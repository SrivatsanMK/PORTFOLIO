import { useRef, useState, FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FiGithub, FiSend } from 'react-icons/fi';
import { HiCheckCircle } from 'react-icons/hi';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'srivatsanmk2004@gmail.com',
    href: 'mailto:srivatsanmk2004@gmail.com',
    color: '#00D4FF',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+91 81481 90946',
    href: 'tel:+918148190946',
    color: '#7C3AED',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/SrivatsanMK',
    href: 'https://github.com/SrivatsanMK',
    color: '#ffffff',
  },
];

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_k7kmt1b';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2c4gz3p';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Eo4N0kfYRwsNb_3bo';

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'srivatsanmk2004@gmail.com',
        },
        publicKey
      );
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to send message via EmailJS:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClass = (error?: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/30 text-sm transition-all duration-200 outline-none focus:bg-white/8 ${error
      ? 'border-red-500/50 focus:border-red-500'
      : 'border-white/10 focus:border-neon-blue/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)]'
    }`;

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase">Let's Talk</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
            Get In <span className="text-neon-blue">Touch</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple" />
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            I'm open to full-time AI/ML roles, internships, and project collaborations.
            Let's build something remarkable together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="font-display font-semibold text-white text-lg mb-6">Contact Information</h3>
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.label === 'Email' || info.label === 'Phone' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                >
                  <info.icon size={18} style={{ color: info.color }} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-mono">{info.label}</p>
                  <p className="text-white/80 text-sm group-hover:text-white transition-colors font-medium">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Availability */}
            <div className="mt-6 p-4 rounded-xl bg-neon-blue/5 border border-neon-blue/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-mono font-medium">Available Now</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                Open to full-time AI/ML engineer roles, research positions, and freelance projects.
                Response within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <HiCheckCircle size={60} className="text-neon-blue mx-auto mb-4" />
                    </motion.div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-xs font-mono mb-1.5 uppercase tracking-wider">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClass(errors.name)}
                          id="contact-name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs font-mono mb-1.5 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={inputClass(errors.email)}
                          id="contact-email"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs font-mono mb-1.5 uppercase tracking-wider">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Job Opportunity / Collaboration / Inquiry"
                        className={inputClass(errors.subject)}
                        id="contact-subject"
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-xs mt-1 font-mono">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs font-mono mb-1.5 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about the opportunity, project, or how I can help..."
                        rows={5}
                        className={`${inputClass(errors.message)} resize-none`}
                        id="contact-message"
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-sm shadow-neon-blue hover:shadow-neon-blue-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      id="contact-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                    {submitError && (
                      <p className="text-red-400 text-xs text-center font-mono mt-2">{submitError}</p>
                    )}

                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
