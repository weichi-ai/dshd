# build.ps1 - Reproducible Windows x64 build for DSHD.
# Keep this source ASCII-only so Windows PowerShell 5.1 cannot corrupt names.
param(
    [string]$Version = "1.0.0",
    [string]$CacheDir = ""
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $root
$dist = Join-Path $root "dist"
$work = Join-Path $dist "_work"
if ([string]::IsNullOrWhiteSpace($CacheDir)) { $CacheDir = Join-Path $root "downloads" }
$CacheDir = [System.IO.Path]::GetFullPath($CacheDir)

function From-B64([string]$value) {
    [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($value))
}

$appName = From-B64 "6bK45b2p5LiW55WMRFNIRA=="
$startText = From-B64 "5ZCv5Yqo"
$publisher = "weichi-ai"
$appId = "com.weichiai.dshd"
$appDirName = "DSHD"
$exeName = "DSHD.exe"
$artifactBase = "DSHD-$Version-win-x64"
$electronZip = Join-Path $CacheDir "electron-v37.10.3-win32-x64.zip"
$payloadZip = Join-Path $CacheDir "payload.zip"
$nsisZip = Join-Path $CacheDir "nsis-3.11.zip"
$iconIco = Join-Path $repoRoot "whale-logo\deepseek-whale-icon-white.ico"
$iconIcns = Join-Path $repoRoot "whale-logo\deepseek-whale-icon-white.icns"
$patchFrontend = Join-Path $repoRoot "whale-logo\patch-frontend.js"
$patchApiproxy = Join-Path $repoRoot "whale-logo\patch-apiproxy.js"
$skinPlugin = Join-Path $repoRoot "dsh-skin-pack"
$welcomePlugin = Join-Path $repoRoot "dsh-welcome"
$shortcutScript = Join-Path $root "installer\create-shortcuts.ps1"

function Require-File([string]$path) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Required file not found: $path" }
}
function Require-Directory([string]$path) {
    if (-not (Test-Path -LiteralPath $path -PathType Container)) { throw "Required directory not found: $path" }
}
function Extract-Zip([string]$zip, [string]$destination) {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $destination)
}

foreach ($file in @($electronZip, $payloadZip, $nsisZip, $iconIco, $iconIcns, $patchFrontend, $patchApiproxy, $shortcutScript)) { Require-File $file }
foreach ($dir in @($skinPlugin, $welcomePlugin)) { Require-Directory $dir }

Write-Host "== 1/9 clean output =="
if (Test-Path -LiteralPath $dist) { Remove-Item -LiteralPath $dist -Recurse -Force }
New-Item -ItemType Directory -Path $work -Force | Out-Null

Write-Host "== 2/9 extract Electron =="
$runtime = Join-Path $work "electron-runtime"
New-Item -ItemType Directory -Path $runtime -Force | Out-Null
Extract-Zip $electronZip $runtime

Write-Host "== 3/9 extract bundled Node and dsh =="
$payload = Join-Path $work "payload"
New-Item -ItemType Directory -Path $payload -Force | Out-Null
Extract-Zip $payloadZip $payload

Write-Host "== 4/9 assemble resources/app =="
$app = Join-Path $work "app-src"
New-Item -ItemType Directory -Path (Join-Path $app "assets") -Force | Out-Null
Copy-Item (Join-Path $root "electron\package.json") $app
Copy-Item (Join-Path $root "electron\main.js") $app
Copy-Item (Join-Path $root "electron\bootstrap.js") $app
Copy-Item (Join-Path $root "electron\capture.js") $app
Copy-Item $iconIco (Join-Path $app "assets\app.ico")
Copy-Item $iconIcns (Join-Path $app "assets\app.icns")
Copy-Item (Join-Path $payload "node") (Join-Path $app "vendor\node") -Recurse
Copy-Item (Join-Path $payload "app") (Join-Path $app "vendor\app") -Recurse
New-Item -ItemType Directory -Path (Join-Path $app "vendor\plugins") -Force | Out-Null
Copy-Item $skinPlugin (Join-Path $app "vendor\plugins\dsh-skin-pack") -Recurse -Exclude @("scripts")
Copy-Item $welcomePlugin (Join-Path $app "vendor\plugins\dsh-welcome") -Recurse -Exclude @("scripts")

