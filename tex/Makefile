%.pdf : %.tex img/*
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pdf "$<";

watch-nips:
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pvc -pdf oed_nips_2016.tex;

watch-cogsci:
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pvc -pdf oed_cogsci_2018.tex;
