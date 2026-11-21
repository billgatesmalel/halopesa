Add-Type -AssemblyName System.Drawing
$imgPath = (Resolve-Path "public/halopesa-en.jpg").Path
$img = [System.Drawing.Image]::FromFile($imgPath)

# Width is 460
# Status bar ends at 33px
# Characters end at 666px
# Height = 633px
$bmp = New-Object System.Drawing.Bitmap(460, 633)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$srcRect = New-Object System.Drawing.Rectangle(0, 33, 460, 633)
$destRect = New-Object System.Drawing.Rectangle(0, 0, 460, 633)
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$img.Dispose()

$outPath = Join-Path (Resolve-Path "public").Path "hero-illustration.jpg"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Output "Successfully recreated hero-illustration.jpg (460x633)"
