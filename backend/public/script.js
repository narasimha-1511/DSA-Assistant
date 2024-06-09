
 const animation = document.getElementById('loader');
 const chat_box = document.getElementsByClassName('chat-messages')[0];
 const userInput = document.querySelector('#user-input');
 const LeetCodeUrl = document.querySelector('#leetcode-url')
 const SendButton = document.getElementById('send-button');

 userInput.addEventListener('keyup', function(event) {
     if (event.keyCode === 13) {
         event.preventDefault();
         SendButton.click();
     }
 });

 SendButton.addEventListener('click', function() {
     // Displaying the loader animation
     animation.style.display = 'block';

     const user_message = document.createElement('div');
     user_message.className = 'message user-message';
     if(ValidateUrl(LeetCodeUrl.value)){
     user_message.innerHTML = ` <a href="${LeetCodeUrl.value}" target="_blank">${LeetCodeUrl.value}</a> <br/>  ${userInput.value}`;
     chat_box.appendChild(user_message);
     GetGetResponse().then(() => {
         animation.style.display = 'none';
     })
     //reset the input fields
     LeetCodeUrl.value = '';
     userInput.value = '';
    }
 });

 const GetGetResponse = async () => {
     const response = await fetch(
         'bard/getPrompt'
         , {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 'message': userInput.value,
                 'language': document.getElementById('language').value
             })
         }).then(response => response.json())
         .then(data => {
             var bot_message = document.createElement('div');
             bot_message.className = 'message bot-message';
             var pre = document.createElement('pre');
             pre.textContent = data['prompt'];
             bot_message.appendChild(pre);
             chat_box.appendChild(bot_message);
         });
     
 }

 const ValidateUrl = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (!pattern.test(url)) {
            alert("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }   