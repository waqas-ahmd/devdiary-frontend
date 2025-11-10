# 📝 DevDiary - Modern Blog Application

A full-featured blog application built with Next.js 16, TypeScript, and modern web technologies. DevDiary provides a complete blogging platform with rich text editing, user authentication, and content management capabilities.

## ✨ Features

### 🏠 **Public Features**

- **Blog Listing**: Responsive grid layout with search and filtering
- **Individual Blog Posts**: Rich content display with author information
- **Post Navigation**: Easy navigation between posts and back to listing
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization

### 🔐 **Authentication**

- **User Registration**: Secure sign-up with comprehensive validation
- **Form Validation**: Advanced password requirements and email validation
- **Visual Feedback**: Loading states and error handling

### ✍️ **Content Creation**

- **Rich Text Editor**: TipTap-powered WYSIWYG editor with:
  - Text formatting (Bold, Italic)
  - Headings (H1, H2, H3)
  - Lists (Bullet and Numbered)
  - Blockquotes
  - Image insertion
  - Undo/Redo functionality
- **Post Management**: Title, featured image, and tags
- **Draft System**: Save posts as drafts before publishing
- **Tag Management**: Dynamic tag addition and removal

### 📊 **Content Management**

- **My Posts Dashboard**: Personal post management interface
- **Post Statistics**: Views, likes, comments tracking
- **Status Management**: Published, Draft, and Archived states
- **Advanced Filtering**: Search by title, content, tags, and status
- **Sorting Options**: Multiple sorting criteria (date, popularity, alphabetical)
- **Quick Actions**: Edit, view, and delete posts

## 🛠️ Technology Stack

### **Frontend Framework**

- **Next.js 16**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **React 19**: Latest React version with improved performance

### **UI & Styling**

- **Tailwind CSS 4**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library built on Radix UI
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Beautiful, customizable icons

### **Form Handling & Validation**

- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Seamless integration between RHF and Zod

### **State Management & Data Fetching**

- **React Query (TanStack Query)**: Data fetching and caching
- **Axios**: Promise-based HTTP client
- **Context API**: Lightweight state management for authentication

### **Rich Text Editing**

- **TipTap**: Headless, framework-agnostic rich text editor
- **TipTap Starter Kit**: Essential editing extensions
- **TipTap Image Extension**: Image insertion capabilities

### **Utilities**

- **date-fns**: Modern JavaScript date utility library
- **clsx & tailwind-merge**: Conditional class name utilities
- **Class Variance Authority**: Type-safe variant styling

## 📁 Project Structure

```
app/
├── (auth)/
│   └── register/           # User registration page
├── (protected)/
│   ├── create/            # Blog post creation
│   └── my-posts/          # User's post management
├── posts/
│   └── [id]/              # Individual blog post pages
├── globals.css            # Global styles
├── layout.tsx             # Root layout
└── page.tsx               # Blog listing homepage

components/
└── ui/                    # Reusable UI components
    ├── avatar.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── form.tsx
    ├── input.tsx
    ├── label.tsx
    └── select.tsx

lib/
└── utils.ts              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Configure environment variables**

   Create a `.env` file in the root directory and add necessary environment variables.
   Add your environment variable:

   ```env
   NEXT_PUBLIC_API_URL=https://api.devdiary.ranjha.dev
   ```

   For local backend development:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

   Find Backend repository here: [DevDiary Backend](https://github.com/waqas-ahmd/devdiary-backend)

3. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### **Components**

- Consistent spacing using Tailwind's spacing scale
- Rounded corners and subtle shadows
- Smooth transitions and hover effects

### **Form Validation**

Comprehensive validation using Zod schemas:

- **Registration**: Name, email, password strength, confirmation matching
- **Post Creation**: Title length, content requirements, URL validation
- **Real-time Feedback**: Immediate error display and field validation
