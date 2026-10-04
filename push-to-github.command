#!/bin/zsh

# ==============================================================================
# 👑 PRINCESS PORTFOLIO - ONE-CLICK GITHUB PUSH
# Repository: https://github.com/giangnl62ymc-dotcom/Nguy-n-Linh-Giang.git
# ==============================================================================

cd "/Users/macos/.gemini/antigravity/scratch/princess-portfolio-linhgiang" || exit 1

REPO_URL="https://github.com/giangnl62ymc-dotcom/Nguy-n-Linh-Giang.git"

echo ""
echo "👑 ===================================================================="
echo "   PUBLISHING PRINCESS PORTFOLIO TO GITHUB PAGES"
echo "   Repository: $REPO_URL"
echo "==================================================================== 👑"
echo ""

# Check if git is available
if ! command -v git &>/dev/null; then
  echo "⚠️  Git is not yet installed on this Mac."
  echo "   Launching Xcode Command Line Tools installer..."
  xcode-select --install
  echo ""
  echo "👉 Please click 'Install' on the popup window, wait for it to finish,"
  echo "   and then double-click this file (push-to-github.command) again!"
  echo ""
  read -k 1 "?Press any key to exit..."
  exit 1
fi

echo "📦 1. Initializing Git repository..."
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

echo "✨ 2. Staging all portfolio files..."
git add .

echo "📝 3. Committing changes..."
git commit -m "feat: Princess-Themed Online Portfolio for Nguyễn Linh Giang 👑✨" 2>/dev/null || echo "ℹ️  Files already committed."

echo "🔗 4. Configuring remote origin..."
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

echo "🚀 5. Pushing to GitHub (branch: main)..."
echo "   (If prompted, please enter your GitHub username and Personal Access Token or authenticate via browser)"
echo ""

git push -u origin main

if [ $? -ne 0 ]; then
  echo ""
  echo "ℹ️  Attempting reconciliation if remote repository already has initial files..."
  git pull origin main --rebase --allow-unrelated-histories 2>/dev/null
  git push -u origin main
fi

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 ===================================================================="
  echo "   SUCCESSFULLY PUBLISHED TO GITHUB! 👑✨"
  echo "===================================================================="
  echo ""
  echo "🌸 Next Step (Enable GitHub Pages):"
  echo "   1. Open: https://github.com/giangnl62ymc-dotcom/Nguy-n-Linh-Giang/settings/pages"
  echo "   2. Under 'Build and deployment' -> 'Branch': Select 'main' and '/ (root)'"
  echo "   3. Click 'Save'"
  echo ""
  echo "   Your live royal website will be available at:"
  echo "   👉 https://giangnl62ymc-dotcom.github.io/Nguy-n-Linh-Giang/"
  echo ""
else
  echo ""
  echo "⚠️  Push did not complete. If you need a Personal Access Token:"
  echo "   1. Go to https://github.com/settings/tokens"
  echo "   2. Generate a token with 'repo' permissions"
  echo "   3. Paste the token when prompted for your password."
  echo ""
fi

read -k 1 "?Press any key to exit..."
