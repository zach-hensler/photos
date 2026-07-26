#!/bin/bash

for dir in ./medium/*/
do
	PARSED=${dir#./medium/}
	PARSED=${PARSED%/}

	for image in ./medium/$PARSED/*
	do
		FILENAME=${image#./medium/$PARSED/}

		if [ ! -f full/$PARSED/$FILENAME ]; then
			echo "File $PARSED/$FILENAME not found in /full, removing from /medium"
			rm ./medium/$PARSED/$FILENAME
		fi
	done
done

for dir in ./smallest/*/
do
	PARSED=${dir#./smallest/}
	PARSED=${PARSED%/}

	for image in ./smallest/$PARSED/*
	do
		FILENAME=${image#./smallest/$PARSED/}

		if [ ! -f full/$PARSED/$FILENAME ]; then
			echo "File $PARSED/$FILENAME not found in /full, removing from /smallest"
			rm ./smallest/$PARSED/$FILENAME
		fi
	done
done