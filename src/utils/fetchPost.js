export async function fetchTelegramPost(url) {
  const match = url.match(/t\.me\/([a-zA-Z0-9_]+)\/(\d+)/)
  if (!match) throw new Error("Invalid Telegram URL")

  const [, channel, postId] = match

  const embedUrl = `https://t.me/${channel}/${postId}?embed=1&mode=tme`
  const proxy = `https://corsproxy.io/?${encodeURIComponent(embedUrl)}`

  const res = await fetch(proxy)
  if (!res.ok) throw new Error("Failed to fetch post")

  const html = await res.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  const text = doc.querySelector(".tgme_widget_message_text")?.innerText || ""
  const author = doc.querySelector(".tgme_widget_message_owner_name")?.innerText || channel
  const datetime = doc.querySelector(".tgme_widget_message_date time")?.getAttribute("datetime") || ""

  
  const avatarStyle = doc.querySelector(".tgme_widget_message_user_photo i")?.getAttribute("style") || ""
  const avatarMatch = avatarStyle.match(/url\(['"]?(.*?)['"]?\)/)
  const rawAvatar = avatarMatch ? avatarMatch[1] : null

  
  const avatar = rawAvatar
    ? `https://corsproxy.io/?${encodeURIComponent(rawAvatar)}`
    : null

  return { channel, text, author, datetime, avatar }
}