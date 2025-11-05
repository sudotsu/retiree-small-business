
# Create a structured outline and data for the website design project
# This will help organize the key components needed

website_structure = {
    "Platform Type": "Dual-Course Online Learning Portal",
    "Target Audience": "Retirees interested in small business entrepreneurship",
    "Core Pages": [
        "Homepage (Landing Page)",
        "Course Catalog/Overview",
        "Course 1 Page",
        "Course 2 Page", 
        "About/Instructor Page",
        "Enrollment/Checkout",
        "Student Dashboard (Learning Portal)",
        "Resources/Community"
    ],
    "Key Features": {
        "Senior-Friendly UX": [
            "Large fonts (16-18pt minimum)",
            "High contrast colors",
            "Simple navigation",
            "Clear CTA buttons",
            "Minimal scrolling",
            "Touch-friendly elements"
        ],
        "Course Delivery": [
            "Video lessons",
            "Downloadable resources",
            "Progress tracking",
            "Quiz/assessments",
            "Community forum",
            "Live Q&A sessions"
        ],
        "SEO/Marketing Features": [
            "Optimized meta tags",
            "Schema markup (Course schema)",
            "Fast page load speed",
            "Mobile responsive",
            "Blog/content hub",
            "Email capture forms",
            "Social proof (testimonials)",
            "Clear value proposition"
        ],
        "Sales Features": [
            "Compelling headlines",
            "Benefit-focused copy",
            "Course curriculum preview",
            "Pricing transparency",
            "Money-back guarantee",
            "Multiple CTAs",
            "Urgency elements (limited spots)",
            "Trust badges"
        ]
    }
}

# Key design principles for retiree-focused online learning
design_principles = {
    "Visual Design": {
        "Font Size": "16-18pt body text minimum",
        "Font Type": "Sans-serif (easier to read)",
        "Color Contrast": "WCAG AAA compliant (7:1 ratio)",
        "Button Size": "Minimum 44x44 pixels (easy tapping)",
        "Whitespace": "Generous spacing between elements",
        "Color Scheme": "Black text on white background preferred"
    },
    "Navigation": {
        "Structure": "Simple, no more than 2-3 clicks to content",
        "Menu Style": "Clear labels, avoid jargon",
        "Breadcrumbs": "Show user location",
        "Search": "Prominent search functionality",
        "Help": "Visible support/help button"
    },
    "Content": {
        "Language": "6th-8th grade reading level",
        "Paragraphs": "Short, 3-4 sentences max",
        "Lists": "Bullet points for scannability",
        "Instructions": "Step-by-step, clear directions",
        "Videos": "Captions and transcripts"
    }
}

# SEO Strategy Components
seo_strategy = {
    "Keyword Research": [
        "Business courses for retirees",
        "Starting a business in retirement",
        "Small business training for seniors",
        "Retiree entrepreneurship course",
        "How to start business after 60"
    ],
    "On-Page SEO": [
        "Title tags with target keywords",
        "Meta descriptions (155-160 chars)",
        "Header hierarchy (H1, H2, H3)",
        "Alt text for all images",
        "Internal linking structure",
        "Clean URL structure"
    ],
    "Technical SEO": [
        "Mobile-first design",
        "Page speed optimization (<3 seconds)",
        "SSL certificate (HTTPS)",
        "XML sitemap",
        "Schema markup (CourseSchema.org)",
        "Responsive images",
        "Lazy loading"
    ],
    "Content Marketing": [
        "Blog posts on small business topics",
        "Success stories from students",
        "Free resources/lead magnets",
        "FAQ section",
        "Video content for YouTube SEO",
        "Guest posting opportunities"
    ]
}

# Conversion optimization elements
conversion_elements = {
    "Above the Fold": [
        "Compelling headline with benefit",
        "Subheadline explaining unique value",
        "Hero image or video",
        "Primary CTA button",
        "Trust indicators (testimonials count, ratings)"
    ],
    "Social Proof": [
        "Student testimonials with photos",
        "Success stories/case studies",
        "Number of students enrolled",
        "Expert credentials",
        "Media mentions",
        "Ratings and reviews"
    ],
    "Value Proposition": [
        "Clear problem statement",
        "Solution your course provides",
        "Unique differentiators",
        "Specific outcomes/results",
        "Timeline to results"
    ],
    "Call to Action": [
        "Action-oriented language ('Start Learning', 'Enroll Now')",
        "High contrast color",
        "Multiple CTAs throughout page",
        "Clear next steps",
        "Low-friction enrollment"
    ]
}

print("Website Structure and Strategy Components Defined Successfully")
print(f"\nCore Pages: {len(website_structure['Core Pages'])}")
print(f"SEO Keywords Identified: {len(seo_strategy['Keyword Research'])}")
print(f"Key Design Principles: {len(design_principles)}")
