%.json : %.wppl
	webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . | tee "$@"
