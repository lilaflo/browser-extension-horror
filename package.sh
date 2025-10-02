#!/bin/bash

# Create a temporary directory
mkdir -p temp_extension

# Copy manifest and changelog
cp manifest.json temp_extension/
cp CHANGELOG.md temp_extension/

# Copy directories
cp -r src temp_extension/
cp -r icons temp_extension/

# Create the ZIP file
cd temp_extension
zip -r ../youtube-spooky-alert.xpi *

# Clean up
cd ..
rm -rf temp_extension

echo "Extension packaged as youtube-spooky-alert.xpi"
