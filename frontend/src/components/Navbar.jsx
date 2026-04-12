import { Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const links = ['Home', 'About', 'Services', 'Skills', 'Experience', 'Projects', 'Achievements', 'Testimonials', 'Contact'];

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="glass mx-auto mt-4 max-w-6xl rounded-2xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold">Divya.dev</a>
        <div className="hidden md:flex items-center gap-5 text-sm text-slate-300">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl border border-white/20">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl border border-white/20">
            <Menu size={16} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass md:hidden mx-4 mt-2 rounded-2xl p-4 grid gap-2">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
