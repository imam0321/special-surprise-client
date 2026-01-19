# Special Surprise - Client

**Frontend Client for Special Surprise**, a gift marketplace platform where users can browse, customize, and order gifts, while admins and moderators manage products, orders, and approvals.

---

## 🔗 Live Link

- **Frontend:** [https://special-surprise-client.vercel.app](https://special-surprise-client.vercel.app)
- **Backend Repository**: [https://github.com/imam0321/special-surprise-server](https://github.com/imam0321/special-surprise-server)

---

## 🚀 Project Overview

Special Surprise is a **gift marketplace** where:

- Users can browse products in categories like:
  - Anniversary, Birthday, Valentine, Father's Day, Mother's Day, Love Gifts, etc.
- Users can customize gifts with messages, images, or other personalization options.
- Users can select delivery times and place orders.
- Admins and moderators manage:
  - Product creation, updates, and deletions
  - Order processing and approvals
  - Moderator management

---

## 💡 Core Features

### 1. User Management

- Roles: `user`, `moderator`, `admin`
- Sign up and login with JWT
- Protected routes based on user roles
- Profile management

### 2. Product Catalog

- Browse products by category or tags
- Search and filter by name, price, or description
- Standard (ready-made) and customizable products
- View product details and customization options

### 3. Order Flow

- Place orders with online payment integration
- Track order status and delivery
- View order timeline and media updates

### 4. Admin/Moderator Features

- Moderator dashboard for stats and reports
- Product CRUD (create, update, delete)
- Process and approve customizable orders
- User management (view, add, or deactivate users)

### 5. UI/UX

- Responsive design for desktop and mobile
- Modern dashboard components for admin/moderator
- Interactive forms with validation and feedback

---

## 🛠️ Tech Stack

**Frontend:**

- **Framework:** Next.js 16
- **Language:** TypeScript
- **UI:** Tailwind CSS + Shadcn UI + Lucide Icons
- **State Management:** React Context & Hooks

**Other Tools:**
- `JWT` for authentication
- `date-fns` for date formatting
- `zod` for schema validation
- `react-hook-form` for form handling

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (v18+ recommended)
- Bun (optional, but recommended as lockfile is `bun.lock`) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imam0321/special-surprise-client.git
   cd special-surprise-client
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # API Configuration
   NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1  # or your production API value

   # JWT Secrets (should match backend)
   JWT_ACCESS_SECRET=your_access_secret_here
   JWT_REFRESH_SECRET=your_refresh_secret_here
   ```

4. **Run the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📦 Key Pages / Modules

- **Home Page:** Browse featured products
- **Product Detail:** View product details
- **Cart / Checkout:** Place orders and pay online
- **User Profile:** Manage personal information
- **Admin/Moderator Dashboard:** View stats, manage products, and process orders
- **Moderator Management:** Add new moderators and manage existing ones

---

## 🔮 Future Features

- Real-time notifications (e.g., order updates, customization approvals)
- Chat feature for support and order communication
- Advanced filtering and recommendation system
- Media uploads and gallery for products and orders
