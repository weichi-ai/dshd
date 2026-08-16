# Install dsh-skin-pack into local DSHD profiles (web + desktop).
# 1) copies this package into $DSH_HOME/profiles/node_modules
# 2) appends the loader entry to each profile's cordis.patch.yml
# 3) prints the restart reminder
$ErrorActionPreference = "Stop"
$dshHome = "C:\Users\Administrator\.dsh"
$plugin = "D:\DSHProjects\dsh-skin-pack"
$profiles = @("web", "desktop")

if (-not (Test-Path $plugin)) { throw "plugin dir missing: $plugin" }

# 1) copy the runtime files into the shared profile node_modules (lean: no scripts/dev junk)
$dest = Join-Path $dshHome "profiles\node_modules\dsh-skin-pack"
if (Test-Path $dest) {
    Write-Output "updating existing install at $dest"
    Remove-Item $dest -Recurse -Force
}
New-Item -ItemType Directory -Path $dest | Out-Null
Copy-Item (Join-Path $plugin "package.json") $dest
Copy-Item (Join-Path $plugin "README.md") $dest
Copy-Item (Join-Path $plugin "lib") (Join-Path $dest "lib") -Recurse
Write-Output "installed to $dest"

# 2) patch each profile (idempotent: strips prior insert blocks, then appends one canonical entry)
$insertBlock = "- insert:`n    - id: skin-pack`n      name: dsh-skin-pack"
foreach ($p in $profiles) {
    $patch = Join-Path $dshHome "profiles\$p\cordis.patch.yml"
    if (-not (Test-Path $patch)) { Write-Output "skip ${p} (no cordis.patch.yml)"; continue }
    $lines = Get-Content $patch
    # keep comments and blanks, drop any previous - insert: blocks,
    # and drop a lone "[]" placeholder (the insert list replaces it)
    $kept = @()
    $skip = $false
    foreach ($line in $lines) {
        if ($line -match '^\s*- insert:\s*$') { $skip = $true; continue }
        if ($skip -and $line -match '^\s*-\s') { $skip = $false }
        if ($skip) { continue }
        if ($line -match '^\s*\[\]\s*$') { continue }
        $kept += $line
    }
    $merged = (($kept -join "`n").TrimEnd()) + "`n`n" + $insertBlock + "`n"
    [System.IO.File]::WriteAllText($patch, $merged, (New-Object System.Text.UTF8Encoding($false)))
    Write-Output "${p}: insert entry ensured in cordis.patch.yml"
}

Write-Output ""
Write-Output "Done. Restart DSHD for the plugin to load (settings -> General -> Skin Pack)."
