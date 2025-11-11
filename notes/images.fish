#!/usr/bin/env fish

# SPECS: https://docs.elgato.com/makers/stream-deck/icon-packs/icon-specs/

set out com.wes.streamdeck.sdPlugin/icons/
mkdir -p $out
cd $out

magick https://www.keyboardmaestro.com/img/keyboardmaestro-128.png -resize 144x144 km.macro@2x.png
magick https://www.keyboardmaestro.com/img/keyboardmaestro-128.png -resize 72x72 km.macro.png

magick https://pbs.twimg.com/profile_images/1939116089348128768/U2KTu9jU_400x400.jpg -resize 144x144 \
    \( -size 144x144 xc:none -fill white -draw "circle 72,72 72,0" \) \
    -alpha set -compose copy_opacity -composite category@2x.png
magick https://pbs.twimg.com/profile_images/1939116089348128768/U2KTu9jU_400x400.jpg -resize 72x72 \
    \( -size 72x72 xc:none -fill white -draw "circle 36,36 36,0" \) \
    -alpha set -compose copy_opacity -composite category.png
