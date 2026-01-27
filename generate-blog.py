#!/usr/bin/env python3
"""
Blog Post Generator
This script converts markdown files in the 'blog-posts' folder to JavaScript format.

Usage:
    python generate-blog.py

Directory structure:
    blog-posts/
        2026-01-27-welcome-to-our-blog.md
        2026-01-28-another-post.md
        ...

File naming convention:
    YYYY-MM-DD-post-slug.md

Each markdown file should start with frontmatter:
---
title: Your Post Title
category: Company
readTime: 5 min read
excerpt: A brief description of your post
image: https://example.com/image.jpg
---

Your markdown content here...
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime

def parse_frontmatter(content):
    """Extract frontmatter from markdown content."""
    frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        return {}, content
    
    frontmatter_text = match.group(1)
    markdown_content = content[match.end():]
    
    # Parse frontmatter
    frontmatter = {}
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()
    
    return frontmatter, markdown_content

def markdown_to_html(markdown_text):
    """Convert markdown to HTML (basic conversion)."""
    html = markdown_text
    
    # Headers
    html = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    
    # Bold and italic
    html = re.sub(r'\*\*\*(.*?)\*\*\*', r'<strong><em>\1</em></strong>', html)
    html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)
    html = re.sub(r'__(.*?)__', r'<strong>\1</strong>', html)
    html = re.sub(r'_(.*?)_', r'<em>\1</em>', html)
    
    # Links
    html = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', html)
    
    # Images
    html = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1">', html)
    
    # Code blocks
    html = re.sub(r'```(.*?)```', r'<pre><code>\1</code></pre>', html, flags=re.DOTALL)
    html = re.sub(r'`(.*?)`', r'<code>\1</code>', html)
    
    # Blockquotes
    html = re.sub(r'^> (.*?)$', r'<blockquote>\1</blockquote>', html, flags=re.MULTILINE)
    
    # Lists
    # Unordered lists
    lines = html.split('\n')
    in_ul = False
    result = []
    for line in lines:
        if re.match(r'^\s*[-*+]\s', line):
            if not in_ul:
                result.append('<ul>')
                in_ul = True
            item = re.sub(r'^\s*[-*+]\s', '', line)
            result.append(f'<li>{item}</li>')
        else:
            if in_ul:
                result.append('</ul>')
                in_ul = False
            result.append(line)
    if in_ul:
        result.append('</ul>')
    html = '\n'.join(result)
    
    # Ordered lists
    lines = html.split('\n')
    in_ol = False
    result = []
    for line in lines:
        if re.match(r'^\s*\d+\.\s', line):
            if not in_ol:
                result.append('<ol>')
                in_ol = True
            item = re.sub(r'^\s*\d+\.\s', '', line)
            result.append(f'<li>{item}</li>')
        else:
            if in_ol:
                result.append('</ol>')
                in_ol = False
            result.append(line)
    if in_ol:
        result.append('</ol>')
    html = '\n'.join(result)
    
    # Paragraphs
    paragraphs = html.split('\n\n')
    processed = []
    for para in paragraphs:
        para = para.strip()
        if para and not para.startswith('<') and para != '':
            # Check if it's already wrapped in a tag
            if not re.match(r'^<[^>]+>', para):
                processed.append(f'<p>{para}</p>')
            else:
                processed.append(para)
        elif para:
            processed.append(para)
    
    html = '\n\n'.join(processed)
    
    return html

def extract_date_from_filename(filename):
    """Extract date from filename like '2026-01-27-post-title.md'."""
    date_pattern = r'^(\d{4}-\d{2}-\d{2})'
    match = re.match(date_pattern, filename)
    if match:
        date_str = match.group(1)
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj.strftime('%B %d, %Y')
    return 'Unknown Date'

def extract_slug_from_filename(filename):
    """Extract slug from filename like '2026-01-27-post-title.md'."""
    # Remove date prefix and .md extension
    slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', filename)
    slug = re.sub(r'\.md$', '', slug)
    return slug

def process_blog_posts(posts_dir='blog-posts', output_file='blog-posts.js'):
    """Process all markdown files in the blog-posts directory."""
    posts_path = Path(posts_dir)
    
    if not posts_path.exists():
        print(f"Error: Directory '{posts_dir}' not found.")
        print(f"Creating directory '{posts_dir}'...")
        posts_path.mkdir(exist_ok=True)
        print(f"Please add your markdown files to the '{posts_dir}' directory.")
        return
    
    markdown_files = sorted(posts_path.glob('*.md'), reverse=True)
    
    if not markdown_files:
        print(f"No markdown files found in '{posts_dir}' directory.")
        print("Creating a sample post...")
        create_sample_post(posts_path)
        markdown_files = sorted(posts_path.glob('*.md'), reverse=True)
    
    blog_posts = []
    
    for md_file in markdown_files:
        print(f"Processing: {md_file.name}")
        
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        frontmatter, markdown_content = parse_frontmatter(content)
        
        # Extract metadata
        post_id = extract_slug_from_filename(md_file.name)
        title = frontmatter.get('title', post_id.replace('-', ' ').title())
        category = frontmatter.get('category', 'General')
        date = extract_date_from_filename(md_file.name)
        read_time = frontmatter.get('readTime', '5 min read')
        excerpt = frontmatter.get('excerpt', '')
        image = frontmatter.get('image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80')
        featured = frontmatter.get('featured', 'false').lower() == 'true'
        
        # Convert markdown to HTML
        html_content = markdown_to_html(markdown_content)
        
        # Create post object
        post = {
            'id': post_id,
            'title': title,
            'category': category,
            'date': date,
            'readTime': read_time,
            'excerpt': excerpt,
            'content': html_content,
            'image': image,
            'featured': featured
        }
        
        blog_posts.append(post)
    
    # Generate JavaScript file
    js_content = generate_js_file(blog_posts)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\n✅ Successfully generated {output_file}")
    print(f"📝 Processed {len(blog_posts)} blog post(s)")

def generate_js_file(posts):
    """Generate the JavaScript file content."""
    js_header = """// This file is auto-generated by generate-blog.py
// Do not edit manually - your changes will be overwritten

const blogPosts = """
    
    # Convert posts to JSON with proper formatting
    posts_json = json.dumps(posts, indent=4, ensure_ascii=False)
    
    return js_header + posts_json + ";\n"

def create_sample_post(posts_dir):
    """Create a sample blog post."""
    today = datetime.now().strftime('%Y-%m-%d')
    filename = f"{today}-welcome-to-our-blog.md"
    filepath = posts_dir / filename
    
    sample_content = """---
title: Welcome to Our Blog
category: Company
readTime: 3 min read
excerpt: We're excited to launch our blog where we'll share insights, updates, and stories from our journey.
image: https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80
---

## A New Chapter

Today marks an exciting milestone for us - the launch of our company blog! This space will serve as a hub for sharing our thoughts, experiences, and learnings as we grow.

## What to Expect

We'll be covering a wide range of topics including:

- Product updates and feature announcements
- Industry insights and trends
- Technical deep-dives and tutorials
- Stories from our team members
- Company culture and behind-the-scenes looks

Our goal is to provide valuable content that helps our community and showcases our journey.

## Stay Connected

We're committed to publishing new content regularly, so be sure to check back often or subscribe to our newsletter to get updates delivered straight to your inbox.

Thank you for being part of our story. We can't wait to share more with you!
"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(sample_content)
    
    print(f"Created sample post: {filename}")

if __name__ == '__main__':
    print("=" * 60)
    print("Blog Post Generator")
    print("=" * 60)
    process_blog_posts()
    print("=" * 60)
