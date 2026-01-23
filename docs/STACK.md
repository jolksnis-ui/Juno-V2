# Juno Bank - Technology Stack

## Core Framework

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.x    | React framework with App Router |
| React        | 19.x    | UI library                      |
| TypeScript   | 5.x     | Type safety                     |
| Tailwind CSS | 4.x     | Utility-first styling           |

## Forms & Validation

| Package             | Purpose                                     |
| ------------------- | ------------------------------------------- |
| react-hook-form     | Form state management, minimal re-renders   |
| zod                 | Schema validation with TypeScript inference |
| @hookform/resolvers | Connects Zod schemas to React Hook Form     |

## Email

| Package | Purpose                                |
| ------- | -------------------------------------- |
| resend  | Email API for contact form submissions |

## UI Components

| Package                         | Purpose                      |
| ------------------------------- | ---------------------------- |
| @radix-ui/react-dialog          | Accessible modal dialogs     |
| @radix-ui/react-accordion       | Collapsible content sections |
| @radix-ui/react-dropdown-menu   | Dropdown menus               |
| @radix-ui/react-navigation-menu | Main site navigation         |
| @radix-ui/react-tooltip         | Tooltips                     |

Note: Radix UI provides headless (unstyled) components. All styling comes from Tailwind CSS based on Figma designs.

## Animation

| Package       | Purpose                             |
| ------------- | ----------------------------------- |
| framer-motion | Declarative animations and gestures |

## Utilities

| Package        | Purpose                                  |
| -------------- | ---------------------------------------- |
| clsx           | Conditional className construction       |
| tailwind-merge | Merge Tailwind classes without conflicts |

## Code Quality

| Package                     | Purpose                          |
| --------------------------- | -------------------------------- |
| ESLint                      | Code linting                     |
| Prettier                    | Code formatting                  |
| prettier-plugin-tailwindcss | Auto-sort Tailwind classes       |
| eslint-config-prettier      | Disable conflicting ESLint rules |

## Deployment

- **Platform**: Vercel
- **Domain**: TBD
- **Environment**: Production + Preview branches

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Environment Variables

See `.env.example` for required environment variables:

- `RESEND_API_KEY` - API key from Resend for email sending
- `CONTACT_EMAIL` - Destination email for contact form submissions

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   └── sections/          # Page sections
├── lib/
│   ├── utils.ts           # Utility functions (cn helper)
│   └── validations.ts     # Zod schemas
└── types/
    └── index.ts           # TypeScript type definitions

docs/
├── PRODUCT.md             # Product description
└── STACK.md               # This file
```

## Image Optimization

Images exported from Figma are optimized automatically by Next.js:

1. Export from Figma (SVG for icons/logos, PNG for photos)
2. Place in `public/images/`
3. Use `next/image` component
4. Automatic WebP/AVIF conversion, lazy loading, responsive sizing
