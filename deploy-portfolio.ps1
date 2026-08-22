# Portfolio auf den Hetzner-Server legen.
# Immer wenn du die Seite geaendert hast: dieses Skript im Projektordner starten.

$ErrorActionPreference = "Stop"

$server = "root@167.233.146.186"
$key    = "$env:USERPROFILE\.ssh\id_ed25519"
$from   = "C:\Coding\portfolio-classic\dist\portfolio-classic\browser\."
$to     = "/var/www/portfolio/"

# 1) TypeScript/HTML in normale Browser-Dateien uebersetzen
Set-Location "C:\Coding\portfolio-classic"
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed, nothing was uploaded." }

# 2) Fertige Seite auf den Server kopieren (alter Stand wird ueberschrieben)
scp -o BatchMode=yes -i $key -r $from "${server}:${to}"

Write-Host "Fertig. Dateien liegen auf dem Server in $to"
