var socket = io("http://localhost:3000");

socket.on('server-sent-data',function(data){
    $("#chat-content").append(data)
})
$(document).ready(function(){
    $("#send").click(function(){
        socket.emit("chat-message", "Hello world");
    });
});
$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
        });
