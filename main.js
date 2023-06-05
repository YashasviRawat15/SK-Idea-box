// var myVar = setInterval(LoadData, 2000);
var myVar = LoadData();
http_request = new XMLHttpRequest();



function LoadData(){
$.ajax({
url: 'view.php',
type: "POST",
dataType: 'json',
success: function(data) {
    $('#MyTable tbody').empty();
    for (var i=0; i<data.length; i++) {
        var commentId = data[i].id;		
        if(data[i].parent_comment == 0){
		var parent=data[i].parent_comment;
        var row = $('<tr><td style=""><div id="p'+data[i].id+'"><b><img src="avatar.jpg" width="30px" height="30px" />' + data[i].student + ' :<i> '+ data[i].date + ':</i></b></br><p style="padding-left:80px">  ' + data[i].post + '</br><a data-toggle="modal" data-id="'+ commentId +'" title="Add this item" class="open-ReplyModal" href="#ReplyModal"><br>Reply</a>'+'</p></div></td></tr>');
        $('#record').append(row);

        for (var r = 0; (r < data.length); r++)
                {
                    if ( data[r].parent_comment == commentId)
                    {
                        var comments = $('<tr><td style="padding-left:80px" ><b><img src="avatar.jpg" width="30px" height="30px" />' + data[r].student + ' :<i> ' + data[r].date + ':</i></b></br><p style="padding-left:40px">'+ data[r].post +'</p></td></tr>');
                        $('#record').append(comments);
                    }
                }
        }
    }

			


	$('#question tbody').empty();
		for(var j=0; j<data.length; j++){
			if(data[j].parent_comment==0){
				var row1 = $('<tr><td><a href="#p'+data[j].id+'" id="c'+data[j].id+'" onclick="highlight('+data[j].id+')">' + data[j].post + '</a></td></tr>');
				$('#record1').append(row1);
			}		
		
	}
				



},

error: function(jqXHR, textStatus, errorThrown){
    alert('Error: ' + textStatus + ' - ' + errorThrown);
}
});
}

function highlight(x) {
	// console.log(x);
	// var id1='c'+data[x].id;
var id2='p'+x;
document.getElementById(id2).classList.add("blink");
}

$(document).on("click", ".open-ReplyModal", function () {
    var commentid = $(this).data('id');
    $(".modal-body #commentid").val( commentid );
});
		
//Post data to the server
$(document).ready(function() {
	$('#butsave').on('click', function() {
		$("#butsave").attr("disabled", "disabled");
		var id = document.forms["frm"]["Pcommentid"].value;
		var name = document.forms["frm"]["name"].value;
		var msg = document.forms["frm"]["msg"].value;
		if(name!="" && msg!=""){
			$.ajax({
				url: "save.php",
				type: "POST",
				data: {
					id: id,
					name: name,
					msg: msg,			
				},
				cache: false,
				success: function(dataResult){
					var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						$("#butsave").removeAttr("disabled");
						document.forms["frm"]["Pcommentid"].value = "";
						document.forms["frm"]["name"].value = "";
						document.forms["frm"]["msg"].value = "";
						LoadData(); 						
					}
					else if(dataResult.statusCode==201){
					   alert("Error occured !");
					}
					
				}
			});
		}
		else{
			alert('Please fill all the field !');
		}
	});
});

//Reply comment
$(document).ready(function() {
	$('#btnreply').on('click', function() {
		$("#btnreply").attr("disabled", "disabled");
		var id = document.forms["frm1"]["Rcommentid"].value;
		var name = document.forms["frm1"]["Rname"].value;
		var msg = document.forms["frm1"]["Rmsg"].value;
		if(name!="" && msg!=""){
			$.ajax({
				url: "save.php",
				type: "POST",
				data: {
					id: id,
					name: name,
					msg: msg,			
				},
				cache: false,
				success: function(dataResult){
					var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						$("#btnreply").removeAttr("disabled");
						document.forms["frm1"]["Rcommentid"].value = "";
						document.forms["frm1"]["Rname"].value = "";
						document.forms["frm1"]["Rmsg"].value = "";
						LoadData(); 
						$("#ReplyModal").modal("hide");
					}
					else if(dataResult.statusCode==201){
					alert("Error occured !");
					}
					
				}
			});
		}
		else{
			alert('Please fill all the field !');
		}
	});
});

//var row1 = $('<tr><td>'  + data[i].post + '</br><a data-toggle="modal" data-id="'+ commentId +'" title="Add this item" class="open-ReplyModal" href="#ReplyModal"><br>Reply</a>'+'</td></tr>');

//
//animation: blinker 1s linear infinite;