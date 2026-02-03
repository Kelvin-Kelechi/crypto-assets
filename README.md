# Crypto Assets Dashboard

A modern, high-performance web application for tracking cryptocurrency assets. Built with React, TypeScript, and Tailwind CSS, featuring a beautiful glassmorphism UI with smooth animations and comprehensive dark mode support.

## Features

- **Real-time Data**: Fetches live cryptocurrency data from CoinGecko API.
- **Modern UI/UX**:
  - Glassmorphism design language
  - Smooth Framer Motion animations
  - Responsive grid layout (Mobile to Desktop)
  - Interactive hover effects
- **Advanced Search**:
  - Real-time filtering
  - Smart auto-suggestions dropdown
  - Adaptive styling for both themes
- **Theme System**:
  - **Dark Mode (Default)**: Deep emerald/gray aesthetics
  - **Light Mode**: Clean, crisp white/green theme
  - **Immediate Switching**: Zero-latency theme toggling
  - **System Sync**: Respects system preferences
- **Performance**:
  - Efficient pagination
  - Optimized re-renders
  - Lazy loading for images
  - Fast Refresh compatible architecture

## Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [CoinGecko Public API](https://www.coingecko.com/en/api)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kelvin-Kelechi/crypto-assets.git
   cd crypto-assets
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory.

## Project Structure

```
src/
├── api/
│   └── cryptoApi.ts        # CoinGecko API integration
├── assets/
│   └── react.svg
├── components/
│   ├── CryptoItem.tsx      # Individual asset card component
│   ├── ErrorMessage.tsx    # Error display component
│   ├── Header.tsx          # App header with search & theme toggle
│   ├── Loading.tsx         # Loading spinner component
│   ├── Pagination.tsx      # Pagination controls
│   └── ThemeToggle.tsx     # Theme switcher button
├── context/
│   ├── ThemeContext.tsx    # Theme provider component
│   └── ThemeContextDefinition.ts # Theme context definition
├── hooks/
│   ├── useCryptoData.ts    # Data fetching custom hook
│   └── useTheme.ts         # Theme consumption hook
├── types/
│   └── index.ts            # TypeScript interfaces (CryptoAsset, Theme)
├── App.tsx                 # Main application layout & logic
├── main.tsx                # Application entry point
└── index.css               # Global styles & Tailwind directives
```

## Design System

- **Colors**: Primary Emerald/Green palette
- **Typography**: Sans-serif (Inter/System UI)
- **Effects**: Backdrop blur, soft shadows, gradient accents

## License

This project is licensed under the MIT License - see the LICENSE file for details.
