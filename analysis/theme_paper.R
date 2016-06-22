theme_paper <- function(base_size = 12, base_family = "Helvetica") {
  theme(
    line =               element_line(colour = "black", 
                                      size = 0.5, linetype = 1,
                                      lineend = "butt"),
    rect =               element_rect(fill = "black", 
                                      colour = "black", 
                                      size = 0.5, linetype = 1),
    text =               element_text(family = base_family, face = "plain",
                                      colour = "black", size = base_size,
                                      hjust = 0.5, vjust = 0.5, 
                                      angle = 0, lineheight = 0.9,
                                      margin = margin(2,1,3,1), debug = FALSE),
    axis.text =          element_text(size = 12, 
                                      colour = "black", 
                                      margin=margin(1,1,1,1)),
    strip.text =         element_text(size = 12, 
                                      colour = "black", 
                                      margin=margin(1,1,4,1)),
    
    axis.line =          element_blank(),
    axis.ticks =         element_line(colour = "black", size = 0.2),
    axis.title =         element_text(colour = "black", size=16),
    axis.ticks.length =  unit(0.3, "lines"),
    
    legend.background =  element_rect(colour = "white", fill='white'),
    legend.margin =      unit(0.2, "cm"),
    legend.key =         element_rect(fill = "white", colour = "white"),
    legend.key.size =    unit(1.2, "lines"),
    legend.key.height =  NULL,
    legend.key.width =   NULL,
    legend.text =        element_text(size = rel(1.2), colour = "black"),
    legend.text.align =  NULL,
    legend.title =       element_text(size = rel(1.2), 
                                      face = "bold", hjust = 0, 
                                      colour = "black"),
    legend.title.align = NULL,
    legend.position =    "right",
    legend.direction =   "vertical",
    legend.justification = "center",
    legend.box =         NULL,
    
    panel.background =   element_rect(fill = "white", colour = NA),
    panel.border =       element_rect(fill = NA, colour = "black"),
    panel.grid.major =   element_line(colour = "white", size = 0.2),
    panel.grid.minor =   element_line(colour = "white", size = 0.5),
    panel.margin =       unit(0.5, "lines"),
    
    strip.background =   element_rect(fill = "white", colour = "white"),
    strip.text.x =       element_text(),
    strip.text.y =       element_text(angle = -90),
    
    plot.background =    element_rect(colour = "white", fill = "white"),
    plot.title =         element_text(size = rel(1.2)),
    plot.margin =        unit(c(1, 1, 0.5, 0.5), "lines"),
    
    complete = TRUE
  )
}