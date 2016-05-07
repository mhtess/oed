// direct replication of CBG exp 4: generics in 3 contexts {bare, dangerous, distinctive}

// proper item level randomization
// each 3 body part stimulus-set paired with a random permutation of the contexts

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      _.mapObject(exp.coinButtons, function(val,key){
        $("#"+key).html(val);
      });
      $("#total-num").html(exp.stims.length);  
     }
  });

  slides.check = slide({
     name : "check",
     start: function() {
      this.startTime = Date.now();
            $(".err").hide();

     },
    button : function() {
      if (!($("input:radio[name=catch]").is(":checked"))) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        exp.go();
      }
    },

    log_responses : function() {
      var response = $("input:radio[name=catch]:checked").val()
      exp.catch_trials.push({
        "trial_type" : "catch",
        "response" : response,
        "pass": response == exp.coinButtons["fair-key"],
        "rt":this.rt
      });
    }
  });


  slides.coins = slide({
    name: "coins",

    present : exp.stims,

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      this.startTime = Date.now();

      this.stim = stim 

      $(".evidence").html(this.stim);
      $(document).one("keydown", _s.keyPressHandler);


    },

    keyPressHandler : function(event) {


      var keyCode = event.which;
      
      if (keyCode != 81 && keyCode != 80) {
        // If a key that we don't care about is pressed, re-attach the handler (see the end of this script for more info)
        $(document).one("keydown", _s.keyPressHandler);
        
      } else {
        // If a valid key is pressed (code 80 is p, 81 is q),

          _s.rt = Date.now() - _s.startTime;
          _s.log_responses(keyCode);

          /* use _stream.apply(this); if and only if there is
          "present" data. (and only *after* responses are logged) */
         setTimeout(function(){_stream.apply(_s)}, 500);
      }

    },

    log_responses : function(keyCode) {
      var response = _.invert(exp.coinButtons)[exp.buttonCodes[keyCode]]
      exp.data_trials.push({
        "trial_type" : "coins",
        "sequence":_s.stim,
        "response" : response,
        "rt":_s.rt,
      });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  var coin = ["H ","T "]

  exp.buttonCodes = {80:"P", 81:"Q"};
  exp.coinButtons = _.object(_.zip(["fair-key","unfair-key"],
                            _.shuffle(["P","Q"])))



  var makeCoinSeq = function(outcomes, numberOfCoins){
    return _.flatten(numberOfCoins==0 ? 
            outcomes : 
            _.map(makeCoinSeq(outcomes, numberOfCoins-1), 
                    function(c){return _.map(outcomes,
                        function(d){return c+d})
                  }))
  }
  exp.stims = _.shuffle(makeCoinSeq(coin,4))
  exp.trials = [];
  exp.catch_trials = [];
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
   exp.structure=["i0", "coins","check",'subj_info', 'thanks'];
 
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}