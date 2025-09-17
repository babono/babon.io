# Portfolio Website

A modern portfolio website built with Next.js 15 and Tailwind CSS, featuring dynamic content management through Payload CMS (backed by Supabase Postgres).

## Features

- **🏠 Home Page**: Personal introduction with social media links
- **📄 Resume Page**: Dynamic experience and education from Payload
- **🚀 Projects Page**: Showcase your work with featured projects
- **📝 Blog Page**: Dynamic blog posts from Payload with individual post pages
- **🌙 Dark Mode**: Automatic dark mode support
- **📱 Responsive Design**: Mobile-first responsive design
- **⚡ Performance**: Built with Next.js 15 App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Content Management**: Payload CMS + Postgres
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A configured Payload CMS (visit `/admin` after starting dev)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd babon.io
npm install
```

### 2. Set up Payload CMS

1. Ensure your `.env.local` includes `DATABASE_URI` (Supabase Postgres) and `PAYLOAD_SECRET`
2. Run `npm run dev` and visit `/admin` to create your first user and content

### 3. Collections

This repo includes Payload collections for: `posts`, `projects`, `experiences`, and `education`. Manage content via `/admin`.

### 4. Configure Environment Variables

Create `.env.local` with:

```env
DATABASE_URI=postgres://...
PAYLOAD_SECRET=your-secret
```

### 5. Customize Your Content

#### Personal Information
Edit `app/page.tsx` to update:
- Your name and introduction
- Profile photo (add `profile.jpg` to `/public/`)
- Social media links
- Email address

#### Skills Section
Update the skills in `app/resume/page.tsx` to match your expertise.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Customization

### Styling
The project uses Tailwind CSS v4. You can customize:
- Colors in your Tailwind config
- Fonts by updating the imports in `layout.tsx`
- Layout and spacing throughout the components

### Adding New Pages
1. Create a new folder in `app/`
2. Add a `page.tsx` file
3. Update the navigation in `components/Navigation.tsx`

### Database Schema Changes
If you modify collection fields, update `collections/*.ts` as needed.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects page
│   ├── resume/            # Resume page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── types/                 # TypeScript definitions
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📝 Contributing improvements

---

Built with ❤️ by [Your Name](https://github.com/yourusername)
