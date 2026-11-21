Add-Type -AssemblyName System.Drawing
$imgPath = (Resolve-Path "public/halopesa-en.jpg").Path
$img = [System.Drawing.Image]::FromFile($imgPath)

# Width is 460, Height is 1024
# Status bar ends around 38px
# Bottom card starts around 662px
# Let's crop from y=38 to y=662 (height 624)
$bmp = New-Object System.Drawing.Bitmap(460, 624)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$srcRect = New-Object System.Drawing.Rectangle(0, 38, 460, 624)
$destRect = New-Object System.Drawing.Rectangle(0, 0, 460, 624)
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$img.Dispose()

$outPath = Join-Path (Resolve-Path "public").Path "hero-illustration.jpg"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Output "Successfully created hero-illustration.jpg"
