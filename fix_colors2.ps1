$files = Get-ChildItem -Path "d:\Cuckoo Cargo Website\admin" -Filter "*.html" -Recurse
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $newContent = $content -replace 'rgba\(244,123,32,', 'rgba(245,67,10,'
    $newContent = $newContent -replace '#F47B20', '#F5430A'
    $newContent = $newContent -replace '#D4650E', '#CC3200'
    $newContent = $newContent -replace '#f99f5e', '#FF7A50'
    $newContent = $newContent -replace 'F47B20', 'F5430A'
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
}

# Also update CSS files
$cssFiles = Get-ChildItem -Path "d:\Cuckoo Cargo Website\assets\css" -Filter "*.css"
foreach ($file in $cssFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $newContent = $content -replace 'rgba\(244,123,32,', 'rgba(245,67,10,'
    $newContent = $newContent -replace '#F47B20', '#F5430A'
    $newContent = $newContent -replace '#D4650E', '#CC3200'
    $newContent = $newContent -replace '#f99f5e', '#FF7A50'
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Updated CSS: $($file.Name)"
}

Write-Host "All done!"
