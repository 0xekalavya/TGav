import { useState } from "react"
import { fetchTelegramPost } from "./utils/fetchPost"
import CardPreview, { ThreadCardPreview } from "./components/CardPreview"
import ThemePicker from "./components/ThemePicker"
import DownloadBtn from "./components/DownloadBtn"

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const MAX_THREAD_POSTS = 3

export default function App() {
  const [mode, setMode] = useState("single") // "single" | "thread"
  const [theme, setTheme] = useState("midnight")

  // single mode
  const [url, setUrl] = useState("")
  const [singleData, setSingleData] = useState(null)
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleError, setSingleError] = useState("")

  // thread mode
  const [threadUrls, setThreadUrls] = useState(["", ""])
  const [threadPosts, setThreadPosts] = useState([])
  const [threadLoading, setThreadLoading] = useState(false)
  const [threadError, setThreadError] = useState("")

  // ── Single mode handlers ──
  const handleSingleFetch = async () => {
    if (!url.trim()) return
    setSingleLoading(true)
    setSingleError("")
    setSingleData(null)
    try {
      const post = await fetchTelegramPost(url)
      setSingleData(post)
    } catch (e) {
      setSingleError(e.message || "Something went wrong")
    } finally {
      setSingleLoading(false)
    }
  }

  // ── Thread mode handlers ──
  const addThreadUrl = () => {
    if (threadUrls.length < MAX_THREAD_POSTS) {
      setThreadUrls([...threadUrls, ""])
    }
  }

  const removeThreadUrl = (index) => {
    setThreadUrls(threadUrls.filter((_, i) => i !== index))
  }

  const updateThreadUrl = (index, value) => {
    const updated = [...threadUrls]
    updated[index] = value
    setThreadUrls(updated)
  }

  const handleThreadFetch = async () => {
    const validUrls = threadUrls.filter(u => u.trim())
    if (validUrls.length < 2) {
      setThreadError("Add at least 2 post URLs to create a thread card")
      return
    }
    setThreadLoading(true)
    setThreadError("")
    setThreadPosts([])
    try {
      const posts = await Promise.all(validUrls.map(u => fetchTelegramPost(u)))
      setThreadPosts(posts)
    } catch (e) {
      setThreadError(e.message || "Failed to fetch one or more posts")
    } finally {
      setThreadLoading(false)
    }
  }

  const switchMode = (m) => {
    setMode(m)
    setSingleData(null)
    setThreadPosts([])
    setSingleError("")
    setThreadError("")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
          </svg>
          <span className="font-bold text-lg tracking-tight">TGav</span>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">beta</span>
        </div>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          Open Telegram →
        </a>
      </nav>

      {/* Main */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16 gap-10">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Free to use · No sign up required
        </div>

        {/* Heading */}
        <div className="text-center max-w-xl">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Turn Telegram posts into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> beautiful cards</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Single post or full thread - get a stunning shareable image in seconds.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
          <button
            onClick={() => switchMode("single")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "single"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Single Post
          </button>
          <button
            onClick={() => switchMode("thread")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              mode === "thread"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Thread Card
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full">new</span>
          </button>
        </div>

        {/* ── SINGLE MODE ── */}
        {mode === "single" && (
          <div className="w-full max-w-lg flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSingleFetch()}
                placeholder="https://t.me/channel/123"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              />
              <button
                onClick={handleSingleFetch}
                disabled={singleLoading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:opacity-40 rounded-xl font-semibold text-sm transition-all active:scale-95 whitespace-nowrap"
              >
                {singleLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Fetching...
                  </span>
                ) : "Generate →"}
              </button>
            </div>
            <p className="text-xs text-gray-600 text-center">
              Works with any public channel · Right click a post → Copy Post Link
            </p>
          </div>
        )}

        {/* ── THREAD MODE ── */}
        {mode === "thread" && (
          <div className="w-full max-w-lg flex flex-col gap-4">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-sm text-gray-400 font-medium">Add post URLs ({threadUrls.length}/{MAX_THREAD_POSTS})</p>

              {threadUrls.map((u, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="flex flex-col items-center mr-1 gap-1">
                    <span className="text-blue-400 text-xs font-mono font-bold">#{i + 1}</span>
                    {i < threadUrls.length - 1 && (
                      <div className="w-0.5 h-4 bg-blue-900 rounded-full" />
                    )}
                  </div>
                  <input
                    value={u}
                    onChange={e => updateThreadUrl(i, e.target.value)}
                    placeholder={`https://t.me/channel/${100 + i}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                  {threadUrls.length > 2 && (
                    <button
                      onClick={() => removeThreadUrl(i)}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              {threadUrls.length < MAX_THREAD_POSTS && (
                <button
                  onClick={addThreadUrl}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors mt-1 self-start"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add another post
                </button>
              )}
            </div>

            <button
              onClick={handleThreadFetch}
              disabled={threadLoading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-400 disabled:opacity-40 rounded-xl font-semibold text-sm transition-all active:scale-95"
            >
              {threadLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Fetching posts...
                </span>
              ) : "Generate Thread Card →"}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Add 2–3 related posts to combine them into one card
            </p>
          </div>
        )}

        {/* Errors */}
        {(singleError || threadError) && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl max-w-lg w-full">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {singleError || threadError}
          </div>
        )}

        {/* Results */}
        {(singleData || threadPosts.length > 0) && (
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {threadPosts.length > 0
                ? `Thread card ready! ${threadPosts.length} posts combined.`
                : "Card generated! Pick a theme and download."}
            </div>
            <ThemePicker theme={theme} setTheme={setTheme} />
            {singleData && <CardPreview data={singleData} theme={theme} />}
            {threadPosts.length > 0 && <ThreadCardPreview posts={threadPosts} theme={theme} />}
            <DownloadBtn />
          </div>
        )}

        {/* How it works */}
        {!singleData && threadPosts.length === 0 && (
          <div className="grid grid-cols-3 gap-4 max-w-lg w-full mt-4">
            {(mode === "single" ? [
              { step: "01", title: "Copy post link", desc: "Right click any Telegram post and copy its link" },
              { step: "02", title: "Paste & generate", desc: "Paste the link above and hit Generate" },
              { step: "03", title: "Download", desc: "Pick your theme and download the card as PNG" },
            ] : [
              { step: "01", title: "Copy post links", desc: "Copy 2 or 3 related post links from a channel" },
              { step: "02", title: "Paste all links", desc: "Add each URL in order — they'll stack into a thread" },
              { step: "03", title: "Download thread", desc: "Get one combined card with all posts as a story" },
            ]).map(item => (
              <div key={item.step} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                <span className="text-blue-400 text-xs font-mono font-bold">{item.step}</span>
                <p className="text-white text-sm font-semibold">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-8">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
          </svg>
            <span className="text-gray-500 text-xs">TGav © {new Date().getFullYear()} · Built with ❤️</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/tojixavirav" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs transition-colors group">
              <span className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <GithubIcon />
              </span>
              GitHub
            </a>
            <a href="https://instagram.com/toji_avirav" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-pink-400 text-xs transition-colors group">
              <span className="p-1.5 rounded-lg bg-white/5 group-hover:bg-pink-500/10 transition-colors">
                <InstagramIcon />
              </span>
              Instagram
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
