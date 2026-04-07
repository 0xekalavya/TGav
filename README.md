# TGav <img width="256" height="256" alt="vector" src="https://github.com/user-attachments/assets/17708647-aabe-49dc-8aa8-5af8306b274d" />


**Turn Telegram posts into beautiful, shareable cards.**

TGav is a web application that takes any public Telegram message link and converts it into a stunning, customizable image that you can instantly download and share on social media. 

## ✨ Features

- **Single Post Mode:** Paste any public Telegram post link to instantly generate a beautiful preview card.
- **Thread Mode:** Combine up to 3 related Telegram posts into a cohesive "Thread Card" that reads like a story.
- **Multiple Themes:** Choose between several stunning aesthetics to match your vibe:
  - 🌙 **Midnight:** Sleek, modern blue/dark default.
  - ⚫ **Dark:** Minimalist and clean dark mode.
  - ⚪ **Light:** Crisp, readable, and bright.
  - 🌈 **Gradient:** A vibrant purple/blue pop of color.
- **One-Click Download:** Save your generated card instantly as a high-quality PNG.
- **No Sign-Up Required:** 100% free, runs entirely in the browser.

## 🚀 Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS (for rapid, utility-first styling)
- **Image Generation:** `html2canvas` (for seamlessly converting React DOM elements to PNG images)
- **Data Fetching:** Custom web scraping logic utilizing `DOMParser` and proxy services to read public Telegram embeds.

## 🛠️ Local Development

Follow these steps to run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tgav.git
   cd tgav
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 💡 How it Works

Under the hood, TGav is lightweight and doesn't require official API keys! When you paste a URL:
1. It requests the public widget version of the Telegram message (`?embed=1`).
2. It routes the request through a proxy to bypass browser CORS restrictions.
3. It parses the HTML using the native `DOMParser` to extract the message text, channel name, author info, avatar, and timestamp.
4. The extracted data is passed into custom React components (`<CardPreview />`) resulting in a beautiful visual output!

## 🤝 Contributing

Contributions are always welcome! If you have any ideas, UI improvements, or bug reports, feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

