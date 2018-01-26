[Note: Reviewer 4 is not actually #4; replace #s with the actual numbers used by NIPS]

We thank the reviewers for their thoughtful feedback. As Reviewers 1 and 4 noted, the computational cost and the advantages of using a probabilstiic programming language (PPL) specification were a little unclear. The cost is O(M * Y * X), which can certainly be intractable. One advantage of our PPL framing is that it equips OED consumers with powerful inference algorithms developed in PPL and adjacent fields. This plug-and-play formulation for inference strategies is not possible in other languages (e.g., Matlab). We will add to the discussion the main directions we see for performance approval. 

Reviewers 2 and 4 point out at specifying scientific hypotheses in terms of probabilistic programs is not trivial. Indeed PPLs are not yet in wide use, though in our experience, model specification in PPLs is not beyond the reach of undergraduates with technical experience or graduate students who lack a strong techincal background. Educational tools are constantly being developed to make this process easier: see probmods.org or Bayesian Cognitive Modeling, Lee & Wagenmakers (2013) for examples. Finally, having OED within a PPL will invite wider adoption of PPLs for modeling.


