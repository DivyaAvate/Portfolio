import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Blocks,
  BriefcaseBusiness,
  Database,
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Send,
  Sparkles,
  SquareCode,
  Wrench,
} from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ServiceCard from './components/ServiceCard';
import SkillCard from './components/SkillCard';
import { about, achievements, developer, experience, languages, projects, services, skills, testimonials } from './data';
import { useGithubRepos } from './hooks/useGithubRepos';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const skillIcons = {
  Frontend: Globe,
  Backend: SquareCode,
  Databases: Database,
  Tools: Wrench,
  Concepts: Blocks,
};

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="max-w-6xl mx-auto px-4 py-16"
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
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
  const { repos, loading: repoLoading } = useGithubRepos('DivyaAvate');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error();
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
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="badge border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
          >
            <Sparkles size={14} /> {developer.availability}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mt-6 leading-tight"
          >
            {developer.name} <br /> <span className="text-violet-300">{developer.title}</span>
          </motion.h1>

          <p className="text-2xl mt-6 max-w-3xl">{developer.tagline}</p>
          <p className="text-slate-300 mt-3 max-w-2xl">Helping startups and businesses create reliable, high-performance applications.</p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#contact" className="px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 transition font-semibold">Hire Me</a>
            <a href="#projects" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">View Projects</a>
            <a href={developer.contact.github} className="px-5 py-3 rounded-xl border border-violet-300/40 hover:bg-violet-400/20 transition font-semibold inline-flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
          </div>
        </section>

        <Section id="about" title="About Me">
          <div className="glass rounded-2xl p-6 text-slate-300 leading-relaxed">
            {about.summary}
            <br />
            <br />
            {about.personal}
          </div>
        </Section>

        <Section id="services" title="Services">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([group, list]) => (
              <SkillCard key={group} title={group} items={list} icon={skillIcons[group]} />
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="grid gap-6">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="text-violet-300">{item.company} | {item.duration}</p>
                <ul className="list-disc pl-6 mt-4 text-slate-300 space-y-2">
                  {item.highlights.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          <div className="mt-8 glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Latest GitHub Repositories</h3>
            {repoLoading ? (
              <p>Loading repositories...</p>
            ) : (
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
            {achievements.map((achievement) => (
              <li key={achievement} className="glass rounded-xl p-4">{achievement}</li>
            ))}
          </ul>
        </Section>

        <Section id="languages" title="Languages">
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-slate-200">
            {languages.map((language) => (
              <li key={language} className="glass rounded-xl p-4">{language}</li>
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
              <a href={`mailto:${developer.contact.email}`} className="flex items-center gap-3"><Mail size={18} /> {developer.contact.email}</a>
              <a href={`tel:${developer.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3"><Phone size={18} /> {developer.contact.phone}</a>
              <a href={developer.contact.linkedin} className="flex items-center gap-3"><Linkedin size={18} /> LinkedIn Profile</a>
              <a href={developer.contact.github} className="flex items-center gap-3"><Github size={18} /> GitHub Profile</a>
              <a href={developer.contact.whatsapp} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold">WhatsApp</a>
            </div>

            <form onSubmit={submitForm} className="glass rounded-2xl p-6 space-y-4">
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                placeholder="Name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
              />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-32"
                placeholder="Message"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                required
              />
              <button className="px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 font-semibold inline-flex items-center gap-2">
                Send Message <Send size={16} />
              </button>
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
