var data =
      [{
        //functional
        'top': 70,
        'left': 28,
        'pan': 'pans/pan-12.html',
        'vid': 'https://www.youtube.com/embed/yKG-o7eZsjI'
        },
        {
        //trx
        'top': 63,
        'left': 14,
        'pan': 'pans/pan-11.html',
        'vid': 'https://www.youtube.com/embed/6yOl7V66dak'
        },
        {
        //hydraulics
        'top': 48,
        'left': 26,
        'pan': 'pans/pan-10.html',
        'vid': 'https://www.youtube.com/embed/QYhv0r2HfOE'
        },
        {
        //spinning
        'top': 43,
        'left': 41,
        'pan': 'pans/pan-9.html',
        'vid': 'https://www.youtube.com/embed/RceDPUsw7yo'
        },
        {
        //mature
        'top': 46,
        'left': 51,
        'pan': 'pans/pan-2.html',
        'vid': 'https://www.youtube.com/embed/pUQRKOu2vDk'
        },
        {
        //kettlebell
        'top': 42,
        'left': 59,
        'pan': 'pans/pan-3.html',
        'vid': 'https://www.youtube.com/embed/qblKQ8XyKy4'
        },
        {
        //ninja
        'top': 30,
        'left': 52,
        'pan': 'pans/pan-6.html',
        'vid': 'https://www.youtube.com/embed/sopbGnYmjlU'
        },
        {
        //street workout
        'top': 17,
        'left': 63,
        'pan': 'pans/pan-7.html',
        'vid': 'https://www.youtube.com/embed/x3PwGp0-hPM'
        },
        {
        'top': 62,
        'left': 61,
        'pan': 'pans/pan-1.html',
        'vid': null
        },
        {
        'top': 88,
        'left': 8,
        'pan': 'pans/pan-13.html',
        'vid': null
        }
      ];

      var is360 = true;
      var headerHeight = 80;
      var viewportWidth;
      var viewportHeight;
      var imgWidth = 7690;
      var imgHeight = 4320;
      var imgFinalWidth;
      var imgFinalHeight;
      var topLeft;
      var topRight;
      var openDotId;

      $(document).ready(function() {
        viewportWidth = $(window).width();
        viewportHeight = $(window).height() - headerHeight;
        calculateImgDims();
        setImgDims();
        setImgPos();
        generateDots();
        $(".dot").focusout(() => {
          $('#buttons').fadeOut();
          $(this).removeClass('active');
        });
        $(".dot").click(function () {
          currDotId = $(this).attr('id').replace('dot-', '');
          if (currDotId != openDotId) {
            if (!openDotId)
              $(`#dot-${openDotId}`).addClass('active');
            else
              $(`#dot-${openDotId}`).removeClass('active');
            $(`#dot-${currDotId}`).toggleClass('active');
            openDotId = currDotId;
            $("#buttons").fadeOut(() => { 
              $("#buttons").empty();
              if (data[openDotId].vid) {
                $('#buttons').append(`<div class="button" id="vid-link"><div class="button-inner">וידאו</div></div>`);
              }
              if (data[openDotId].pan && is360) {
                $('#buttons').append(`<div class="button" id="pan-link"><div class="button-inner">360°</div></div>`);
              }
              $("#pan-link").click(function () {
                $('#pan-container').empty();
                $('#pan-container').prepend(`<iframe class="pan" id="pan-${openDotId}" src="${data[openDotId].pan}" allowfullscreen="yes" allowvr="yes"></iframe>`);
                $(`#pan-container`).fadeIn();
                $("#back").fadeIn();
              });
              $("#vid-link").click(function () {
                $('#vid-container').empty();
                $('#vid-container').prepend(`<div class="vid" id="vid-${openDotId}"><iframe src="${data[openDotId].vid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`);
                $(`#vid-container`).fadeIn();
                $("#back").fadeIn();
              });
              buttonsPos();
              $("#buttons").fadeIn();
              });
          }
          else {
            $(this).toggleClass('active');
            $("#buttons").fadeToggle();
          }
          });
        $("#buttons").hide();
      });

      $(window).resize(function() {
        viewportWidth = $(window).width();
        viewportHeight = $(window).height() - headerHeight;
        calculateImgDims();
        setImgDims();
        setImgPos();
        if (openDotId)
          buttonsPos(); 
      });

      function calculateImgDims() {
        if (viewportWidth < imgWidth) {
          imgFinalWidth = viewportWidth;
          imgFinalHeight = (imgHeight * imgFinalWidth) / imgWidth;
          if (imgFinalHeight > viewportHeight) {
            imgFinalHeight = viewportHeight;
            imgFinalWidth = (imgWidth * imgFinalHeight) / imgHeight;
          }
        }
      }
      
      function setImgDims() {
        $("#park").width(imgFinalWidth);
        $("#park").height(imgFinalHeight);
        $("#dots").width(imgFinalWidth);
        $("#dots").height(imgFinalHeight);
      }

      function setImgPos() {
        h_margin = viewportWidth - imgFinalWidth;
        v_margin = viewportHeight - imgFinalHeight;
        $("#park").css({left: h_margin / 2});
        $("#dots").css({left: h_margin / 2});
        $("#park").css({top:  headerHeight + v_margin / 2});
        $("#dots").css({top: headerHeight + v_margin / 2});
      }

      function generateDots() {
        data.forEach(function (item, index) {
          if ((is360 && item.pan) || item.vid)
            $('#dots').prepend(`<div class="dot" id="dot-${index}" style="top: ${item.top}%; left: ${item.left}%;"><div class="dot-inner"></div></div>`);
        });
      }

      function buttonsPos() {
        var offset = $(`#dot-${openDotId}`).offset();
        var buttonsWidth = $('#buttons').width();
        var dotWidth = $(`#dot-${openDotId}`).width();
        var buttonsHeight = $('#buttons').height();
        var dotHeight = $(`#dot-${openDotId}`).height();
        $('#buttons').css({top: offset.top - buttonsHeight - 0.2 * dotHeight, left: offset.left - 0.5 * buttonsWidth + dotWidth});
      }

      $("#back").click(function () {
        $("#pan-container").fadeOut(() => { $('#pan-container').empty(); });
        $("#vid-container").fadeOut(() => { $('#vid-container').empty(); });
        $("#back").fadeOut();
      });