Write-Host "== 5/9 apply branding patches =="
& node $patchFrontend (Join-Path $app "vendor\app\node_modules\@deepseek-ai\dsh-web-frontend\dist")
if ($LASTEXITCODE -ne 0) { throw "frontend patch failed ($LASTEXITCODE)" }
& node $patchApiproxy (Join-Path $app "vendor\app\node_modules\@deepseek-ai\dsh-host-apiproxy\lib\index.js")
if ($LASTEXITCODE -ne 0) { throw "API proxy patch failed ($LASTEXITCODE)" }

Write-Host "== 6/9 assemble portable app =="
$portableRoot = Join-Path $dist "portable"
$out = Join-Path $portableRoot $appDirName
New-Item -ItemType Directory -Path $out -Force | Out-Null
Get-ChildItem -LiteralPath $runtime | Where-Object { $_.Name -ne "electron.exe" } | Copy-Item -Destination $out -Recurse -Force
Copy-Item (Join-Path $runtime "electron.exe") (Join-Path $out $exeName)
Copy-Item $app (Join-Path $out "resources\app") -Recurse

Write-Host "== 7/9 patch executable icon =="
& node (Join-Path $root "patch-exe-icon.js") (Join-Path $out $exeName) $iconIco
if ($LASTEXITCODE -ne 0) { throw "executable icon patch failed ($LASTEXITCODE)" }

Write-Host "== 8/9 create Unicode NSIS installer =="
$nsis = Join-Path $work "nsis"
New-Item -ItemType Directory -Path $nsis -Force | Out-Null
Extract-Zip $nsisZip $nsis
$makensis = Join-Path $nsis "nsis-3.11\makensis.exe"
Require-File $makensis
$installerOut = Join-Path $dist "$artifactBase-setup.exe"
$nsi = Join-Path $work "installer.nsi"
$utf8Bom = New-Object System.Text.UTF8Encoding($true)
$nsiBody = @'
Unicode true
!include "MUI2.nsh"
SetCompressor /SOLID lzma
!define APP_NAME "@@APP_NAME@@"
!define APP_EXE "@@APP_EXE@@"
!define APP_ID "@@APP_ID@@"
!define APP_VERSION "@@VERSION@@"
!define PUBLISHER "@@PUBLISHER@@"
!define MUI_ICON "@@ICON@@"
!define MUI_UNICON "@@ICON@@"
!define MUI_ABORTWARNING
!define MUI_FINISHPAGE_RUN "$INSTDIR\@@APP_EXE@@"
!define MUI_FINISHPAGE_RUN_TEXT "@@START_TEXT@@ @@APP_NAME@@"
Name "@@APP_NAME@@"
OutFile "@@INSTALLER@@"
InstallDir "$LOCALAPPDATA\Programs\@@APP_DIR@@"
InstallDirRegKey HKCU "Software\@@APP_ID@@" "InstallLocation"
RequestExecutionLevel user
VIProductVersion "@@VERSION4@@"
VIAddVersionKey /LANG=2052 "ProductName" "@@APP_NAME@@"
VIAddVersionKey /LANG=2052 "CompanyName" "@@PUBLISHER@@"
VIAddVersionKey /LANG=2052 "LegalCopyright" "Copyright (c) 2026 @@PUBLISHER@@"
VIAddVersionKey /LANG=2052 "FileDescription" "DeepSeek Harness Desktop Installer"
VIAddVersionKey /LANG=2052 "FileVersion" "@@VERSION@@"
VIAddVersionKey /LANG=2052 "ProductVersion" "@@VERSION@@"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "SimpChinese"

Function .onInit
  SetShellVarContext current
FunctionEnd

Function un.onInit
  SetShellVarContext current
FunctionEnd

