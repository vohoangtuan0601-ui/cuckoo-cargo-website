#!/bin/bash
# Fix git lock files and commit GAS URL update
cd "$(dirname "$0")"

echo "=== Xóa git lock files ==="
rm -f .git/index.lock .git/HEAD.lock
echo "Done"

echo ""
echo "=== Git status ==="
git status --short

echo ""
echo "=== Commit changes ==="
git add -A
git commit -m "fix: update GAS URL to Web-Cuckoo-Cargo v12 deployment (packages fix)"

echo ""
echo "=== Done! Bây giờ chạy deploy.command để deploy lên Firebase ==="
read -p "Nhấn Enter để đóng..."
