export default function SkillCard({ title, icon: Icon, items }) {
  return (
    <article className="glass rounded-2xl p-6 hover:border-violet-400/60 transition-colors border border-white/10">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Icon size={18} className="text-violet-300" /> {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span key={skill} className="badge border-white/20 hover:border-violet-400/70">{skill}</span>
        ))}
      </div>
    </article>
  );
}