Section "Main" SEC_MAIN
  SetOutPath "$INSTDIR"
  File /r "@@OUTDIR@@\*.*"
  WriteUninstaller "$INSTDIR\uninstall.exe"
  CreateDirectory "$SMPROGRAMS\@@APP_NAME@@"
  CreateShortcut "$SMPROGRAMS\@@APP_NAME@@\@@APP_NAME@@.lnk" "$INSTDIR\@@APP_EXE@@" "" "$INSTDIR\resources\app\assets\app.ico" 0
  CreateShortcut "$DESKTOP\@@APP_NAME@@.lnk" "$INSTDIR\@@APP_EXE@@" "" "$INSTDIR\resources\app\assets\app.ico" 0
  InitPluginsDir
  SetOutPath "$PLUGINSDIR"
  File /oname=create-shortcuts.ps1 "@@SHORTCUT_SCRIPT@@"
  nsExec::ExecToLog '"$SYSDIR\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "$PLUGINSDIR\create-shortcuts.ps1" "$INSTDIR\@@APP_EXE@@" "$INSTDIR\resources\app\assets\app.ico" "$SMPROGRAMS\@@APP_NAME@@\@@APP_NAME@@.lnk" "$DESKTOP\@@APP_NAME@@.lnk"'
  Pop $0
  DetailPrint "Shortcut fallback exit code: $0"
  SetOutPath "$INSTDIR"
  WriteRegStr HKCU "Software\@@APP_ID@@" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "DisplayName" "@@APP_NAME@@"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "DisplayVersion" "@@VERSION@@"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "Publisher" "@@PUBLISHER@@"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "DisplayIcon" "$INSTDIR\@@APP_EXE@@"
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "NoModify" 1
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@" "NoRepair" 1
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\@@APP_NAME@@.lnk"
  Delete "$SMPROGRAMS\@@APP_NAME@@\@@APP_NAME@@.lnk"
  RMDir "$SMPROGRAMS\@@APP_NAME@@"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_ID@@"
  DeleteRegKey HKCU "Software\@@APP_ID@@"
  RMDir /r "$INSTDIR"
SectionEnd
'@
$versionParts = @($Version.Split('.') | ForEach-Object { [int]$_ })
while ($versionParts.Count -lt 4) { $versionParts += 0 }
$version4 = ($versionParts[0..3] -join '.')
$replacements = @{
    "@@APP_NAME@@" = $appName
    "@@APP_DIR@@" = $appDirName
    "@@APP_EXE@@" = $exeName
    "@@APP_ID@@" = $appId
    "@@VERSION@@" = $Version
    "@@VERSION4@@" = $version4
    "@@PUBLISHER@@" = $publisher
    "@@START_TEXT@@" = $startText
    "@@ICON@@" = $iconIco.Replace("\", "/")
    "@@INSTALLER@@" = $installerOut.Replace("\", "/")
    "@@OUTDIR@@" = $out.Replace("\", "/")
    "@@SHORTCUT_SCRIPT@@" = $shortcutScript
}
foreach ($key in $replacements.Keys) { $nsiBody = $nsiBody.Replace($key, $replacements[$key]) }
[System.IO.File]::WriteAllText($nsi, $nsiBody, $utf8Bom)
& $makensis /V2 $nsi
if ($LASTEXITCODE -ne 0) { throw "makensis failed ($LASTEXITCODE)" }

Write-Host "== 9/9 create portable zip and checksums =="
$portableZip = Join-Path $dist "$artifactBase-portable.zip"
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($portableRoot, $portableZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)
$hashLines = foreach ($artifact in @($installerOut, $portableZip)) {
    $hash = Get-FileHash -Algorithm SHA256 -LiteralPath $artifact
    "$($hash.Hash.ToLowerInvariant())  $([System.IO.Path]::GetFileName($artifact))"
}
[System.IO.File]::WriteAllLines((Join-Path $dist "SHA256SUMS-win.txt"), $hashLines, (New-Object System.Text.UTF8Encoding($false)))

Remove-Item -LiteralPath $work -Recurse -Force
Remove-Item -LiteralPath $portableRoot -Recurse -Force
Write-Host "Build complete:"
Get-ChildItem -LiteralPath $dist -File | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
