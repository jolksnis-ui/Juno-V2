# Juno Bank

Premium banking website for corporates and high net worth individuals.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Add your environment variables to `.env.local`:
   - `RESEND_API_KEY` - Get from [Resend](https://resend.com)
   - `CONTACT_EMAIL` - Your email for contact form submissions

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser, or run `npm run dev:open` in a second terminal to open it automatically (macOS).

**Using Cursor:** To see the project in the sidebar, use **File → Open Folder** and select this project folder. See [docs/DEVELOPING.md](docs/DEVELOPING.md) for details.

## Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start development server           |
| `npm run dev:open`     | Open http://localhost:3000 in browser (macOS) |
| `npm run build`        | Build for production      |
| `npm start`            | Start production server   |
| `npm run lint`         | Run ESLint                |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (headless)
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Deployment**: Vercel

See [docs/STACK.md](docs/STACK.md) for detailed stack documentation.

## Project Structure

```
src/
├── app/           # Next.js App Router pages & API
├── components/    # React components
│   ├── ui/        # Reusable UI components
│   └── sections/  # Page sections
├── lib/           # Utilities and helpers
└── types/         # TypeScript types
```

## Documentation

- [Developing in Cursor](docs/DEVELOPING.md) — open project, run dev, open browser, click between pages
- [Product Description](docs/PRODUCT.md)
- [Tech Stack](docs/STACK.md)
- [Deployment (Vercel, ветка `staging`)](docs/DEPLOYMENT.md)

## License

Private - All rights reserved.
