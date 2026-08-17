# Compatibility entry point for developers using PowerShell on macOS.
param([string]$Version = "1.0.0")
$ErrorActionPreference = "Stop"
if (-not $IsMacOS) {
    throw "macOS packages must be built natively. Use .github/workflows/build-macos.yml or run this command on macOS."
}
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
& bash (Join-Path $root "build-mac.sh") $Version
if ($LASTEXITCODE -ne 0) { throw "macOS build failed ($LASTEXITCODE)" }
