param(
    [Parameter(Mandatory = $true)][string]$Target,
    [Parameter(Mandatory = $true)][string]$Icon,
    [Parameter(Mandatory = $true)][string]$StartMenuLink,
    [Parameter(Mandatory = $true)][string]$DesktopLink
)
$ErrorActionPreference = "Stop"
$shell = New-Object -ComObject WScript.Shell
foreach ($link in @($StartMenuLink, $DesktopLink)) {
    $parent = Split-Path -Parent $link
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
    $shortcut = $shell.CreateShortcut($link)
    $shortcut.TargetPath = $Target
    $shortcut.WorkingDirectory = Split-Path -Parent $Target
    $shortcut.IconLocation = "$Icon,0"
    $shortcut.Save()
}
