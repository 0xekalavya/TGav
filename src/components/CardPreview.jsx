const themeStyles = {
  dark: {
    wrapper: "bg-gray-900 text-white",
    sub: "text-gray-400",
    border: "border border-gray-700",
    footer: "text-gray-500",
    logo: "text-blue-400",
    divider: "bg-gray-700",
    thread: "bg-gray-700",
  },
  light: {
    wrapper: "bg-white text-gray-900",
    sub: "text-gray-500",
    border: "border border-gray-200",
    footer: "text-gray-400",
    logo: "text-blue-500",
    divider: "bg-gray-100",
    thread: "bg-gray-200",
  },
  gradient: {
    wrapper: "bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white",
    sub: "text-purple-200",
    border: "",
    footer: "text-blue-200",
    logo: "text-white",
    divider: "bg-white/20",
    thread: "bg-white/30",
  },
  midnight: {
    wrapper: "bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white",
    sub: "text-blue-300",
    border: "border border-blue-900",
    footer: "text-blue-400",
    logo: "text-blue-300",
    divider: "bg-blue-900",
    thread: "bg-blue-700",
  },
}

function formatDate(datetime) {
  if (!datetime) return ""
  try {
    return new Date(datetime).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    })
  } catch {
    return ""
  }
}

function Avatar({ data, size = "w-11 h-11" }) {
  return data.avatar ? (
    <img src={data.avatar} className={`${size} rounded-full object-cover`} alt="avatar" />
  ) : (
    <div className={`${size} rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
      {data.author?.charAt(0).toUpperCase()}
    </div>
  )
}

function TelegramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
    </svg>
  )
}

export default function CardPreview({ data, theme }) {
  const s = themeStyles[theme] || themeStyles.dark

  return (
    <div id="card" className={`rounded-2xl p-6 w-[420px] shadow-2xl ${s.wrapper} ${s.border}`}>
      <div className="flex items-center gap-3 mb-4">
        <Avatar data={data} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">{data.author}</p>
          <p className={`text-xs ${s.sub}`}>@{data.channel}</p>
        </div>
        <TelegramIcon className={`w-6 h-6 flex-shrink-0 ${s.logo}`} />
      </div>
      <div className={`h-px mb-4 ${s.divider}`} />
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
        {data.text || "No text content"}
      </p>
      <div className={`flex items-center justify-between mt-4 pt-3 border-t ${theme === "light" ? "border-gray-100" : "border-white/10"}`}>
        <p className={`text-xs ${s.footer}`}>{formatDate(data.datetime)}</p>
        <p className={`text-xs ${s.footer}`}>t.me/{data.channel}</p>
      </div>
    </div>
  )
}

export function ThreadCardPreview({ posts, theme }) {
  const s = themeStyles[theme] || themeStyles.dark
  const first = posts[0]

  return (
    <div id="card" className={`rounded-2xl p-6 w-[420px] shadow-2xl ${s.wrapper} ${s.border}`}>

      {/* Thread header */}
      <div className="flex items-center gap-3 mb-5">
        <Avatar data={first} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">{first.author}</p>
          <p className={`text-xs ${s.sub}`}>@{first.channel}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme === "light" ? "bg-blue-100 text-blue-600" : "bg-blue-500/20 text-blue-400"}`}>
            Thread · {posts.length} posts
          </span>
          <TelegramIcon className={`w-5 h-5 ${s.logo}`} />
        </div>
      </div>

      <div className={`h-px mb-5 ${s.divider}`} />

      {/* Posts */}
      <div className="flex flex-col gap-0">
        {posts.map((post, index) => (
          <div key={index} className="flex gap-3">

            {/* Thread line */}
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${s.thread}`} />
              {index < posts.length - 1 && (
                <div className={`w-0.5 flex-1 my-1 ${s.thread} opacity-40`} />
              )}
            </div>

            {/* Post content */}
            <div className={`flex-1 pb-4 ${index < posts.length - 1 ? "" : ""}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-mono ${s.sub}`}>#{index + 1}</span>
                <span className={`text-xs ${s.footer}`}>{formatDate(post.datetime)}</span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {post.text || "No text content"}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`h-px mt-2 mb-3 ${s.divider}`} />
      <div className="flex items-center justify-between">
        <p className={`text-xs ${s.footer}`}>t.me/{first.channel}</p>
        <p className={`text-xs ${s.footer}`}>{posts.length} posts · TGav</p>
      </div>

    </div>
  )
}