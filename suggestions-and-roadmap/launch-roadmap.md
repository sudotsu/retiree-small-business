# Retiree Business Blueprint — Launch Roadmap and Suggestions

Everything below is ranked from optional at the top to must-have at the bottom. Work from the bottom up.

---

## TIER 4 — Optional / Nice to Have
*Not blocking. Add when the core is stable and running.*

**Affiliate program**
Let students refer others for a commission. Platforms: Rewardful, Tapfiliate. Low effort to set up once the payment system is working, and this audience refers naturally when they trust something.

**A/B testing for ad scripts**
Three ad scripts were built — Purpose, Supplemental Income, Doubt to Doer. Run them against each other on Facebook with identical budgets for two weeks. Let the data pick the winner before scaling spend.

**Student testimonial collection**
Set up a simple form (Typeform or Google Form) sent automatically after course completion. Collect name, photo permission, and a 2–3 sentence response to "what did you get out of this?" Feed these into the landing page over time.

**Drip content scheduling**
LearnDash supports releasing lessons on a schedule rather than all at once (e.g., one lesson per day, one module per week). The course was designed for this. Set it up if you want to control pacing for cohort-style runs.

**Course completion certificates**
LearnDash generates these automatically. A minor setup task — upload a template, configure the trigger. Students in this demographic respond well to something tangible at the end.

---

## TIER 3 — Recommended / High Value
*Not day-one blockers, but get these in place within the first 30 days.*

**Video hosting — do not upload directly to WordPress**
WordPress is not a video host. Videos uploaded directly will slow the site and create storage problems. Use YouTube (unlisted links), Vimeo, or Wistia. Wistia is the cleanest for a course platform — no ads, analytics per video, heatmaps showing where people stop watching. Vimeo is a reasonable middle option. YouTube unlisted is free but sends students off-site and has ads.

**Facebook group for student community**
Create a private Facebook group tied to the course. Students get access upon enrollment. This is the lowest-friction community option for the 60–75 demographic — they are already on Facebook, they know how it works, no new platform to learn. Post weekly, answer questions, let students post their wins. This is also a retention and referral engine.

**Zoom for office hours and Tech Concierge**
The course promises Tech Concierge sessions and office hours. Zoom is the right tool. Set up recurring links, publish the schedule on every module's student landing page. The standing links should never change — same URL every week so students bookmark it once.

**Analytics**
Google Analytics 4 on the WordPress site. At minimum, track: landing page visits, quiz completions, Week 1 enrollments, Mastery enrollments. These four numbers tell you whether the funnel is working. Set up from day one — retroactive data is not available.

**Privacy policy, terms of service, refund policy**
Required pages. The refund policy is already stated in the course materials (30 days, no questions asked) — it needs a dedicated page that's linked from checkout and the footer. Privacy policy and ToS protect you legally and are expected by this audience. Use a generator (Termly or iubenda) as a starting point, then have a lawyer review if you're concerned.

**SEO basics**
Install Yoast SEO or Rank Math on WordPress. Set the landing page title tag and meta description to target "business course for retirees" and related terms. This is a 30-minute task that compounds over time.

---

## TIER 2 — High Priority / Get This Right
*These need to be done correctly before launch, not just done.*

**Email service provider + automation**
The three email funnels are written and ready. They need a platform to live in. Recommended: ConvertKit (now Kit) — it's built for creators, handles tagging and segmentation cleanly, and integrates with LearnDash. Mailchimp works but the automation logic is clunkier. ActiveCampaign is more powerful but overkill for launch. Whatever you choose: the quiz outcome tags (quiz2_consulting_champion, quiz3_ready_to_launch, etc.) need to be set up so students get the right funnel based on their quiz result, not a generic sequence.

**Quiz system integrated with LearnDash**
The course references five audience quizzes that determine which email funnel a student enters. These need to be built (Typeform or a WordPress quiz plugin) and connected to the email platform via a webhook or Zapier. This is the segmentation engine — without it, all students get the same generic email, which underperforms significantly.

**Payment processing**
Two options: PayPal and Stripe. Use both — different students prefer different methods and offering only one will cost you enrollments. LearnDash integrates directly with both. Setup is straightforward but test every purchase flow before going live, including the refund process. Make sure the Essentials credit toward Mastery is handled automatically at checkout (LearnDash supports coupon-based credits or upgrade pricing).

