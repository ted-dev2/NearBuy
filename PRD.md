# App Name: NearBuy

## 1. Problem Statement & Target User
*   **Target User:** Patrons visiting local independent venues (bars, cafes, favorite shops) who want to buy venue-specific merchandise easily.
*   **The Problem:** Buying merchandise in person feels awkward, rushed, or inconvenient while socializing.
*   **Core Value Proposition:** A frictionless, scan-to-buy web app that allows customers to browse and purchase local venue merchandise from their phones via QR code, with simple options for in-store pickup or home delivery.

## 2. Scope & Boundaries (Crucial for AI)
*   **In Scope for MVP (v1):**
    *   Deep-linked, venue-specific landing pages (e.g., `nearbuy.app/shop/venue-name`).
    *   Themed shopfronts per venue (custom logo, header image, and a primary brand color variable).
    *   Product catalog display (images, sizes, prices) for that specific venue.
    *   Frictionless Guest Checkout (no user registration required).
    *   Fulfillment selection: "In-Store Pickup" OR "Ship to Me" (requires shipping address form).
    *   Stripe Checkout integration (all payments route to the main platform Stripe account).
    *   Post-Purchase Flow: Digital receipt/pickup ticket UI for the customer to show staff.
    *   Automated transactional email sent to the venue confirming an order needs to be fulfilled.
*   **Strictly OUT OF SCOPE (Do NOT build these):**
    *   No Seller Dashboard or Seller Login portal.
    *   No Buyer account creation or saved profiles.
    *   No complex Stripe Connect split-payment routing (platform handles payouts manually).
    *   No native QR code scanner built into the app (customers use their native phone camera to scan physical QR codes).

## 3. Technical Constraints & Stack
*   **Frontend:** Next.js (App Router), React, Tailwind CSS. (Use CSS variables for the dynamic venue theme colors).
*   **Backend:** Next.js Server Actions / API Routes.
*   **Database:** Supabase (PostgreSQL). Platform admin will manually seed venue and product data directly into the database.
*   **Payments:** Stripe API (Stripe Checkout).
*   **Emails:** Resend (for sending order confirmation to venue and buyer).
*   **Deployment:** Vercel.

## 4. Core User Flows
*   **Flow 1: Venue Discovery & Browsing**
    1. User scans a physical QR code at a venue using their phone camera.
    2. User is routed directly to that venue's specific page (e.g., `/shop/the-local-pub`).
    3. The page dynamically loads the venue's logo, header, and brand color theme.
    4. User browses the available merchandise and clicks on an item to view sizes/details.
*   **Flow 2: Checkout & Fulfillment**
    1. User adds an item to cart and proceeds to checkout.
    2. User selects fulfillment method: "Pickup Now" or "Ship to Address".
    3. User enters email and payment details (via Stripe).
    4. Upon success, user sees a highly visible "Digital Receipt / Order Ticket" UI.
    5. App triggers an automated email to the venue's registered email address with order details.

## 5. Data Models (Simplified for MVP)
*   **Venue Object:** `id`, `slug` (for URL), `name`, `logo_url`, `header_image_url`, `brand_color_hex`, `notification_email`.
*   **Product Object:** `id`, `venue_id`, `title`, `description`, `price`, `image_url`, `is_available`.
*   **Order Object:** `id`, `venue_id`, `customer_email`, `total_amount`, `fulfillment_type` (pickup/ship), `status`, `shipping_address` (nullable), `created_at`.

## 6. Acceptance Criteria & AI Directives
*   The UI must be heavily optimized for mobile devices (Mobile-First Design), as 100% of initial traffic will come from QR scans.
*   Guest checkout must be aggressively frictionless. Do not prompt for passwords.
*   The venue's `brand_color_hex` must dynamically update primary buttons and accents on their specific shop route.