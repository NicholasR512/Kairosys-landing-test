# Blog System - Setup Guide

This blog system makes it incredibly easy to add new blog posts each week. Just write your posts in Markdown and run a simple script!

## 📁 Files You Need

### Core Files (Required):
1. **blog.html** - Main blog page (uses your existing navbar/footer from components.js)
2. **blog-styles.css** - Blog-specific styling (matches your site's colors)
3. **blog-script.js** - Blog functionality
4. **blog-posts.js** - Auto-generated from your markdown files
5. **generate-blog.py** - Python script to convert markdown to JavaScript

### Dependencies:
The blog page uses your existing site infrastructure:
- **styles/style.css** - Your main site styles (navbar, footer, etc.)
- **scripts/components.js** - Loads navbar and footer
- **scripts/main.js** - Your main site JavaScript

### Content:
6. **blog-posts/** - Folder containing your markdown blog posts

## 🚀 Quick Start

### Step 1: Set Up Files
Copy all files to your website directory:
```
your-website/
├── blog.html
├── blog-styles.css
├── blog-script.js
├── blog-posts.js
├── generate-blog.py
├── blog-posts/
│   ├── 2026-01-27-how-we-built-our-mvp-in-30-days.md
│   └── 2026-01-20-5-lessons-from-our-first-year.md
├── styles/
│   └── style.css (your existing styles)
└── scripts/
    ├── components.js (your existing navbar/footer loader)
    └── main.js (your existing scripts)
```

**Note:** The blog automatically uses your existing navbar and footer through components.js.

### Step 2: Run the Generator
Every time you add a new blog post, run:
```bash
python generate-blog.py
```

This will:
- Read all markdown files in `blog-posts/`
- Convert them to HTML
- Generate `blog-posts.js` automatically
- Sort posts by date (newest first)

## ✍️ Writing Blog Posts

### File Naming Convention
Name your files: `YYYY-MM-DD-post-slug.md`

Examples:
- `2026-01-27-welcome-to-our-blog.md`
- `2026-02-03-product-update-february.md`
- `2026-02-10-how-to-get-started.md`

### Markdown Template

Create a new `.md` file in the `blog-posts/` folder:

```markdown
---
title: Your Amazing Blog Post Title
category: Product
readTime: 5 min read
excerpt: A brief 1-2 sentence description that appears on the blog list page
image: https://images.unsplash.com/photo-1234567890?w=800&q=80
---

## First Section Heading

Your content here. Write naturally using markdown.

You can include:
- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

## Second Section

More content here...

### Subsection

Even more content!
```

### Frontmatter Fields

The section between `---` markers is called frontmatter. Here's what each field does:

- **title**: The post title (appears in large text)
- **category**: Category name (e.g., Product, Engineering, Culture, Insights)
- **readTime**: Estimated reading time (e.g., "5 min read")
- **excerpt**: Short description shown in blog list (1-2 sentences)
- **image**: Header image URL (use Unsplash or your own images)
- **featured**: (Optional) Set to `true` to make this the featured post at the top of the blog. If not specified, the most recent post will be featured.

Example with featured post:
```markdown
---
title: Our Big Announcement
category: Company
readTime: 3 min read
excerpt: We're excited to share some major news with you today.
image: https://images.unsplash.com/photo-xyz?w=800&q=80
featured: true
---
```

### Finding Images

Free high-quality images from Unsplash:
- Go to https://unsplash.com
- Search for relevant images
- Right-click image → "Copy image address"
- Add `?w=800&q=80` to the URL for optimization
- Example: `https://images.unsplash.com/photo-1234567890?w=800&q=80`

## 🎨 Customization

### Colors
The blog already uses your site's color scheme:
- Main Blue: `#051650`
- Dark Green: `#3D7068`
- Light Green: `#eefbf2`
- Light Blue: `#6279B8`
- Accent: `#EA9E8D`

To change colors, edit the CSS variables in `blog-styles.css`:
```css
:root {
    --main-blue: #051650;
    --accent: #EA9E8D;
    /* etc... */
}
```

### Categories
You can use any category names you want:
- Product
- Engineering
- Company
- Culture
- Insights
- Marketing
- Design
- Growth

The category color is controlled by `--accent` in the CSS.

## 📝 Weekly Workflow

### Adding a New Post (Takes 5 minutes!)

1. **Write your post**
   ```bash
   # Create new file in blog-posts folder
   cd blog-posts
   nano 2026-02-03-my-new-post.md
   ```

2. **Add frontmatter and content**
   ```markdown
   ---
   title: My New Post
   category: Product
   readTime: 5 min read
   excerpt: What this post is about
   image: https://images.unsplash.com/photo-xyz?w=800&q=80
   ---
   
   ## Your content here
   ```

3. **Generate the blog**
   ```bash
   cd ..
   python generate-blog.py
   ```

4. **Upload to your website**
   - Upload the new `.md` file to `blog-posts/`
   - Upload the regenerated `blog-posts.js`
   - Done! 🎉

## 🎯 Features

✅ **Automatic sorting** - Posts sorted by date (newest first)
✅ **Featured post** - First post automatically featured
✅ **Responsive design** - Works on all devices
✅ **Dark mode toggle** - Theme switching built-in
✅ **Smooth animations** - Professional transitions
✅ **Direct linking** - Each post has its own URL
✅ **Browser history** - Back button works correctly
✅ **SEO friendly** - Clean URLs and structure

## 🔧 Troubleshooting

### Python script not working?
Make sure Python 3 is installed:
```bash
python3 --version
```

If not installed, get it from https://python.org

### Images not showing?
- Check the image URL is correct
- Make sure it starts with `https://`
- Try the URL in a browser first
- Use Unsplash for free images

### Posts not appearing?
- Check file naming: `YYYY-MM-DD-post-slug.md`
- Make sure frontmatter is between `---` markers
- Run `python generate-blog.py` after adding posts
- Check for errors in the console

### Styling looks different?
- Make sure `blog-styles.css` is linked in `blog.html`
- Check that color variables match your site
- Clear browser cache (Ctrl+Shift+R)

## 📱 Mobile Responsive

The blog automatically adapts to:
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🌐 Going Live

1. Upload all files to your web server
2. Link to blog from your main site: `<a href="blog.html">Blog</a>`
3. Test on different devices
4. Share your first post!

## 💡 Tips

- **Write regularly**: Aim for 1-2 posts per week
- **Keep it valuable**: Focus on helpful, interesting content
- **Use images**: Visual content increases engagement
- **Be authentic**: Share real stories and learnings
- **Promote posts**: Share on social media
- **Track analytics**: See which topics resonate

## 🎓 Markdown Cheat Sheet

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://url.com)

![Image alt](https://image-url.com)

> Blockquote

`Inline code`

```
Code block
```
```

## 📞 Support

Need help? Check:
- Markdown guide: https://www.markdownguide.org
- Unsplash for images: https://unsplash.com
- Web developer tools in browser (F12)

---

**That's it!** You now have a professional blog system that's easy to maintain. Just write markdown, run the script, and publish. Happy blogging! 🚀
