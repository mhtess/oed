

var makeCoinSeq = function(outcomes, numberOfCoins){
  return _.flatten(numberOfCoins==0 ? 
          outcomes : 
          _.map(makeCoinSeq(outcomes, numberOfCoins-1), 
                  function(c){return _.map(outcomes,
                      function(d){return c+d})
                }))
}



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

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
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
    present_handle : function(stimKey) {
      stim = exp.sequenceObject[stimKey]

      this.displaySequence = []
      this.sequence = stim.split(' ').slice(0,4)


      $(".prompt").html("Press the space bar to flip the coin.")
      this.startTime = Date.now();
      this.stim = stim 
      this.key = stimKey

      // $(".evidence").html(this.stim);

      $("#reminders").hide()
      // $(".wait").hide()

      $(document).one("keydown", _s.keyPressHandler);
    },

    keyPressHandler : function(event) {
      var keyCode = event.which;

      if (keyCode != 84 && keyCode != 72 && keyCode != 32) {
        // If a key that we don't care about is pressed, re-attach the handler (see the end of this script for more info)
        $(document).one("keydown", _s.keyPressHandler);

      } else if (keyCode == 32 && _s.sequence.length!=0) {
        _s.displaySequence.push(_s.sequence.pop())
        $(".evidence").html(_s.displaySequence);
        $(document).one("keydown", _s.keyPressHandler);

        if (_s.sequence.length==0) {
          $("#reminders").show()
          _.mapObject(exp.coinButtons, function(val,key){
            $("#"+val+"key-reminder").html(exp.keyDictionary[key]);
          });
          $(".prompt").html("Predict the next outcome.")
        }

      } else if (keyCode != 84 && keyCode != 72 && _s.sequence.length==0) {
        $(document).one("keydown", _s.keyPressHandler);
      } else {
        // If a valid key is pressed (code 80 is p, 81 is q),
          _s.rt = Date.now() - _s.startTime;
          _s.log_responses(keyCode);
          /* use _stream.apply(this); if and only if there is
          "present" data. (and only *after* responses are logged) */
         setTimeout(function(){_stream.apply(_s)}, 100);
      }

    },

    log_responses : function(keyCode) {
      var response = _.invert(exp.coinButtons)[exp.buttonCodes[keyCode]]
      exp.data_trials.push({
        "trial_type" : "coins",
        "sequence":_s.stim,
        "seq_binary":_s.key,
        "response" : exp.coinButtons[response],
        "response_binary" : exp.coinDictionary[exp.coinButtons[response]],
        "rt":_s.rt,
      });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        problems: $("#problems").val(),
        comments : $("#comments").val()
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

  repeatWorker = false;
  (function(){
      var ut_id = "mht-subjrand-20160510";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  var coin = ["H ","T "]
  var coin = [1,0]

  exp.coinDictionary = {
    H:1,
    T:0
  };

  var allSequences = [
  "H H H H ", 
  "H H H T ", 
  "H H T H ", 
  "H H T T ", 
  "H T H H ", 
  "H T H T ", 
  "H T T H ", 
  "H T T T ", 
  "T H H H ", 
  "T H H T ", 
  "T H T H ", 
  "T H T T ", 
  "T T H H ", 
  "T T H T ", 
  "T T T H ", 
  "T T T T "
  ];

  var numericSeq = allSequences.map(function(s){return s.split(' ' ).slice(0,4).map(function(i){return exp.coinDictionary[i]}).join('')});

  exp.sequenceObject = _.object(_.zip(numericSeq, allSequences))

  exp.buttonCodes = {84:"T", 72:"H"};
  exp.coinButtons = {
    "heads-key": "H",
    "tails-key": "T"
  }
  // _.object(_.zip(["heads-key","tails-key"],
  //                           _.shuffle(["H","T"])));


  exp.keyDictionary = {
    "heads-key": "Heads",
    "tails-key": "Tails"
  }

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = "predictive";

  exp.stims = [_.sample(_.keys(exp.sequenceObject))];
  //_.shuffle(makeCoinSeq(coin,3)).slice(0,1);

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
   exp.structure=['i0','coins', 'subj_info','thanks']//,"i0", "coins","check",'subj_info', 'thanks'];

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
