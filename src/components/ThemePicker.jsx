const themes = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "gradient", label: "Gradient" },
  { id: "midnight", label: "Midnight" },
]

export default function ThemePicker({ theme, setTheme }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-gray-500 uppercase tracking-widest">Choose theme</p>
      <div className="flex gap-2 flex-wrap justify-center">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${theme === t.id
                ? "bg-blue-500 text-white scale-105 shadow-lg shadow-blue-500/25"
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}