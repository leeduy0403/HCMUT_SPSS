const re=/^[a-z]+\.[a-z]+[0-9]*/
var formAd = document.getElementById('admin-form');
var x = document.getElementById('admin-msg');
    formAd.addEventListener('submit',function(event){
        event.preventDefault();
        var username=document.getElementById('username').value;
        var password=document.getElementById('password').value;
        if(re.exec(username)){
            x.innerHTML="";
            window.location.href = "./indexAdmin.html";
        } else{
            x.style="background-color: rgb(255, 238, 221);color:red";
            x.innerHTML="Invalid HCMUT account";
            x.class="errors";
        }
    })