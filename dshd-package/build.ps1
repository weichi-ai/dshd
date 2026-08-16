# build.ps1 — 构建 鲸彩世界DSHD（Windows，Electron 桌面版）
# 输入（本仓库 downloads/ 与 whale-logo/）：
#   downloads\electron-v37.10.3-win32-x64.zip    Electron 运行时
#   downloads\payload.zip                        内置 Node + dsh 程序（便携版同一套）
#   whale-logo\deepseek-whale-icon-white.ico     应用/安装包图标
# 产物 dist\：
#   鲸彩世界DSHD\                              免安装目录（解压即用）
#   鲸彩世界DSHD-setup-win-x64.exe             NSIS 安装包
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist = Join-Path $root "dist"
$work = Join-Path $root "dist\_work"
$appName = "鲸彩世界DSHD"
$exeName = "$appName.exe"
$electronZip = Join-Path $root "downloads\electron-v37.10.3-win32-x64.zip"
$payloadZip = Join-Path $root "downloads\payload.zip"
$iconIco = "D:\DSHProjects\whale-logo\deepseek-whale-icon-white.ico"
$patchFrontend = "D:\DSHProjects\whale-logo\patch-frontend.js"
$nsisZip = Join-Path $root "downloads\nsis-3.11.zip"

function Extract-Zip($zip, $dest) {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $dest)
}

Write-Host "== 1/8 清理工作目录 =="
foreach ($d in @($work, (Join-Path $dist $appName))) { if (Test-Path $d) { Remove-Item $d -Recurse -Force } }

Write-Host "== 2/8 解压 Electron 运行时 =="
$runtime = Join-Path $work "electron-runtime"
New-Item -ItemType Directory -Path $runtime -Force | Out-Null
Extract-Zip $electronZip $runtime

Write-Host "== 3/8 解压 payload（node + dsh 程序） =="
$payload = Join-Path $work "payload"
New-Item -ItemType Directory -Path $payload -Force | Out-Null
Extract-Zip $payloadZip $payload

Write-Host "== 4/8 组装 resources\app =="
$app = Join-Path $work "app-src"
New-Item -ItemType Directory -Path $app -Force | Out-Null
Copy-Item (Join-Path $root "electron\package.json") $app
Copy-Item (Join-Path $root "electron\main.js") $app
Copy-Item (Join-Path $root "electron\bootstrap.js") $app
Copy-Item (Join-Path $root "electron\capture.js") $app
New-Item -ItemType Directory -Path (Join-Path $app "assets") -Force | Out-Null
Copy-Item $iconIco (Join-Path $app "assets\app.ico")
Copy-Item "D:\DSHProjects\whale-logo\deepseek-whale-icon-white.icns" (Join-Path $app "assets\app.icns")
Copy-Item (Join-Path $payload "node") (Join-Path $app "vendor\node") -Recurse
Copy-Item (Join-Path $payload "app") (Join-Path $app "vendor\app") -Recurse
New-Item -ItemType Directory -Path (Join-Path $app "vendor\plugins") -Force | Out-Null
Copy-Item "D:\DSHProjects\dsh-skin-pack" (Join-Path $app "vendor\plugins\dsh-skin-pack") -Recurse -Exclude @("scripts")
Copy-Item "D:\DSHProjects\dsh-welcome" (Join-Path $app "vendor\plugins\dsh-welcome") -Recurse -Exclude @("scripts")

Write-Host "== 5/8 品牌补丁（内置前端：标题/图标/鲸鱼渐变） =="
node $patchFrontend (Join-Path $app "vendor\app\node_modules\@deepseek-ai\dsh-web-frontend\dist")
if ($LASTEXITCODE -ne 0) { throw "frontend patch failed" }

Write-Host "== 5.5/8 settings 命名空间白名单补丁（皮肤包/欢迎页暴露给浏览器） =="
node "D:\DSHProjects\whale-logo\patch-apiproxy.js" (Join-Path $app "vendor\app\node_modules\@deepseek-ai\dsh-host-apiproxy\lib\index.js")
if ($LASTEXITCODE -ne 0) { throw "apiproxy patch failed" }

