document.addEventListener("DOMContentLoaded", function (){
                
    document.querySelector('header nav .hamburger').addEventListener('click', function(){
        this.classList.toggle('active')   
        document.querySelector('.menu').classList.toggle('active')
    });

    var form = document.getElementById("staticform");
    form.addEventListener('submit', function(e){
        e.preventDefault();

        let request = new XMLHttpRequest();

        request.open('post', 'https://api.staticforms.xyz/submit', true );

        request.onload = function () {
            if(request.status == 200){
                let data = JSON.parse(request.response);
                console.log(data.message);
                
                let messageContainer = document.getElementById("message");
                messageContainer.innerHTML = data.message;

                messageContainer.setAttribute('class', 'has-message');


                setTimeout(function(){
                    messageContainer.innerHTML = "";
                    messageContainer.removeAttribute('class');
                }, 2000);


                form.reset();
            }
            
        };
        request.onerror = function(e){
            console.log(e);
            
        }

        request.send(serialize(form))
        console.log(serialize(form));
        
    });
});

var serialize = function (form) {

var serialized = [];

for (var i = 0; i < form.elements.length; i++) {

    var field = form.elements[i];

    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

    if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
            if (!field.options[n].selected) continue;
            serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
        }
    }

    else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
    }
}

return serialized.join('&');

};