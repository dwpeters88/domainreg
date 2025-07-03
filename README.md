# DomainReg - Domain Registration Platform

A modern domain registration platform built with Astro, React, and TypeScript, featuring integration with South African payment providers PayFast and Peach Payments.

## 🚀 Features

- **Domain Search & Registration**: Search for available domains across multiple TLDs
- **User Authentication**: Secure sign-up and login system
- **Payment Integration**: 
  - PayFast integration for local South African payments
  - Peach Payments for credit card processing
- **Modern UI**: Clean, responsive design with dark mode support
- **Type Safety**: Full TypeScript support throughout the application

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PayFast merchant account (for production)
- Peach Payments account (for production)

## 🛠️ Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd domainreg
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PUBLIC_API_URL=http://localhost:4321

   # JWT Secret for authentication
   JWT_SECRET=your-secret-key-here

   # PayFast Configuration
   PAYFAST_MERCHANT_ID=your-merchant-id
   PAYFAST_MERCHANT_KEY=your-merchant-key
   PAYFAST_PASSPHRASE=your-passphrase
   PAYFAST_SANDBOX=true
   PUBLIC_PAYFAST_SANDBOX_URL=https://sandbox.payfast.co.za/eng/process
   PUBLIC_PAYFAST_LIVE_URL=https://www.payfast.co.za/eng/process

   # Peach Payments Configuration
   PEACH_ENTITY_ID=your-entity-id
   PEACH_SECRET=your-secret
   PEACH_SANDBOX=true
   PUBLIC_PEACH_SANDBOX_URL=https://test.oppwa.com
   PUBLIC_PEACH_LIVE_URL=https://oppwa.com

   # Domain Registration API
   DOMAIN_REGISTRAR_API_KEY=your-api-key
   DOMAIN_REGISTRAR_API_URL=https://api.domainregistrar.com
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:4321`

## 🏗️ Project Structure

```
domainreg/
├── src/
│   ├── components/       # React components
│   │   ├── DomainSearch.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── layouts/         # Astro layouts
│   │   └── Layout.astro
│   ├── lib/            # Utility functions
│   │   ├── api.ts      # API client
│   │   ├── auth.ts     # Authentication helpers
│   │   ├── validation.ts # Form validation schemas
│   │   └── payments/   # Payment integrations
│   │       ├── payfast.ts
│   │       └── peach.ts
│   ├── pages/          # Astro pages (routes)
│   │   ├── index.astro # Homepage
│   │   ├── login.astro # Login page
│   │   ├── register.astro # Registration page
│   │   └── api/        # API routes
│   │       └── domains/
│   │           └── search.ts
│   ├── styles/         # Global styles
│   │   └── global.css
│   └── types/          # TypeScript types
│       └── index.ts
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
├── tailwind.config.cjs # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## 🔧 Development

### Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI commands |

### API Routes

The application includes mock API routes for development:

- `GET /api/domains/search?domain={domain}` - Search for domain availability

### Payment Integration

#### PayFast
- Sandbox mode is enabled by default
- Update merchant credentials in `.env` for production
- Implements MD5 signature verification for security

#### Peach Payments
- Uses checkout widget for card payments
- Sandbox credentials required for testing
- Supports Visa, Mastercard, and Amex

## 🚧 TODO

- [ ] Implement real domain registrar API integration
- [ ] Add user dashboard for managing domains
- [ ] Implement domain renewal functionality
- [ ] Add email notifications
- [ ] Set up database for user and domain management
- [ ] Add comprehensive error handling
- [ ] Implement rate limiting for API routes
- [ ] Add domain transfer functionality
- [ ] Create admin panel for domain management

## 🔒 Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Payment signatures are verified
- HTTPS is required for production
- Environment variables for sensitive data

## 📝 License

[Your License Here]

## 🤝 Contributing

[Contributing guidelines]
