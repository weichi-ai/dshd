# build-mac.ps1 - Build JingCaiWorld DSHD (macOS portable .app + zip)
# Requires network (darwin Electron/Node downloads + npm darwin install).
#   powershell -NoProfile -ExecutionPolicy Bypass -File build-mac.ps1
# Output dist\mac\:  JingCaiWorldDSHD-arm64.zip / JingCaiWorldDSHD-x64.zip
# NOTE: ASCII-only source (PowerShell 5.1 mis-parses BOM-less UTF-8).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$work = Join-Path $root "dist\_macwork"
$outDir = Join-Path $root "dist\mac"
$appName = "DSHD"
$electronVer = "37.10.3"
$nodeVer = "v24.18.0"
$dshVer = "0.1.0-rc.6"
$iconIcns = "D:\DSHProjects\whale-logo\deepseek-whale-icon-white.icns"
$patchFrontend = "D:\DSHProjects\whale-logo\patch-frontend.js"
$patchApiproxy = "D:\DSHProjects\whale-logo\patch-apiproxy.js"
$npmCmd = "npm.cmd"

function Download($url, $dest) {
    if (-not (Test-Path $dest)) {
        Write-Host "downloading $url"
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    }
}
function Extract-Zip($zip, $dest) {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $dest)
}

New-Item -ItemType Directory -Path $outDir -Force | Out-Null

foreach ($arch in @("arm64", "x64")) {
    Write-Host "== build $arch =="
    $dir = Join-Path $work $arch
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    # Remove old artifacts, keep macapp with installed deps (resume support)
    $macApp = Join-Path $dir "macapp"
    $skipNpm = $false
    if (Test-Path (Join-Path $macApp "node_modules")) {
        $cnt = (Get-ChildItem (Join-Path $macApp "node_modules") -Directory -ErrorAction SilentlyContinue | Measure-Object).Count
        if ($cnt -gt 50) { $skipNpm = $true }
    }
    Get-ChildItem $dir -Force | Where-Object { $_.Name -ne "macapp" } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    if ($skipNpm) { Write-Host "npm deps already installed for $arch; skipping" }

    # 1) darwin Electron
    $eZip = Join-Path $work "electron-v$electronVer-darwin-$arch.zip"
    Download "https://github.com/electron/electron/releases/download/v$electronVer/electron-v$electronVer-darwin-$arch.zip" $eZip
    $eOut = Join-Path $dir "electron"
    New-Item -ItemType Directory -Path $eOut -Force | Out-Null
    Extract-Zip $eZip $eOut
    $srcApp = Join-Path $eOut "Electron.app"

    # 2) darwin Node (same major as bundled Windows node)
    $nTgz = Join-Path $work "node-$nodeVer-darwin-$arch.tar.gz"
    Download "https://nodejs.org/dist/$nodeVer/node-$nodeVer-darwin-$arch.tar.gz" $nTgz
    $nOut = Join-Path $dir "node"
    New-Item -ItemType Directory -Path $nOut -Force | Out-Null
    tar --force-local -xf ($nTgz.Replace("\", "/")) -C ($nOut.Replace("\", "/")) --strip-components 1
    if ($LASTEXITCODE -ne 0) { throw "tar failed for node $arch" }

    # 3) darwin dsh dependency tree (npm cross-install)
    if (-not $skipNpm) {
        New-Item -ItemType Directory -Path $macApp -Force | Out-Null
        @{ name = "dsh-mac-app"; private = $true; version = "1.0.0"; dependencies = @{ "@deepseek-ai/dsh" = "^$dshVer" } } | ConvertTo-Json | Set-Content (Join-Path $macApp "package.json") -Encoding UTF8
        Push-Location $macApp
        # --ignore-scripts: skip native build steps when cross-installing.
        #   koffi is only used lazily on Windows; node-pty ships prebuilds/<platform>-<arch>;
        #   sharp resolves via @img/sharp-darwin-* platform packages.
        $npmOutput = & $npmCmd install --ignore-scripts --no-audit --no-fund --os=darwin --cpu=$arch 2>&1
        $npmCode = $LASTEXITCODE
        if ($npmCode -ne 0) { $npmOutput | Select-Object -Last 30 | ForEach-Object { Write-Host $_ }; Pop-Location; throw "npm install failed for $arch (exit $npmCode)" }
        Pop-Location
    }

    # 4) assemble JingCaiWorldDSHD.app
    $app = Join-Path $dir "$appName.app"
    $contents = Join-Path $app "Contents"
    New-Item -ItemType Directory -Path (Join-Path $contents "MacOS") -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $contents "Resources\app") -Force | Out-Null
    Copy-Item (Join-Path $srcApp "Contents\MacOS\Electron") (Join-Path $contents "MacOS\$appName")
    Copy-Item (Join-Path $srcApp "Contents\Frameworks") (Join-Path $contents "Frameworks") -Recurse
    Copy-Item (Join-Path $srcApp "Contents\Resources\electron.icns") (Join-Path $contents "Resources\app.icns")
    Copy-Item (Join-Path $root "mac\Info.plist") (Join-Path $contents "Info.plist")
    Copy-Item (Join-Path $root "electron\package.json") (Join-Path $contents "Resources\app\package.json")
    Copy-Item (Join-Path $root "electron\main.js") (Join-Path $contents "Resources\app\main.js")
    Copy-Item (Join-Path $root "electron\bootstrap.js") (Join-Path $contents "Resources\app\bootstrap.js")
    Copy-Item (Join-Path $root "electron\capture.js") (Join-Path $contents "Resources\app\capture.js")
    Copy-Item (Join-Path $macApp "node_modules") (Join-Path $contents "Resources\app\vendor\app\node_modules") -Recurse
    Copy-Item (Join-Path $nOut "bin") (Join-Path $contents "Resources\app\vendor\node\bin") -Recurse
    Copy-Item (Join-Path $nOut "lib") (Join-Path $contents "Resources\app\vendor\node\lib") -Recurse
    New-Item -ItemType Directory -Path (Join-Path $contents "Resources\app\vendor\plugins") -Force | Out-Null
    Copy-Item "D:\DSHProjects\dsh-skin-pack" (Join-Path $contents "Resources\app\vendor\plugins\dsh-skin-pack") -Recurse
    Copy-Item "D:\DSHProjects\dsh-welcome" (Join-Path $contents "Resources\app\vendor\plugins\dsh-welcome") -Recurse
    New-Item -ItemType Directory -Path (Join-Path $contents "Resources\app\assets") -Force | Out-Null
    Copy-Item $iconIcns (Join-Path $contents "Resources\app\assets\app.icns")

    # 5) branding + settings allowlist patches
    node $patchFrontend (Join-Path $contents "Resources\app\vendor\app\node_modules\@deepseek-ai\dsh-web-frontend\dist")
    if ($LASTEXITCODE -ne 0) { throw "frontend patch failed for $arch" }
    node $patchApiproxy (Join-Path $contents "Resources\app\vendor\app\node_modules\@deepseek-ai\dsh-host-apiproxy\lib\index.js")
    if ($LASTEXITCODE -ne 0) { throw "apiproxy patch failed for $arch" }

    # 6) zip (keep unix permissions)
    $zipOut = Join-Path $outDir "DSHD-mac-$arch.zip"
    node (Join-Path $root "make-mac-zip.js") $dir $zipOut
    if ($LASTEXITCODE -ne 0) { throw "zip failed for $arch" }
    Write-Host "done: $zipOut"
}

Write-Host ""
Write-Host "all done. dist\mac:"
Get-ChildItem $outDir | Select-Object Name, Length | Format-Table -AutoSize
