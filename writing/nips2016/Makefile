%.pdf : %.tex img/*
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pdf "$<";

watch :
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pvc -pdf oed_nips_2016.tex;

watchsupp :
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pvc -pdf supplement.tex;
