%.json : %.wppl
	@webppl "$<" --require ./node_modules/underscore \
		--require ./node_modules/webppl-oed \
		--require . \
		| tee "$@"

# parallelize fig4a computation
fig4a: fig4a.1-66.json fig4a.67-132.json fig4a.133-198.json fig4a.199-264.json fig4a.265-330.json fig4a.331-396.json fig4a.397-462.json fig4a.463-528.json fig4a.529-594.json fig4a.595-660.json fig4a.661-726.json fig4a.727-792.json fig4a.793-858.json fig4a.859-933.json
	@mkdir -p fig4a
	@mv fig4a.*.json fig4a

fig4a.1-66.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 1 --end 66 > "$@"

fig4a.67-132.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 67 --end 132 > "$@"

fig4a.133-198.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 133 --end 198 > "$@"

fig4a.199-264.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 199 --end 264 > "$@"

fig4a.265-330.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 265 --end 330 > "$@"

fig4a.331-396.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 331 --end 396 > "$@"

fig4a.397-462.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 397 --end 462 > "$@"

fig4a.463-528.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 463 --end 528 > "$@"

fig4a.529-594.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 529 --end 594 > "$@"

fig4a.595-660.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 595 --end 660 > "$@"

fig4a.661-726.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 661 --end 726 > "$@"

fig4a.727-792.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 727 --end 792 > "$@"

fig4a.793-858.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 793 --end 858 > "$@"

fig4a.859-933.json : fig4a.wppl
	@webppl "$<" --require ./node_modules/underscore --require ./node_modules/webppl-oed --require . --require minimist --begin 859 --end 933 > "$@"
