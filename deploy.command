#!/bin/bash
cd "/Users/vohoangtuan/cuckoo_cargo_web/Cuckoo Cargo Website"
firebase deploy --only hosting --project cuckoo-cargo
echo ""
echo "✅ Done! Press any key to close..."
read -n 1
