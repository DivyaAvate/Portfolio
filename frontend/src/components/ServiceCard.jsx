import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <article className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform">
      <h3 className="text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 text-slate-300">{service.description}</p>
      <p className="mt-3 text-sm text-violet-300">Tech: {service.tech.join(', ')}</p>
      <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
        Hire Me <ArrowRight size={14} />
      </a>
    </article>
  );
}
