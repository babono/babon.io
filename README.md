# Portfolio Website

A modern portfolio website built with Next.js 15 and Tailwind CSS, featuring dynamic content management through Notion API integration.

## Features

- **🏠 Home Page**: Personal introduction with social media links
- **📄 Resume Page**: Dynamic experience and education from Notion
- **🚀 Projects Page**: Showcase your work with featured projects
- **📝 Blog Page**: Dynamic blog posts from Notion with individual post pages
- **🌙 Dark Mode**: Automatic dark mode support
- **📱 Responsive Design**: Mobile-first responsive design
- **⚡ Performance**: Built with Next.js 15 App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Content Management**: Notion API
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Notion account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd babon.io
npm install
```

### 2. Set up Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name and select your workspace
4. Copy the "Internal Integration Token"

### 3. Create Notion Databases

Create the following databases in Notion and share them with your integration:

#### Experience Database
Properties:
- `Job Title` (Title)
- `Company` (Rich Text)
- `Location` (Rich Text)
- `Start Date` (Date)
- `End Date` (Date)
- `Description` (Rich Text)
- `Technologies` (Multi-select)

#### Education Database
Properties:
- `Institution` (Title)
- `Degree` (Rich Text)
- `Field` (Rich Text)
- `Start Date` (Date)
- `End Date` (Date)
- `GPA` (Rich Text)
- `Description` (Rich Text)

#### Projects Database
Properties:
- `Name` (Title)
- `Description` (Rich Text)
- `Technologies` (Multi-select)
- `GitHub URL` (URL)
- `Live URL` (URL)
- `Featured` (Checkbox)
- `Start Date` (Date)
- `End Date` (Date)
- `Image` (Files)

#### Blog Database
Properties:
- `Title` (Title)
- `Description` (Rich Text)
- `Slug` (Rich Text)
- `Tags` (Multi-select)
- `Publish Date` (Date)
- `Published` (Checkbox)
- `Cover Image` (Files)

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Notion integration token and database IDs:

```env
NOTION_TOKEN=your_notion_integration_token_here
NOTION_EXPERIENCE_DB_ID=your_experience_database_id_here
NOTION_EDUCATION_DB_ID=your_education_database_id_here
NOTION_PROJECTS_DB_ID=your_projects_database_id_here
NOTION_BLOG_DB_ID=your_blog_database_id_here
```

To get database IDs:
1. Open your database in Notion
2. Copy the URL
3. The database ID is the 32-character string before the `?v=`

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
If you modify the Notion database properties, update the corresponding interfaces in `types/index.ts` and the parsing functions in `lib/notion-utils.ts`.

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
