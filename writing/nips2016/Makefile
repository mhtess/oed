%.pdf : %.tex img/*
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pdf "$<";
