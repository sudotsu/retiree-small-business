# Local Development SOP - Retiree Business Blueprint

**Your Situation:**
- Domain: `retireebusinessblueprint.com` (owned)
- Building locally first
- Using LearnDash LMS
- All content ready (modules, workbooks, slides, etc.)

**Goal:** Build everything locally, test it, then deploy to live hosting.

---

## Phase 1: Set Up Local Environment (Day 1)

### Step 1: Install Local WordPress Development Tool

**Option A: Local by Flywheel (Recommended - Easiest)**
1. Download: https://localwp.com (free)
2. Install
3. Create new site: "retireebusinessblueprint"
4. Environment: Preferred (PHP 8.0+, MySQL 8.0)
5. Click "Create Site"
6. **You now have WordPress running locally** ✅

**Option B: MAMP (Alternative)**
- Download MAMP (free)
- Install WordPress manually
- More setup, but works fine

**Option C: Docker (If you're comfortable with Docker)**
- More control, more complex

### Step 2: Configure Local Site

1. Open Local → Click your site → "Open Site"
2. WordPress admin: `http://retireebusinessblueprint.local/wp-admin`
3. Complete WordPress setup (title, admin user, etc.)
4. **Note your local URL** - you'll use this for development

---

## Phase 2: Install Core Plugins (Day 1-2)

### Step 1: Install LearnDash LMS

1. **Purchase LearnDash license** ($199/year) at learndash.com
2. WordPress Admin → Plugins → Add New
3. Upload LearnDash plugin (download from learndash.com)
4. Activate
5. Enter license key
6. **Configure LearnDash:**
   - Settings → General → Set course permalink structure
   - Settings → Emails → Configure email templates

### Step 2: Install Essential Plugins

**Must-Have:**
- **WooCommerce** (free) - For payments
- **Stripe Payment Gateway** (free) - Payment processing
- **ConvertKit** (free) - Email automation (or Mailchimp, etc.)
- **Elementor** (free version) - Page builder for sales pages
- **Yoast SEO** (free) - SEO optimization

**Nice-to-Have:**
- **UpdraftPlus** (free) - Backups
- **WP Mail SMTP** (free) - Email delivery (if emails don't send)

**Install all:**
1. Plugins → Add New
2. Search → Install → Activate

---

## Phase 3: Build Course Structure (Week 1)

### Step 1: Create Parent Course

1. LearnDash → Courses → Add New
2. **Title:** "Retiree Business Blueprint - Mastery Track"
3. **Settings:**
   - Course Price: $499 (or $349 pre-reg)
   - Access: Direct enrollment
   - Certificate: Enable
4. **Publish**

### Step 2: Create Essentials Track Course

1. LearnDash → Courses → Add New
2. **Title:** "Retiree Business Blueprint - Essentials Track"
3. **Settings:**
   - Course Price: $149 (or $99 pre-reg)
   - Access: Direct enrollment
   - Certificate: Enable
4. **Publish**

### Step 3: Build Module 0 Structure

1. LearnDash → Courses → Select "Mastery Track"
2. Add **Topic/Module:** "Module 0: Welcome & Course Setup"
3. Under Module 0, add:
   - **Lesson 0.1:** "Course Orientation" (15 min)
   - **Lesson 0.2:** "Mindset Preparation" (15 min)
   - **Quiz:** "Module 0 Check-In" (5 questions, 70% pass)
4. **Set prerequisites:** Lesson 0.2 requires 0.1
5. **Repeat for all 9 modules**

### Step 4: Configure Essentials Track (Hide Non-Essential Content)

1. For Essentials course:
   - Only show modules 0, 1, 2, 3, 4, 5, 6, 7, 8 (but condensed)
   - Use **LearnDash Prerequisites** to hide Mastery-only content
   - Or create separate lesson structure for Essentials

**Quick Method:**
- Duplicate Mastery course
- Delete non-essential lessons
- Rename to "Essentials Track"

---

## Phase 4: Add Content (Week 2-3)

### Step 1: Upload Worksheets

1. For each lesson:
   - LearnDash → Lessons → Edit lesson
   - Scroll to "Downloadable Materials"
   - Upload PDF: `workbook/RBB_Module-XX_Workbook_v1.md` (convert to PDF first)
2. **Repeat for all 45 worksheets**

### Step 2: Add Lesson Content

For each lesson:
1. Edit lesson in LearnDash
2. Add content from `skeletons/RBB_Module-XX_*.md`
3. Copy lesson script into WordPress editor
4. Add video placeholder (you'll add videos later)
5. Link to worksheet download

### Step 3: Create Quizzes

1. LearnDash → Quizzes → Add New
2. Create quiz for each module
3. Add questions from your quiz files
4. Set pass percentage: 70%
5. Link quiz to module

---

## Phase 5: Payment & Email Setup (Week 3-4)

### Step 1: Set Up WooCommerce + Stripe

1. WooCommerce → Settings → Payments
2. Enable Stripe
3. Add Stripe API keys (from Stripe dashboard)
4. Test mode: ON (for local testing)
5. **Test checkout flow locally**

### Step 2: Connect LearnDash to WooCommerce

1. LearnDash → Settings → General
2. Enable WooCommerce integration
3. Link courses to products:
   - WooCommerce → Products → Add New
   - Create product: "Mastery Track" → Link to course
   - Create product: "Essentials Track" → Link to course

### Step 3: Set Up Email Automation

1. Install ConvertKit plugin
2. Connect API key
3. Create email sequences:
   - Welcome series (5 emails)
   - Quiz outcome emails
   - Launch sequence
4. **Test locally** (emails won't send from local, but structure works)

---

## Phase 6: Build Sales Pages (Week 4)

### Step 1: Create Pages with Elementor

1. Pages → Add New
2. Use Elementor to build:
   - **Homepage** - Main landing page
   - **Pricing** - Course pricing comparison
   - **About** - Chaz's story
   - **FAQ** - Common questions
   - **Course Overview** - What's included

### Step 2: Design Requirements

- **Large fonts** (16-18pt minimum)
- **High contrast** colors
- **Clear CTAs** (big buttons)
- **Mobile responsive**
- **Accessibility** (alt text, captions mention)

---

## Phase 7: Test Everything Locally (Week 4-5)

### Test Checklist

- [ ] **Course enrollment flow:**
  - Add to cart → Checkout → Payment → Course access
- [ ] **Lesson progression:**
  - Complete lesson → Next unlocks
  - Quiz completion → Certificate unlocks
- [ ] **Essentials vs Mastery:**
  - Essentials shows only Essentials content
  - Mastery shows all content
- [ ] **Downloads:**
  - All worksheets download correctly
  - PDFs are readable (large print)
- [ ] **Quizzes:**
  - All quizzes work
  - Pass/fail logic correct
- [ ] **Email sequences:**
  - Welcome emails trigger
  - Quiz outcomes trigger correct emails
- [ ] **Mobile view:**
  - Site looks good on phone
  - Forms work on mobile

---

## Phase 8: Deploy to Live Hosting (Week 5-6)

### Step 1: Choose Hosting

**Recommended:**
- **Cloudways** ($14-50/month) - Easy, optimized for WordPress
- **Kinsta** ($30+/month) - Premium, fast
- **SiteGround** ($15+/month) - Good balance

### Step 2: Set Up Live Site

1. Sign up for hosting
2. Install WordPress (1-click install)
3. Install SSL certificate (usually automatic)
4. Install all plugins (same as local)
5. Import LearnDash settings

### Step 3: Migrate from Local

**Option A: Using Local Export**
1. Local → Click site → Export
2. Upload to hosting
3. Import database

**Option B: Manual Migration**
1. Use **UpdraftPlus** backup from local
2. Upload to live site
3. Restore backup

**Option C: Use Migration Plugin**
- **Duplicator** (free) - Easiest migration tool
- Install on local → Create package → Upload to live

### Step 4: Point Domain

1. Get nameservers from hosting provider
2. Go to domain registrar (where you bought domain)
3. Update nameservers
4. Wait 24-48 hours for DNS propagation
5. Domain now points to live site ✅

---

## Phase 9: Final Testing & Launch (Week 6)

### Pre-Launch Checklist

- [ ] **Payment processing:**
  - Switch Stripe from test to live mode
  - Test real payment (refund yourself)
- [ ] **Email delivery:**
  - Test welcome emails send
  - Test quiz outcome emails
- [ ] **Content review:**
  - All modules have content
  - All worksheets downloadable
  - All quizzes work
- [ ] **Accessibility:**
  - Large print PDFs available
  - Captions on videos (if videos exist)
  - High contrast design
- [ ] **SEO:**
  - Yoast SEO configured
  - Meta descriptions added
  - Sitemap submitted to Google

---

## Quick Reference: File Structure Mapping

**Your Content → WordPress/LearnDash:**

```
skeletons/RBB_Module-XX_*.md
  → LearnDash Lesson content

workbook/RBB_Module-XX_Workbook_v1.md
  → Convert to PDF → LearnDash Downloadable Materials

slides/RBB_Module-XX_Slides_v1.md
  → Reference for instructor, or convert to slides

instructor/RBB_Module-XX_Instructor_v1.md
  → Reference for you when teaching

assessments/quiz-XX.json
  → LearnDash Quiz questions

marketing/RBB_Module-XX_Hooks_v1.md
  → Sales page copy, email copy
```

---

## Common Issues & Solutions

**Issue: "Local site won't load"**
- Check Local is running (green dot)
- Try restarting Local
- Check port conflicts

**Issue: "LearnDash course not showing"**
- Check course is published
- Check user has access
- Clear cache

**Issue: "Payments not working locally"**
- Use Stripe test mode
- Test with test card: 4242 4242 4242 4242

**Issue: "Emails not sending from local"**
- This is normal - emails won't send from localhost
- Test structure, but actual emails need live site
- Use WP Mail SMTP plugin for testing

---

## Timeline Summary

| Week | Phase | Tasks |
|------|-------|-------|
| 1 | Setup | Local environment, plugins, course structure |
| 2 | Content | Add lessons, worksheets, quizzes |
| 3 | Integration | Payment, email, sales pages |
| 4 | Testing | Test everything locally |
| 5 | Deploy | Migrate to live hosting |
| 6 | Launch | Final testing, go live |

**Total: ~6 weeks from start to launch**

---

## Next Steps Right Now

1. **Install Local by Flywheel** (30 min)
2. **Create local WordPress site** (15 min)
3. **Install LearnDash** (15 min)
4. **Build Module 0 structure** (1 hour)
5. **Test it works** (30 min)

**Then you'll have a working local course!** 🎉

---

## Questions to Answer Before Starting

- [ ] Do you have LearnDash license? ($199/year)
- [ ] Do you have hosting picked? (Cloudways recommended)
- [ ] Do you have Stripe account? (for payments)
- [ ] Do you have email service? (ConvertKit, Mailchimp, etc.)
- [ ] Do you have videos ready? (If not, use placeholders for now)


