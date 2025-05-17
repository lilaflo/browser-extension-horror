#!/bin/bash

# Create a temporary directory
mkdir -p temp_extension

# Copy all necessary files
cp manifest.json temp_extension/
cp content.js temp_extension/
cp config.js temp_extension/
cp options.html temp_extension/
cp options.js temp_extension/

# Create the ZIP file
cd temp_extension
zip -r ../youtube-spooky-alert.xpi *

# Clean up
cd ..
rm -rf temp_extension

echo "Extension packaged as youtube-spooky-alert.xpi"
