#!/bin/bash
#
# This script scaffolds the directory structure for the Retiree Business Blueprint project.
# It creates all necessary directories and empty placeholder files based on the Master_Index_v2.md.
#
# To run this script:
# 1. Save it as `scaffold.sh` in the root of your project (`v2/`).
# 2. Open a terminal or Git Bash.
# 3. Navigate to the `v2/` directory.
# 4. Make the script executable: `chmod +x scaffold.sh`
# 5. Run the script: `./scaffold.sh`

echo "Creating project structure for Retiree Business Blueprint..."

# Top-level directories
mkdir -p assessments
mkdir -p compliance
mkdir -p emails
mkdir -p essentials
mkdir -p instructor
mkdir -p marketing/ads
mkdir -p marketing/email
mkdir -p marketing/lead-magnets
mkdir -p marketing/partners
mkdir -p marketing/sources
mkdir -p marketing/site
mkdir -p quality
mkdir -p resources/business-ideas
mkdir -p rubrics
mkdir -p rbb/module-00-orientation
mkdir -p rbb/module-01-knowing-yourself-your-foundation
mkdir -p docs
mkdir -p skeletons
mkdir -p slides
mkdir -p support/tech-concierge
mkdir -p workbook/_shared

# Create empty files
touch assessments/quiz-00.json
touch assessments/quiz-04_marketing-confidence.json
touch assessments/quiz-05_tech-comfort.json
touch assessments/grading-00.md

touch compliance/accessibility.md

touch emails/quiz-04_outcomes.md
touch emails/quiz-05_outcomes.md

touch essentials/day-01_spark-and-decisions.pdf
touch essentials/day-02_big-picture.pdf
touch essentials/day-03_time.pdf
touch essentials/day-04_raw-product.pdf
touch essentials/day-05_money.pdf
touch essentials/day-06_leads.pdf
touch essentials/day-07_retention-exit-action.pdf

touch marketing/ads/script_purpose.md
touch marketing/ads/script_supplemental-income.md
touch marketing/ads/script_doubt-to-doer.md
touch marketing/email/funnels.md
touch marketing/lead-magnets/5-day-starter-plan.pdf
touch marketing/partners/targets.md
touch marketing/site/landing.md

touch quality/RBB_7-Step-Validation_v2.md

touch resources/business-ideas/guide.pdf

touch rubrics/practice-00.md
touch rubrics/summative-00.md

touch support/tech-concierge/troubleshooting-00.md

# Create module-specific files using a loop
for i in $(seq -f "%02g" 0 8); do
    touch "instructor/RBB_Module-${i}_Instructor_v1.md"
    touch "marketing/RBB_Module-${i}_Hooks_v1.md"
    touch "skeletons/RBB_Module-${i}_Skeleton_v1.md" # Using a generic name for skeletons
    touch "slides/RBB_Module-${i}_Slides_v1.md"
    touch "workbook/RBB_Module-${i}_Workbook_v1.md"
done

echo "Project structure created successfully."