**Community forum (backup if Facebook group isn't ready)**
If the Facebook group isn't in place at launch, install BuddyPress or bbPress on WordPress as a temporary internal forum. Students need somewhere to interact — a course without community has lower completion rates. Circle.so is a paid alternative that some course creators prefer, but Facebook is free and this audience already knows it.

---

## TIER 1 — Must-Have / Launch Blockers
*Nothing goes live without these.*

**WordPress hosting**
The site needs a reliable host. Recommended: WP Engine or Kinsta for managed WordPress hosting — automatic updates, daily backups, staging environments, and support that knows WordPress specifically. Shared hosting (GoDaddy, Bluehost) is cheaper but creates headaches with performance and support. For a paid course, managed hosting is worth the cost. Minimum spec: PHP 8.1+, at least 2GB memory limit, SSD storage.

**Domain and SSL certificate**
The landing page copy references retireebusinessblueprint.com. Confirm that domain is registered and pointed at the host. SSL certificate (HTTPS) is non-negotiable — modern browsers flag HTTP sites as insecure, and this audience will leave the moment they see that warning. Most managed hosts include SSL automatically via Let's Encrypt.

**LearnDash LMS**
The course platform. Everything — lesson sequencing, workbook access, quiz integration, drip scheduling, progress tracking, certificates — runs through LearnDash. Install it on WordPress. License cost is approximately $199/year for a single site. This is the core infrastructure; everything else is built around it. Configuration reference: `module_X_learndash_plugin.md` in each module folder (in the full SOT, not in this package).

**Login and account system**
WordPress handles user accounts natively, and LearnDash builds on top of that. Students need to create an account to access the course. Configure the registration and login pages to be simple and clear — no unnecessary fields, no confusing flow. Test the full enrollment-to-login-to-lesson path before launch. For the "Week 1 free, no payment info" model, the Week 1 content needs to be accessible without a payment step — this requires a specific LearnDash access configuration (free course or membership with open enrollment for Module 1 only).

**Security**
This is the most important item on this list for this specific audience. Retirees are the most targeted demographic for online scams and fraud. Your site's security is not just an IT concern — it is a trust signal and a legal liability. Minimum required:

- Install **Wordfence** (free tier is sufficient to start) — firewall, malware scanning, login protection
- Limit login attempts — Wordfence handles this; default is 5 attempts before lockout
- Two-factor authentication on the WordPress admin account — non-negotiable
- Change the default WordPress admin URL (wp-admin) to something non-standard
- Disable XML-RPC if not needed (a common attack vector)
- Regular automated backups — daily, stored off-site (not just on the server). WP Engine and Kinsta do this automatically. If on shared hosting, use UpdraftPlus and store backups to Google Drive or Dropbox.
- Keep WordPress core, LearnDash, and all plugins updated — outdated plugins are the number one cause of WordPress compromises
- Use strong, unique passwords for all admin accounts — a password manager is worth recommending to Chas for this purpose
- HTTPS everywhere (covered under SSL above)
- If collecting payment data: do not store card numbers on your server. PayPal and Stripe handle this — you never see the card number. This is how it should work. Verify this is the case with whatever payment integration is used.

**CAN-SPAM and GDPR compliance for email**
Every email sent must include a physical mailing address and a one-click unsubscribe. CAN-SPAM applies to US recipients; GDPR applies to EU recipients (less likely for this audience, but worth covering). Your email platform will handle the mechanics — make sure the settings are configured correctly before the first email goes out.

---

## Summary: The Launch Stack

| Component | Tool | Priority |
|-----------|------|----------|
| Hosting | WP Engine or Kinsta | Must |
| Domain + SSL | Registrar + host | Must |
| LMS | LearnDash | Must |
| Payment | Stripe + PayPal | Must |
| Security | Wordfence + 2FA + backups | Must |
| Email platform | ConvertKit | High |
| Quiz + segmentation | Typeform + Zapier | High |
| Community | Facebook group | High |
| Video hosting | Vimeo or Wistia | High |
| Analytics | Google Analytics 4 | High |
| Legal pages | Termly + lawyer review | High |
| Testimonials | Typeform | Optional |
| Certificates | LearnDash built-in | Optional |
| Affiliate program | Rewardful | Optional |

---

*Prepared by A.J. for Chas Korb review.*
*Questions: send notes back to A.J.*
