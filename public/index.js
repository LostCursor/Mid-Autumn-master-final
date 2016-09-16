var textbool = true;
var index = 0;

$( document ).ready(function() {
      $.get("/jokes",function(data){
          // TODO: change HTML instead of alert
          $("#setup").html(data.setup);
          $("#punchline").html(data.punchline);

          index = data.id;

          if (data.votes === undefined) {
              $("#Votes").html(0);
          } else {
              $("#Votes").html(data.votes);
          }

      },"json");
});

$(function() {
    $(".purple").click(
        function() {
            $.get("/jokes",function(data){
                // TODO: change HTML instead of alert
                $("#setup").html(data.setup);
                $("#punchline").html(data.punchline);

                index = data.id;

                if (data.votes === undefined) {
                    $("#Votes").html(0);
                } else {
                    $("#Votes").html(data.votes);
                }

            },"json")
        }
    );
});

$(function() {
    $("#clicktoShow").click(
      function toggleClass() {
        if (textbool) {
          textbool = false;
          $(this).html("看答案");
          $(this).css({
            "font-family": "Roboto",
            "color": "white"
          });
        }
        else {
          textbool = true;
          $(this).html("遮蔽答案");
          $(this).css({
            "font-family": "Roboto",
            "color": "white"
          });
        }

        document.getElementById("reveal").classList.toggle("on");
        document.getElementById("reveal").classList.toggle("off");
        }
    );
});

$(function() {
  $(".green").click(
    function() {
    // $.post("/upvote");
    $.ajax({
      url: '/upvote',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id:index}),

      success: function(data, status, xhr) {
          $("#Votes").html(data.votes);
      }
    });
  });
});

$(function() {
  $(".red").click(
    function() {
    // $.post("/downvote");
    $.ajax({
      url: '/downvote',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id:index}),

      success: function(data, status, xhr) {
          $("#Votes").html(data.votes);
      }
    });
  });
});

app.listen(process.env.PORT||8888);