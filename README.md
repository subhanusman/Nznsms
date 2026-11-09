# NEXTR Haven & Stone — Luxury Real Estate Website Demonstration

An architectural luxury residential and commercial real estate website demonstration engineered for **NEXTR Digital Solutions & Services**.

---

## 🏛️ Brand & Project Information

- **Brand Name**: NEXTR Haven & Stone
- **Company**: NEXTR Digital Solutions & Services
- **Official Inquiries Email**: `nextrsolutions@gmail.com`
- **WhatsApp Channel**: `https://wa.me/923239943441` (Visible action button formatted as "Visit")
- **Mandatory Attribution**: `Developed by NEXTR Digital Solutions & Services`
- **Content Classification**: Fictional demonstration portfolio with simulated financial estimations, architectural blueprints, and viewing concierge passes.

---

## ⚡ Technical Highlights

- **Architecture**: 100% Static Frontend SPA (Compatible with Cloudflare Pages, Vercel, Netlify, AWS S3 / CloudFront, and GitHub Pages).
- **Core Stack**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite.
- **Backend-Free**: Zero database, no Firebase, no Firestore, no external paid APIs, and no real estate MLS servers required.
- **Local Computations**: Real-time mortgage debt service calculations, escrow breakdown, 30-year amortization schedule, and simulated VIP viewing confirmation passes implemented entirely in local client-side JavaScript.
- **Imagery**: Ultra-high-resolution architectural captures generated specifically for this demonstration, paired with zero-broken-image resilience.

---

## 🚀 Cloudflare Pages Deployment Guide

Deploying this static project to **Cloudflare Pages** is turnkey and requires zero backend server configuration.

### Method 1: Git Integration (Recommended for Continuous Deployment)

1. **Push your repository** to GitHub, GitLab, or Bitbucket.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository: `nextr-haven-and-stone`.
4. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/` (leave blank or set to root)
   - **Node.js Version**: In **Environment Variables**, add `NODE_VERSION` = `20` (or higher).
5. Click **Save and Deploy**. Cloudflare Pages will build the static assets into `dist/` and distribute them globally across Cloudflare's edge network within seconds.

---

### Method 2: Direct Upload via Wrangler CLI

If deploying directly from your local terminal:

```bash
# 1. Install dependencies
npm install

# 2. Build the static production bundle
npm run build

# 3. Deploy the 'dist' directory using Wrangler
npx wrangler pages deploy dist --project-name=nextr-haven-stone
```

Follow the interactive terminal prompts to authorize your Cloudflare account. Wrangler will upload the pre-compiled `dist` folder directly to Cloudflare Pages edge storage.

---

### Method 3: Cloudflare Dashboard Direct Drag & Drop

1. Run the local build command:
   ```bash
   npm run build
   ```
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
3. Drag and drop the generated `dist/` folder into the Cloudflare upload zone.
4. Set your deployment name and click **Deploy Site**.

---

## 💻 Local Development & Verification

To run and verify the demonstration locally:

```bash
# Install dependencies
npm install

# Launch Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

To test the production compilation:

```bash
# Type check and build static output
npm run build

# Preview production build locally
npm run preview
```

---

## 📋 Demonstration Features

1. **Luxury Homepage Hero**: Split-column typographic layout with high-impact architectural visual, headline, and fast search strip.
2. **Interactive Property Search & Filters**:
   - Filter by Asset Class (All Holdings, Residential Estates, Commercial Holdings)
   - Filter by Property Type (Villas, Penthouses, Townhouses, Office Towers, Retail Flagships, Tech Campuses)
   - Filter by Maximum Valuation ($25M, $50M, $100M, $200M)
   - Filter by Bedroom Suite Count (4+, 5+, 6+, 7+)
   - Sort by Valuation (High to Low, Low to High), Gross Sq Ft, or Curated Order
3. **Comprehensive Property Detail Modals**:
   - High-resolution photo carousel with thumbnail navigation and fullscreen lightbox
   - Architectural metrics (Beds, Baths, Gross Interior Area, Grounds, Construction Year)
   - Deep narrative architectural dossier
   - Bespoke amenities breakdown (Wellness, Architectural Security, Finishes)
   - Embedded 2D interactive blueprint room inspector
   - Direct shortcuts to Mortgage Calculator and VIP Viewing Concierge
4. **Interactive Architectural Blueprint Laboratory**:
   - 2D room plan with coordinate-based interactive hotspots
   - Real-time room specification inspector displaying dimensions, square footage, and bespoke material finishes
   - Multi-level selector (e.g. Ground Floor, Upper Family Wing, Subterranean Wellness Vault)
5. **Illustrative Local JavaScript Mortgage Calculator**:
   - Real-time client-side calculation using amortization formula:
     $$M = P \frac{r(1+r)^n}{(1+r)^n - 1}$$
   - Dynamic inputs: Property Price, Down Payment % & $, Loan Term (15, 20, 30 years), Interest Rate %, Annual Property Taxes, Hazard Insurance, and Monthly HOA/Maintenance
   - Visual payment allocation distribution bar
   - 30-year milestone amortization preview table
   - 1-click portfolio asset preset loading
6. **VIP Property Viewing Concierge**:
   - Select property from portfolio
   - Select viewing modality (In-Person Private Chauffeured, Virtual 4K Guided Walkthrough, or Helicopter Aerial Arrival)
   - Preferred inspection date and lighting window (Morning Light, Midday, Twilight Golden Hour)
   - Client dossier with NDA bilateral agreement option
   - Instant client-side digital VIP viewing pass confirmation with booking reference and simulated `.ics` calendar invite export
7. **Architectural Visual Archive & Lightbox**:
   - Filterable gallery by Pools & Terraces, Bespoke Interiors, Commercial Atriums, Chef Kitchens, and Architectural Details
   - Fullscreen modal with left/right arrow keys and escape key support
8. **Contact Section & Official NEXTR Branding**:
   - Email: `nextrsolutions@gmail.com`
   - WhatsApp CTA with exact text `Visit` linking to `https://wa.me/923239943441`
   - Strict privacy: No phone numbers exposed in visible web typography
   - Footer attribution: `Developed by NEXTR Digital Solutions & Services`
