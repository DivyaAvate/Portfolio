import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Github, Link as LinkIcon, Linkedin, Mail, Phone, Send, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import { projects, services, skills, testimonials } from './data';
import { useGithubRepos } from './hooks/useGithubRepos';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Section({ id, title, children }) {
  return (
    <motion.section id={id} className="max-w-6xl mx-auto px-4 py-16" variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <h2 className="section-title mb-8">{title}</h2>
      {children}
    </motion.section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const { repos, loading: repoLoading } = useGithubRepos('divyaavate');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const submitForm = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('Unable to send right now. Please email directly.');
    }
  };

  if (loading) {
    return <div className="h-screen bg-base grid place-content-center text-xl font-semibold">Loading Portfolio...</div>;
  }

  return (
    <div className="bg-base min-h-screen bg-gradientGlow">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="pt-28">
        <section id="home" className="max-w-6xl mx-auto px-4 py-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="badge border-emerald-400/40 bg-emerald-500/10 text-emerald-300">
            <Sparkles size={14} /> Available for Freelance Work
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            Avate Divya Mahesh <br /> <span className="text-violet-300">Full Stack Java Developer</span>
          </motion.h1>
          <p className="text-2xl mt-6 max-w-3xl">I build fast, scalable backend systems for modern web apps</p>
          <p className="text-slate-300 mt-3 max-w-2xl">Helping startups and businesses create reliable, high-performance applications.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#contact" className="px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 transition font-semibold">Hire Me</a>
            <a href="#projects" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">View Projects</a>
          </div>
        </section>

        <Section id="about" title="About Me">
          <div className="glass rounded-2xl p-6 text-slate-300 leading-relaxed">
            Results-driven Java Software Developer with expertise in Spring Boot, REST APIs, and scalable backend systems. I specialize in building high-performance applications and integrating them with modern frontend technologies.
            <br /><br />
            I enjoy solving complex backend challenges, optimizing system performance, and designing clean architectures that help businesses scale confidently.
          </div>
        </Section>

        <Section id="services" title="Services">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-slate-300">{service.problem}</p>
                <p className="mt-3 text-sm text-violet-300">Tech: {service.tech.join(', ')}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Hire Me <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group} className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => <span key={skill} className="badge border-white/20 hover:border-violet-400/70">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold">Online Munim Software Pvt. Ltd.</h3>
            <p className="text-violet-300">Full Stack Developer | July 2025 – December 2025</p>
            <ul className="list-disc pl-6 mt-4 text-slate-300 space-y-2">
              <li>Developed ERP modules for accounting and business operations.</li>
              <li>Built REST APIs for internal and external integrations.</li>
              <li>Designed expense and transaction management systems.</li>
            </ul>
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article key={project.name} className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-sm mt-2 text-slate-300"><strong>Problem:</strong> {project.problem}</p>
                <p className="text-sm mt-2 text-slate-300"><strong>Solution:</strong> {project.solution}</p>
                <p className="text-sm mt-2 text-slate-300"><strong>Features:</strong> {project.features.join(', ')}</p>
                <p className="text-sm mt-2 text-slate-300"><strong>Impact:</strong> {project.impact}</p>
                <div className="flex flex-wrap gap-2 mt-3">{project.stack.map((s) => <span key={s} className="badge border-white/20">{s}</span>)}</div>
                <div className="flex gap-4 mt-4 text-sm">
                  <a href={project.github} className="inline-flex items-center gap-1"><Github size={14} /> GitHub</a>
                  <a href={project.demo} className="inline-flex items-center gap-1"><LinkIcon size={14} /> Live Demo</a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Latest GitHub Repositories</h3>
            {repoLoading ? <p>Loading repositories...</p> : (
              <div className="grid md:grid-cols-3 gap-4">
                {repos.length ? repos.map((repo) => (
                  <a key={repo.id} href={repo.html_url} className="border border-white/10 rounded-xl p-4 hover:border-violet-400/70 transition">
                    <p className="font-semibold">{repo.name}</p>
                    <p className="text-xs text-slate-400 mt-2">{repo.language || 'Code'} · ★ {repo.stargazers_count}</p>
                  </a>
                )) : <p>No repositories found yet.</p>}
              </div>
            )}
          </div>
        </Section>

        <Section id="achievements" title="Achievements & Certifications">
          <ul className="grid md:grid-cols-2 gap-3 text-slate-200">
            {['React.js & Core Java Certification', 'Excellence Award 2023-24', 'Avishkar Competition (Zonal Level)', 'State-Level Poster Presentation', 'C Programming Certification'].map((a) => (
              <li key={a} className="glass rounded-xl p-4">{a}</li>
            ))}
          </ul>
        </Section>

        <Section id="testimonials" title="Testimonials">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="glass rounded-2xl p-5">
                <p className="text-slate-300">“{testimonial.text}”</p>
                <footer className="mt-4 text-sm text-violet-300">{testimonial.name} · {testimonial.role}</footer>
              </blockquote>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Let's Work Together">
          <p className="text-slate-300 mb-6">I respond within 24 hours.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <a href="mailto:divyaaute06@gmail.com" className="flex items-center gap-3"><Mail size={18} /> divyaaute06@gmail.com</a>
              <a href="tel:+917620022754" className="flex items-center gap-3"><Phone size={18} /> +91 7620022754</a>
              <a href="https://linkedin.com/in/divya-avate-21a946282" className="flex items-center gap-3"><Linkedin size={18} /> LinkedIn Profile</a>
              <a href="https://wa.me/917620022754" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold">WhatsApp</a>
            </div>
            <form onSubmit={submitForm} className="glass rounded-2xl p-6 space-y-4">
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-32" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <button className="px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 font-semibold inline-flex items-center gap-2">Send Message <Send size={16} /></button>
              {status && <p className="text-sm text-slate-300">{status}</p>}
            </form>
          </div>
        </Section>
      </main>

      <a href="#contact" className="fixed bottom-5 right-5 bg-violet-500 p-3 rounded-full shadow-lg" aria-label="Hire me quick action">
        <BriefcaseBusiness size={18} />
      </a>
    </div>
  );
}
