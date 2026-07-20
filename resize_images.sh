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

		if [ -f smallest/$PARSED/$FILENAME ]; then
			echo "Skipping smallest/$PARSED/$FILENAME, already exists"
		else
			magick $image -resize 4096@ smallest/$PARSED/$FILENAME
			echo "Created smallest/$PARSED/$FILENAME"
		fi

		if [ -f medium/$PARSED/$FILENAME ]; then
			echo "Skipping medium/$PARSED/$FILENAME, already exists"
		else
			magick $image -resize 1000000@ medium/$PARSED/$FILENAME
			echo "Created smallest/$PARSED/$FILENAME"
		fi
	done
done