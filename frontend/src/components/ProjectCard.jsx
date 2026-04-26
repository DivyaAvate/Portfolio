import { Github, Link as LinkIcon } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <article className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform">
      <h3 className="text-xl font-semibold">{project.name}</h3>
      <p className="text-sm mt-2 text-slate-300"><strong>Problem:</strong> {project.problem}</p>
      <p className="text-sm mt-2 text-slate-300"><strong>Solution:</strong> {project.solution}</p>
      <p className="text-sm mt-2 text-slate-300"><strong>Features:</strong> {project.features.join(', ')}</p>
      <p className="text-sm mt-2 text-slate-300"><strong>Impact:</strong> {project.impact}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {project.stack.map((stack) => (
          <span key={stack} className="badge border-white/20">{stack}</span>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <a href={project.github} className="inline-flex items-center gap-1"><Github size={14} /> GitHub</a>
        <a href={project.demo} className="inline-flex items-center gap-1"><LinkIcon size={14} /> Live Demo</a>
      </div>
    </article>
  );
}
