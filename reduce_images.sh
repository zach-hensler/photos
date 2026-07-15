#!/bin/bash

mkdir -p reduced

for dir in ./full/*/
do
	PARSED=${dir#./full/}
	PARSED=${PARSED%/}
	mkdir -p reduced/$PARSED

	for image in ./full/$PARSED/*
	do
		FILENAME=${image#./full/$PARSED/}
		echo $image
		magick $image -resize 50% reduced/$PARSED/$FILENAME
	done
done