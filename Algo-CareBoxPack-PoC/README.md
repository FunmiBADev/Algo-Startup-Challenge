# CareBox Pack - Wellness Dashboard (Algorand Blockchain POC)

A mobile-responsive TypeScript React web application that serves as the foundation for Algorand blockchain integration, featuring wellness tracking, achievement badges, and NFT claiming capabilities.

## Features

- **Mobile-Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme System**: Light/Dark mode with dynamic time-based gradient backgrounds
- **Achievement Tracking**: Streak-based wellness milestones with NFT badge claiming
- **Wallet Integration**: Ready for Algorand wallet integration (Pera, Defly, KMD)
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **@txnlab/use-wallet-react** for Algorand wallet integration
- **Context API** for state management (Theme, Streak)

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx              # Main layout component
│   ├── navigation/                # Navigation components
│   │   ├── Sidebar.tsx            # Desktop sidebar
│   │   └── BottomNav.tsx          # Mobile bottom navigation
│   ├── views/                     # View components
│   │   ├── HomeView.tsx           # Home dashboard
│   │   ├── SettingsView.tsx      # Settings page
│   │   ├── AchievementsView.tsx   # Achievement badges grid
│   │   └── ThemeSettingsView.tsx  # Theme customization
│   └── modals/
│       └── ClaimModal.tsx         # NFT claiming modal
├── contexts/                      # React contexts
│   ├── ThemeContext.tsx           # Theme state management
│   └── StreakContext.tsx          # Streak simulation state
├── types/                         # TypeScript types
│   └── index.ts
├── utils/                         # Utility functions
│   └── theme.ts                   # Theme utilities
├── constants/                     # Constants
│   └── achievements.ts            # Achievement definitions
├── styles/
│   └── main.css                   # Global styles
└── App.tsx                        # Root component
```

## Getting Started

### Prerequisites

- Node.js >= 20.0
- npm >= 9.0

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_ALGOD_NETWORK=testnet
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_TOKEN=
```

For local development:

```env
VITE_ALGOD_NETWORK=localnet
```

### Security Notes

The project includes npm package overrides to address security vulnerabilities in transitive dependencies (specifically the `ws` package used by wallet connectors). The override ensures a safe version of `ws` (7.5.10) is used, resolving DoS vulnerabilities in older versions.

Some vulnerabilities may still appear in `npm audit` reports from older wallet dependencies (`@blockshake/defly-connect`, `@perawallet/connect`). These are in transitive dependencies and do not affect runtime security once the override is applied.

**Note**: After installing dependencies, the `ws` override should significantly reduce the number of vulnerabilities. The remaining moderate vulnerabilities are typically in development dependencies and do not affect production builds.

## Features Overview

### Theme System

- Light and Dark modes
- Dynamic gradient backgrounds that change based on time of day
- Theme preference persisted in localStorage

### Achievement System

- 6 milestone badges (10, 30, 60, 90, 180, 365 days)
- Three badge states: Locked, Claim-Pending, Claimed
- NFT claiming modal with transaction simulation
- Streak simulation for POC testing

### Navigation

- Desktop: Sidebar navigation
- Mobile: Bottom navigation bar
- View-based routing system

## Next Steps for Algorand Integration

Based on `AlgoCareBoxPackIntegration.md`, the next steps include:

1. **Smart Contract Integration**:

   - OnboardingRewards contract for first-time user rewards
   - AchievementTracker contract (optional)

2. **NFT Minting Service**:

   - Pinata IPFS integration for metadata storage
   - ARC-3 compliant NFT creation

3. **Wallet Connection**:

   - Connect Pera/Defly wallets
   - Handle wallet state and transactions

## Development Notes

- The current implementation uses dummy data for streak tracking (as per POC requirements)
- Wallet integration is set up but not fully connected to NFT minting yet
- All components are mobile-responsive and follow the original HTML design

## License

Private - CareBox Pack Development Team
