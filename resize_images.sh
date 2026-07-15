#!/bin/bash

mkdir -p smallest
mkdir -p medium


for dir in ./full/*/
do
	PARSED=${dir#./full/}
	PARSED=${PARSED%/}

	mkdir -p smallest/$PARSED
	mkdir -p medium/$PARSED

	for image in ./full/$PARSED/*
	do
		FILENAME=${image#./full/$PARSED/}

		magick $image -resize 4096@ smallest/$PARSED/$FILENAME
		magick $image -resize 1000000@ medium/$PARSED/$FILENAME
		
		echo "$image resized"
	done
done