Write-Host "== 6/8 组装免安装目录 $appName =="
$out = Join-Path $dist $appName
New-Item -ItemType Directory -Path $out -Force | Out-Null
Get-ChildItem $runtime | Where-Object { $_.Name -ne "electron.exe" } | Copy-Item -Destination $out -Recurse -Force
Copy-Item (Join-Path $runtime "electron.exe") (Join-Path $out $exeName)
Copy-Item (Join-Path $work "app-src") (Join-Path $out "resources\app") -Recurse
Write-Output "免安装目录就绪：$out"

Write-Host "== 6.5/8 exe 图标补丁（纯 JS PE 资源替换） =="
node (Join-Path $root "patch-exe-icon.js") (Join-Path $out $exeName) $iconIco
if ($LASTEXITCODE -ne 0) { throw "exe icon patch failed" }

Write-Host "== 7/8 NSIS 安装包 =="
$nsis = Join-Path $work "nsis"
New-Item -ItemType Directory -Path $nsis -Force | Out-Null
Extract-Zip $nsisZip $nsis
$makensis = Join-Path $nsis "nsis-3.11\makensis.exe"
$nsi = Join-Path $work "installer.nsi"
$utf8Bom = New-Object System.Text.UTF8Encoding($true)
$installerOut = Join-Path $dist "$appName-setup-win-x64.exe"
$nsiBody = @'
!include "MUI2.nsh"
SetCompressor /SOLID lzma
!define APP_NAME "@@APP_NAME@@"
!define APP_EXE "@@APP_EXE@@"
!define APP_DIR "@@APP_NAME@@"
!define MUI_ICON "@@ICON@@"
!define MUI_UNICON "@@ICON@@"
!define MUI_ABORTWARNING
!define MUI_FINISHPAGE_RUN "$INSTDIR\@@APP_EXE@@"
!define MUI_FINISHPAGE_RUN_TEXT "启动 @@APP_NAME@@"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "SimpChinese"
Name "@@APP_NAME@@"
OutFile "@@INSTALLER@@"
InstallDir "$PROGRAMFILES64\@@APP_DIR@@"
RequestExecutionLevel admin
Section "main"
  SetOutPath "$INSTDIR"
  File /r "@@OUTDIR@@\*.*"
  WriteUninstaller "$INSTDIR\uninstall.exe"
  CreateDirectory "$SMPROGRAMS\@@APP_NAME@@"
  CreateShortcut "$SMPROGRAMS\@@APP_NAME@@\@@APP_NAME@@.lnk" "$INSTDIR\@@APP_EXE@@"
  CreateShortcut "$DESKTOP\@@APP_NAME@@.lnk" "$INSTDIR\@@APP_EXE@@"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_NAME@@" "DisplayName" "@@APP_NAME@@"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_NAME@@" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_NAME@@" "InstallLocation" "$INSTDIR"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_NAME@@" "DisplayIcon" "$INSTDIR\@@APP_EXE@@"
SectionEnd
Section "uninstall"
  RMDir /r "$INSTDIR"
  Delete "$SMPROGRAMS\@@APP_NAME@@\@@APP_NAME@@.lnk"
  RMDir "$SMPROGRAMS\@@APP_NAME@@"
  Delete "$DESKTOP\@@APP_NAME@@.lnk"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\@@APP_NAME@@"
SectionEnd
'@
$nsiBody = $nsiBody.Replace("@@APP_NAME@@", $appName).Replace("@@APP_EXE@@", $exeName).Replace("@@ICON@@", $iconIco.Replace("\", "/")).Replace("@@INSTALLER@@", $installerOut.Replace("\", "/")).Replace("@@OUTDIR@@", $out.Replace("\", "/"))
[System.IO.File]::WriteAllText($nsi, $nsiBody, $utf8Bom)
& $makensis /V2 $nsi
if ($LASTEXITCODE -ne 0) { throw "makensis failed: $LASTEXITCODE" }

Write-Host ""
Write-Host "完成。产物："
Get-ChildItem $dist | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
