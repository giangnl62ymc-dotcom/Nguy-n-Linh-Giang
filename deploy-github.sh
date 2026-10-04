#!/bin/zsh

# ==============================================================================
# GitHub Pages Deployment Script for Princess Portfolio (Nguyễn Linh Giang)
# ==============================================================================

PROJECT_DIR="/Users/macos/.gemini/antigravity/scratch/princess-portfolio-linhgiang"
cd "$PROJECT_DIR" || exit 1

echo "👑 ================================================================"
echo "   PRINCESS PORTFOLIO - GITHUB PAGES DEPLOYMENT HELPER"
echo "================================================================ 👑"
echo ""

# 1. Check Git Installation
if ! command -v git &> /dev/null; then
  echo "⚠️  Git is not yet configured or Xcode Command Line Tools are missing."
  echo "   Please run the following command in your Mac Terminal to install Git:"
  echo "   xcode-select --install"
  echo ""
  exit 1
fi

# 2. Initialize Git Repository
if [ ! -d ".git" ]; then
  echo "📦 Initializing local Git repository..."
  git init
  git branch -M main
else
  echo "✅ Local Git repository already initialized."
fi

# 3. Add All Files and Commit
echo "✨ Staging project files..."
git add .

echo "📝 Creating initial release commit..."
git commit -m "feat: Princess-Themed Online Portfolio for Nguyễn Linh Giang 👑✨" 2>/dev/null || echo "ℹ️  No new changes to commit."

# 4. Check or Configure GitHub Remote
REPO_URL="${1:-https://github.com/giangnl62ymc-dotcom/Nguy-n-Linh-Giang.git}"

if git remote get-url origin &>/dev/null; then
  CURRENT_REMOTE=$(git remote get-url origin)
  echo "🔗 Existing remote detected: $CURRENT_REMOTE"
  if [ -n "$REPO_URL" ] && [ "$REPO_URL" != "$CURRENT_REMOTE" ]; then
    echo "🔄 Updating origin to: $REPO_URL"
    git remote set-url origin "$REPO_URL"
  fi
else
  if [ -z "$REPO_URL" ]; then
    echo ""
    echo "❓ Please enter your GitHub Repository URL"
    echo "   (Example: https://github.com/YOUR_USERNAME/princess-portfolio.git):"
    read -r REPO_URL
  fi

  if [ -n "$REPO_URL" ]; then
    echo "🔗 Adding remote origin: $REPO_URL"
    git remote add origin "$REPO_URL"
  else
    echo "⚠️  No repository URL provided. You can add it later via:"
    echo "   git remote add origin <YOUR_GITHUB_REPO_URL>"
    exit 0
  fi
fi

# 5. Push to GitHub
echo ""
echo "🚀 Pushing files to branch 'main' on GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 ================================================================"
  echo "   SUCCESSFULLY PUSHED TO GITHUB! 👑✨"
  echo "================================================================"
  echo ""
  echo "🌸 Final Step to Enable GitHub Pages:"
  echo "   1. Open your repository on GitHub."
  echo "   2. Go to 'Settings' (Tab on top right) -> 'Pages' (Menu on left)."
  echo "   3. Under 'Build and deployment':"
  echo "      - Source: Deploy from a branch"
  echo "      - Branch: Select 'main' and '/ (root)'"
  echo "   4. Click 'Save'."
  echo "   5. Your website will be live in 1-2 minutes at:"
  echo "      https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/"
  echo ""
else
  echo ""
  echo "⚠️  Push encountered an issue. If your repository was created with an initial"
  echo "   README.md or license, you can re-run with force push or pull first:"
  echo "   git pull origin main --rebase"
  echo "   git push -u origin main"
fi
