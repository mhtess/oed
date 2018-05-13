%.pdf : %.tex img/*
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pdf "$<";

watch-nips:
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pvc -pdf oed_nips_2016.tex;

watch-cogsci:
	latexmk -pdflatex='texfot pdflatex -file-line-error -synctex=1 -interaction=nonstopmode' -pvc -pdf oed_cogsci_2018.tex;

# embed fonts into camera-ready version
# HT https://www.karlrupp.net/2016/01/embed-all-fonts-in-pdfs-latex-pdflatex/
cogsci-2018-camera-embedded.pdf: cogsci-2018-camera.pdf
	gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -dEmbedAllFonts=true -sOutputFile=$@ -f $<
