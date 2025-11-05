
import json

# Create comprehensive website design data for the app
website_design_data = {
    "homepage": {
        "hero_section": {
            "headline": "Start, Grow & Master Your Small Business in Retirement",
            "subheadline": "Two comprehensive courses designed specifically for retirees ready to turn their experience into a thriving business",
            "cta_primary": "Enroll Now",
            "cta_secondary": "Watch Free Preview",
            "hero_image": "Confident retiree working on laptop in bright, welcoming workspace"
        },
        "value_proposition": {
            "main_benefit": "Turn your lifetime of experience into a profitable small business—no tech overwhelm, just clear step-by-step guidance",
            "unique_differentiators": [
                "Designed specifically for retirees (age 55+)",
                "No prior business experience needed",
                "Simple, easy-to-follow video lessons",
                "Lifetime access to course materials",
                "Community support from fellow retiree entrepreneurs"
            ]
        },
        "course_overview": {
            "course_1": {
                "title": "Starting Your Small Business: Foundation & Launch",
                "description": "Learn the essentials of starting a business from scratch—from idea validation to your first customer",
                "modules": 8,
                "duration": "6 weeks",
                "key_outcomes": [
                    "Validate your business idea",
                    "Create a simple business plan",
                    "Register your business legally",
                    "Set up basic accounting",
                    "Make your first sale"
                ]
            },
            "course_2": {
                "title": "Growing & Maintaining Your Business for Success",
                "description": "Scale your business sustainably with proven marketing, customer retention, and operational strategies",
                "modules": 10,
                "duration": "8 weeks",
                "key_outcomes": [
                    "Attract customers consistently",
                    "Build a loyal customer base",
                    "Create efficient systems",
                    "Manage finances confidently",
                    "Scale without burnout"
                ]
            }
        },
        "social_proof": {
            "student_count": "500+ retirees enrolled",
            "success_rate": "87% started their business within 90 days",
            "testimonials": [
                {
                    "name": "Margaret T., Age 67",
                    "location": "Phoenix, AZ",
                    "quote": "I thought starting a business at my age was impossible. These courses made it simple and achievable. I launched my consulting practice in just 8 weeks!",
                    "business": "Retirement Planning Consultant"
                },
                {
                    "name": "Robert K., Age 62",
                    "location": "Portland, OR",
                    "quote": "The step-by-step approach was perfect for someone like me who isn't tech-savvy. Now I'm running a successful woodworking business from my garage.",
                    "business": "Custom Furniture Maker"
                }
            ]
        },
        "trust_indicators": [
            "30-Day Money-Back Guarantee",
            "Secure Payment Processing",
            "Lifetime Course Access",
            "Certificate of Completion",
            "Email Support Included"
        ]
    },
    "course_pages": {
        "course_structure": {
            "video_lessons": "2-10 minutes each for easy consumption",
            "downloadable_worksheets": "PDF templates and checklists",
            "quizzes": "Self-assessment after each module",
            "community_forum": "Connect with fellow students",
            "live_qa_sessions": "Monthly group coaching calls"
        },
        "curriculum_preview": {
            "course_1_modules": [
                "Module 1: Finding Your Perfect Business Idea",
                "Module 2: Market Research Made Simple",
                "Module 3: Business Planning Essentials",
                "Module 4: Legal Structure & Registration",
                "Module 5: Basic Accounting & Finances",
                "Module 6: Creating Your First Offer",
                "Module 7: Pricing for Profit",
                "Module 8: Making Your First Sale"
            ],
            "course_2_modules": [
                "Module 1: Marketing Fundamentals for Small Business",
                "Module 2: Digital Marketing Basics",
                "Module 3: Building Your Online Presence",
                "Module 4: Customer Acquisition Strategies",
                "Module 5: Customer Retention & Loyalty",
                "Module 6: Systemizing Your Operations",
                "Module 7: Financial Management & Growth",
                "Module 8: Managing Your Time & Energy",
                "Module 9: Hiring & Delegation",
                "Module 10: Planning for Sustainable Growth"
            ]
        }
    },
    "pricing_page": {
        "pricing_options": [
            {
                "name": "Course 1 Only",
                "price": "$197",
                "description": "Perfect for getting started",
                "includes": [
                    "8 comprehensive modules",
                    "Video lessons + worksheets",
                    "Lifetime access",
                    "Community forum access",
                    "Email support"
                ]
            },
            {
                "name": "Course 2 Only",
                "price": "$247",
                "description": "For established businesses",
                "includes": [
                    "10 advanced modules",
                    "Video lessons + templates",
                    "Lifetime access",
                    "Community forum access",
                    "Email support"
                ]
            },
            {
                "name": "Complete Bundle (BEST VALUE)",
                "price": "$347",
                "savings": "Save $97",
                "description": "Complete business training",
                "includes": [
                    "Both courses (18 modules total)",
                    "All video lessons + resources",
                    "Lifetime access to everything",
                    "Priority email support",
                    "Monthly live Q&A sessions",
                    "Certificate of completion"
                ],
                "featured": True
            }
        ],
        "guarantee": "30-Day Money-Back Guarantee - If you're not satisfied for any reason, we'll refund 100% of your investment"
    },
    "about_page": {
        "instructor_bio": "Meet Your Instructor - [Dad's Name]",
        "credentials": [
            "35+ years of small business experience",
            "Successfully launched 3 businesses",
            "Helped 500+ retirees start their ventures",
            "Certified Business Coach"
        ],
        "mission": "To empower retirees to leverage their lifetime of experience into profitable, fulfilling businesses without the complexity and overwhelm"
    }
}

# Convert to JSON for the app
design_data_json = json.dumps(website_design_data, indent=2)

print("Website Design Data Structure Created")
print(f"\nTotal sections defined: {len(website_design_data)}")
print(f"Homepage components: {len(website_design_data['homepage'])}")
print(f"Pricing options: {len(website_design_data['pricing_page']['pricing_options'])}")
print("\nData is ready for app generation")
