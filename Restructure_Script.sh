#!/bin/bash

# ==========================================
# SilverStartup: Gold Edition Organizer
# ==========================================
# This script reorganizes the raw file dump into a structured
# production pipeline ready for the Next.js app build.

echo "Starting Gold Edition reorganization..."

# 1. Create the new Directory Skeleton
# ------------------------------------
echo "Creating directory structure..."

mkdir -p "00_Admin_Planning/SOPs"
mkdir -p "00_Admin_Planning/Research"
mkdir -p "00_Admin_Planning/Compliance"

mkdir -p "01_Marketing_Sales/Partnerships"
mkdir -p "01_Marketing_Sales/Copywriting"
mkdir -p "01_Marketing_Sales/Visuals"

mkdir -p "02_Course_Production/00_Module_Orientation"
mkdir -p "02_Course_Production/01_Module_Foundation"
mkdir -p "02_Course_Production/99_Templates_Skeletons"
mkdir -p "02_Course_Production/Global_Assets/Images"
mkdir -p "02_Course_Production/Global_Assets/Video_Scripts"

mkdir -p "03_Tech_Dev/Legacy_Scripts"
mkdir -p "03_Tech_Dev/Scaffolding"
mkdir -p "03_Tech_Dev/Website_Assets"

mkdir -p "99_Archive/Original_Dump"
mkdir -p "99_Archive/Claude_Exports"

# 2. Move Admin & Planning Files
# ------------------------------
echo "Moving Admin & Planning docs..."
mv CONTENT_STATUS.md "00_Admin_Planning/" 2>/dev/null
mv LOCAL_DEVELOPMENT_SOP.md "00_Admin_Planning/SOPs/" 2>/dev/null
mv Master_Index_v2.md "00_Admin_Planning/" 2>/dev/null
mv PERPLEXITY_SPACE_INSTRUCTIONS*.md "00_Admin_Planning/SOPs/" 2>/dev/null
mv deliverables/*.pdf "00_Admin_Planning/" 2>/dev/null
mv compliance/* "00_Admin_Planning/Compliance/" 2>/dev/null

# Research
mv research/* "00_Admin_Planning/Research/" 2>/dev/null
mv "scattered_files/Comprehensive_Analysis_ Perplexity_with_sources.md" "00_Admin_Planning/Research/" 2>/dev/null

# 3. Move Marketing & Sales
# -------------------------
echo "Moving Marketing assets..."
mv AARP_*.md "01_Marketing_Sales/Partnerships/" 2>/dev/null
mv marketing/* "01_Marketing_Sales/Copywriting/" 2>/dev/null
mv assessments/* "01_Marketing_Sales/Copywriting/" 2>/dev/null # Quizzes are often lead magnets

# 4. Move Course Production Content
# ---------------------------------
echo "Moving Course Content..."

# Visuals (Extracting from scattered files)
mv "scattered_files/Visuals-Course/"*.png "02_Course_Production/Global_Assets/Images/" 2>/dev/null

# Video Scripts (Centralizing)
mv video/*.md "02_Course_Production/Global_Assets/Video_Scripts/" 2>/dev/null

# Module 00 (Orientation) - Consolidating sources
mv lessons/lesson_0/* "02_Course_Production/00_Module_Orientation/" 2>/dev/null
mv rbb/module-00-orientation/* "02_Course_Production/00_Module_Orientation/" 2>/dev/null
# Clean up zip artifacts if extracted
mv lessons/lesson_0.zip "99_Archive/Original_Dump/" 2>/dev/null

# Module 01 (Foundation)
mv lessons/lesson_1/* "02_Course_Production/01_Module_Foundation/" 2>/dev/null
# Clean up zip artifacts
mv lessons/lesson_1.zip "99_Archive/Original_Dump/" 2>/dev/null

# Skeletons & Templates
mv skeletons/* "02_Course_Production/99_Templates_Skeletons/" 2>/dev/null
mv useful_placeholders/Module_Skeletons_v2 "02_Course_Production/99_Templates_Skeletons/" 2>/dev/null
mv useful_placeholders/SAP_Module-Skeletons_v1 "02_Course_Production/99_Templates_Skeletons/" 2>/dev/null

# 5. Move Tech & Dev Files
# ------------------------
echo "Moving Tech assets..."
mv online_portal_website/*.py "03_Tech_Dev/Legacy_Scripts/" 2>/dev/null
mv online_portal_website/*.json "03_Tech_Dev/Legacy_Scripts/" 2>/dev/null
mv useful_placeholders/SAP_Stub_Outputs_v1 "03_Tech_Dev/Scaffolding/" 2>/dev/null
mv useful_placeholders/SAP_Course-Scaffold_v1.1 "03_Tech_Dev/Scaffolding/" 2>/dev/null
mv support/tech-concierge "03_Tech_Dev/" 2>/dev/null
mv .gitattributes "03_Tech_Dev/" 2>/dev/null

# 6. Archive the Rest
# -------------------
echo "Archiving remaining scattered files..."
mv scattered_files/* "99_Archive/Original_Dump/" 2>/dev/null
rmdir scattered_files 2>/dev/null
mv ORIGINALS/* "99_Archive/Original_Dump/" 2>/dev/null
rmdir ORIGINALS 2>/dev/null
mv claude/* "99_Archive/Claude_Exports/" 2>/dev/null
rmdir claude 2>/dev/null
mv useful_placeholders "99_Archive/Original_Dump/" 2>/dev/null # Any remaining placeholders

# 7. Cleanup Empty Folders
# ------------------------
rmdir lessons 2>/dev/null
rmdir rbb 2>/dev/null
rmdir video 2>/dev/null
rmdir marketing 2>/dev/null
rmdir deliverables 2>/dev/null
rmdir compliance 2>/dev/null
rmdir research 2>/dev/null
rmdir assessments 2>/dev/null
rmdir support 2>/dev/null
rmdir online_portal_website 2>/dev/null
rmdir skeletons 2>/dev/null

echo "=========================================="
echo "REORGANIZATION COMPLETE"
echo "=========================================="
echo "Your files are now structured for the 'SilverStartup' Gold Edition build."
echo "Please review the '02_Course_Production' folder to start assembling modules."
