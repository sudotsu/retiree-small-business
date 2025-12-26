This is the Gold Edition Launch Itinerary. It is aggressive, designed for a 30-day sprint, and prioritizes Critical Infrastructure first, then Content, then Polish.

We are running two parallel tracks: Engineering (Building the car) and ️ WEEK 1: The Iron Skeleton (Tech Foundation)
Goal: A deployed, secure, database-backed application where a user can log in and see a placeholder dashboard.

Priority: CRITICAL (Do not skip)

[ ] Day 1: Scaffold & Deploy

Initialize Next.js 14 (App Router, TypeScript, Tailwind).

Install shadcn/ui (Radix primitives) for accessible components.

Connect GitHub repo to Vercel. Deploy "Hello World" immediately.

Speed Tip: Use the silver_startup_architecture.md I wrote for you as the checklist.

[ ] Day 2: The Data Vault (Supabase/Postgres)

Set up a Supabase project.

Run the SQL migrations to create tables: profiles, courses, modules, lessons, progress.

Why: We need a place to put the content from 02_Course_Production.

[ ] Day 3: Authentication (Clerk)

Install Clerk (@clerk/nextjs).

Configure "Magic Links" (Email codes) only. Remove Google/Social login to ️ WEEK 2: The Content Injection (MVP Content)
Goal: The app actually teaches something. Module 0 and 1 are live.

Priority: HIGH (The Product)

[ ] Day 6: Digitizing Module 0 (Orientation)

Open 02_Course_Production/00_Module_Orientation.

Copy the text from Module_0_Student_Facing.md into your database (or MDX files).

Task: Upload the "Workbook" PDF to UploadThing (or Supabase Storage) and link it in the lesson.

[ ] Day 7: Digitizing Module 1 (Foundation)

Repeat the process for 02_Course_Production/01_Module_Foundation.

Critical: If video isn't recorded yet, use a placeholder "Coming Soon" video or a text-only lesson.

[ ] Day 8: The Dashboard Logic

Connect the "Mark Complete" button to the database.

Make the Progress Bar actually move when a lesson is finished.

Why: This is the "Dopamine Hit" for the user.

[ ] Day 9: High Contrast & Accessibility

️ WEEK 3: The Gatekeeper (Sales & Commerce)
Goal: You can accept money and lock/unlock content.

Priority: MEDIUM (Business Logic)

[ ] Day 10: Stripe Integration

Set up Stripe Product ("SilverStartup Course" - $X).

Create a specialized "Checkout" page.

Set up the Webhook: When Stripe says "Payment Succeeded," your database updates the user's has_access flag to TRUE.

[ ] Day 11: The Sales Page

Open 01_Marketing_Sales/Copywriting.

Take the RBB_Landing-Page_Draft_v1.md.

Build a public-facing page (️ WEEK 4: The Gold Polish (Launch)
Goal: QA, Bug fixing, and filling in the gaps.

Priority: LAUNCH

[ ] Day 13: The "Skeleton" Backfill

You likely won't have Modules 2-9 fully recorded.

Strategy: Create "Coming Soon" placeholder pages for these modules  PARALLEL TRACK: The Content Factory
While you code (or in the evenings), these assets need to be finalized:

Video Recording: You need to record Mod 0 and Mod 1 scripts (02_Course_Production/Global_Assets/Video_Scripts). Use a teleprompter app.

Workbook PDF: Convert the Markdown workbooks in 02_Course_Production into clean, branded PDFs using Canva or Microsoft Word.

Visuals: Take the images from 02_Course_Production/Global_Assets/Images and compress them (WebP format) for the website.

What to Ignore (The "Half-Ass" Cut List)
Forum/Community: Don't build a chatroom yet. It's complex and requires moderation. Use a "Support Email" button instead.

Blog: You don't need a blog for launch. The landing page is enough.

Affiliate System: Worry about this in Month 3.

Mermaid JS/Complex Charts: We already decided these are out. Use the simple CSS/Canvas charts we designed.

Immediate Next Step
Run the organize_course_assets.sh script I provided in the previous turn. Then, initialize the Next.js project.using the titles in 02_Course_Production/99_Templates_Skeletons.

Add a "Notify me when released" button.

[ ] Day 14: Mobile QA

Open the site on an actual iPad and an iPhone.

Are the buttons big enough for Dad's fingers? (Target 44px height minimum).

[ ] Dapp/page.tsx) using that copy.

Speed Tip: Use the "Testimonials" from the React prototype I gave you.

[ ] Day 12: EmaiImplement the HighContrast toggle from the prototype globally using a React Context or Tkeep it simple for seniors.

Create the "Protected Route" middleware (so non-users can't see the course).

[ ] Day 4: The Interface (Porting the Prototype)

Take the silver_startup_portal.tsx React code I wrote.

Break it into components: <Navbar>, <Sidebar>, <VideoPlayer>, <LessonContent>.

Speed Tip: HardProduction (R
