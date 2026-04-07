import html2canvas from "html2canvas"

export default function DownloadBtn() {
  const handleDownload = async () => {
    const card = document.getElementById("card")
    const canvas = await html2canvas(card, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    })
    const link = document.createElement("a")
    link.download = "tg-card.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all active:scale-95"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download Card
    </button>
  )
}