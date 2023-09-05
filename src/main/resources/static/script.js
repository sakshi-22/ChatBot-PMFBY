const chatContent = document.getElementById('chatContent');
const chatInputs = document.getElementById('chatInputs');
const bimaDiv = document.querySelector('.chatcustomchange[data-type="bima"]');
let fdetails = {};
let isMuted = false;

bimaDiv.addEventListener('click', function() {
    appendUserMessage('Fasal Bima Yojana');
    askForApplicationID();
});

function appendUserMessage(message) {
	const userMsg = document.createElement('div');
	userMsg.className = 'chat-message user-message';
	userMsg.textContent = message;
	chatContent.appendChild(userMsg);
	scrollToBottom();
}

function appendBotMessage(message) {
	const botMsg = document.createElement('div');
	botMsg.className = 'chat-message bot-message';
	botMsg.textContent = message;
	chatContent.appendChild(botMsg);
	textToSpeech(message);
	scrollToBottom();
}

function scrollToBottom() {
	chatContent.scrollTop = chatContent.scrollHeight;
}

function askForApplicationID() {
    chatInputs.innerHTML = `
        <input type="text" id="applicationId" >
        <span id="applicationIdError" style="color: red;"></span>
        <button id="nextButton" onclick="collectId()">Next</button>
    `;
    const applicationIdInput = document.getElementById('applicationId');
    const nextButton = document.getElementById('nextButton');
    const applicationIdError = document.getElementById('applicationIdError');
    
    appendBotMessage("Please enter your application ID.");

    applicationIdInput.addEventListener('input', function(event) {
        const inputValue = event.target.value;
        if (/^\d+$/.test(inputValue)) {
            applicationIdError.textContent = '';
            nextButton.disabled = false;
        } else {
            applicationIdError.textContent = 'Please enter a valid application ID.';
            nextButton.disabled = true;
        }
    });
}

function collectId() {
	fdetails.applicationId = document.getElementById('applicationId').value;
	appendUserMessage(fdetails.applicationId);
	askForName();
}
function askForName() {
    chatInputs.innerHTML = `
        <input type="text" id="name" placeholder="Enter your Name">
        <button onclick="collectName()">Next</button>
    `;
	appendBotMessage("Enter your Name");
}

function collectName() {
	fdetails.name = document.getElementById('name').value;
	appendUserMessage(fdetails.name);
	askForSurveyNumber();
}
function askForSurveyNumber() {
	chatInputs.innerHTML = `
        <input type="text" id="surveyNumber" >
        <button onclick="collectSurveyNumber()">Next</button>
    `;
	appendBotMessage("Enter your Survey Number");
}

function collectSurveyNumber() {
	fdetails.surveyNumber = document.getElementById('surveyNumber').value;
	appendUserMessage(fdetails.surveyNumber);
	askForNumber();
}
function askForNumber() {
    chatInputs.innerHTML = `
        <input type="text" id="phonenumber" placeholder="Enter your Phone Number">
        <button onclick="collectPhoneNumber()">Next</button>
    `;
	appendBotMessage("Enter your Phone Number");
}

function collectPhoneNumber() {
	fdetails.phonenumber = document.getElementById('phonenumber').value;
	if (validatePhoneNumber(fdetails.phonenumber)) {
        appendUserMessage(fdetails.phonenumber);
	    askForDate();
    } else {
        appendBotMessage("Please enter a valid 10-digit phone number.");
    }
	
}
function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
}
function askForDate() {
	chatInputs.innerHTML = `
        <input type="date" id="date" >
        <button onclick="collectDate()">Next</button>
    `;
	appendBotMessage("When did your loss happen");
}

function collectDate() {
	fdetails.date = document.getElementById('date').value;
	appendUserMessage(fdetails.date);
	askForCause();
}

function askForCause() {
	chatInputs.innerHTML = `
        <input type="text" id="cause" >
        <button onclick="collectCause()">Next</button>
    `;
	appendBotMessage("Enter your Cause of Loss");
}

function collectCause() {
	fdetails.cause = document.getElementById('cause').value;
	appendUserMessage(fdetails.cause);
	askLifeCycle();
}

function askLifeCycle() {
	chatInputs.innerHTML = 
	`<select id="lifeCycle">
    <option value="Pre-sowing">Pre-sowing</option>
    <option value="Sowing">Sowing</option>
    <option value="Germination/Planting">Germination/Planting</option>
    <option value="Vegetative">Vegetative</option>
    <option value="Reproductive/Flowering">Reproductive/Flowering</option>
    <option value="Maturity">Maturity</option>
    <option value="Harvesting">Harvesting</option>
    </select>
        <button onclick="collectLifeCycle()">Next</button>
    `;
	appendBotMessage("Select Crop Life Cycle");
}
function collectLifeCycle() {
	fdetails.lifeCycle = document.getElementById('lifeCycle').value;
	appendUserMessage(fdetails.lifeCycle);
	askForState();
}

function askForState() {
	chatInputs.innerHTML = `
    <select name="states" id="states">
    <option value="Maharashtra">Maharashtra</option>
    </select>

        <button onclick="collectState()">Next</button>
    `;
	appendBotMessage("Which state are you from?");
}

function collectState() {
	fdetails.state = document.getElementById('states').value;
	appendUserMessage(fdetails.state);
	askFordistrict();
}

function askFordistrict() {
	chatInputs.innerHTML = `
    <select id="district">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Delhi">Delhi</option>
    <option value="Puducherry">Puducherry</option>
    <option value="Ladakh">Ladakh</option>
    </select>
    
        <button onclick="collectDistrict()">Next</button>
    `;
	appendBotMessage("Which District are you from?");
}
function collectDistrict() {
	fdetails.district = document.getElementById('district').value;
	appendUserMessage(fdetails.district);
	askForTaluka();
}
function askForTaluka() {
	chatInputs.innerHTML = `
    <select id="taluka">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Delhi">Delhi</option>
    <option value="Puducherry">Puducherry</option>
    <option value="Ladakh">Ladakh</option>
    </select>
    
        <button onclick="collectTaluka()">Next</button>
    `;
	appendBotMessage("Which Taluka are you from?");
}

function collectTaluka() {
	fdetails.taluka = document.getElementById('taluka').value;
	appendUserMessage(fdetails.taluka);
	askForRevenueCircle();
}

function askForRevenueCircle() {
	chatInputs.innerHTML = `
    <select id="revenuecircle">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Delhi">Delhi</option>
    <option value="Puducherry">Puducherry</option>
    <option value="Ladakh">Ladakh</option>
    </select>
    
        <button onclick="collectRevenueCircle()">Next</button>
    `;
	appendBotMessage("Select Your revenue Circle");
}

function collectRevenueCircle() {
	fdetails.revenuecircle = document.getElementById('revenuecircle').value;
	appendUserMessage(fdetails.revenuecircle);
	askForGramPanchayat();
}
function askForGramPanchayat() {
	chatInputs.innerHTML = `
    <select id="grampanchayat">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
   
    </select>
    
        <button onclick="collectGramPanchayat()">Next</button>
    `;
	appendBotMessage("Select your Gram Panchayat");
}

function collectGramPanchayat() {
	fdetails.grampanchayat = document.getElementById('grampanchayat').value;
	appendUserMessage(fdetails.grampanchayat);
	askForVillage();
}
function askForVillage() {
	chatInputs.innerHTML = `
        <input type="text" id="village" placeholder="Enter your Village">
        <button onclick="collectVillage()">Next</button>
    `;
	appendBotMessage("Enter your Village");
}

function collectVillage() {
	fdetails.village = document.getElementById('village').value;
	appendUserMessage(fdetails.village);
	askForCrop();
}
function askForCrop() {
	chatInputs.innerHTML = `
    <select id="crop">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    </select>
        <button onclick="collectCrop()">Next</button>
    `;
	appendBotMessage("Select your Crop");
}

function collectCrop() {
	fdetails.crop = document.getElementById('crop').value;
	appendUserMessage(fdetails.crop);
	finish();
}

function finish() {
	let HideMydiv = document.getElementById("chatInputs");
	let myDiv = document.getElementById("chat-bar-bottom");
	let btn = document.createElement("button");
	HideMydiv.style.display = "none";
	myDiv.style.display = "block";
	btn.innerHTML = "Submit";
	btn.type = "submit";
	btn.name = "formBtn";
	myDiv.appendChild(btn);
	btn.addEventListener("click", displayMessage);
	chatInputs.innerHTML = '';
}
function displayMessage() {

	const myObject = {
		applicationId: fdetails.applicationId,
		name: fdetails.name,
		state: fdetails.state,
		district: fdetails.district,
		taluka: fdetails.taluka,
		village: fdetails.village,
		surveyNumber: fdetails.surveyNumber,
		cause: fdetails.cause,
		date: fdetails.date

	};
	//sendDataToAngular(myObject);
	//document.getElementById("chat-bar-bottom").innerHTML = "Thank you for submitting your details!";
	//console.log(fdetails);
	let sucessMsg = document.getElementById("sucessMsg");
	const chatBarBottom = document.getElementById("ThankYouContainer");
	sucessMsg.style.display = "block";
	chatBarBottom.innerHTML = "🎉 Thank you for submitting your details! 🎉";  // Using party popper emoji for emphasis
	chatBarBottom.style.opacity = '1'; // Fade-in effect
	chatBarBottom.style.animation = 'thankYouAnimation 1s ease-out'; // Apply animation
	console.log(fdetails);
}
function sendDataToAngular(data) {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	scope.receiveDataFromJS(data);
	scope.$apply();
}
function textToSpeech(text) {
	if (isMuted) {
		return; // Exit the function if the chatbot is muted
	}
	let synth = window.speechSynthesis;
	let utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'en-US'; // You can change the language code if needed
	synth.speak(utterance);
}
function textToHindiSpeech(text) {
	if (isMuted) {
		return; // Exit the function if the chatbot is muted
	}
	let synth = window.speechSynthesis;
	let utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'hi-IN'; // You can change the language code if needed
	synth.speak(utterance);
}


// Start the chatbot
document.addEventListener("DOMContentLoaded", function() {
	//askForName();
});


function toggleMute() {
	isMuted = !isMuted; // Toggle the mute state
	const muteButton = document.getElementById('muteButton');

	if (isMuted) {
		muteButton.textContent = "🔇"; // Change to muted icon
	} else {
		muteButton.textContent = "🔊"; // Change to speaker icon
	}
}

document.getElementById("allincall-popup").addEventListener("click", function() {
	var chatbotDiv = document.querySelector(".chatbot");
	var chatboatImg = document.querySelector("#allincall-popup");
	if (chatbotDiv.style.display === "none" || chatbotDiv.style.display === "") {
		chatbotDiv.style.display = "block";
		chatboatImg.style.display = "none";
		//textToSpeech("Hello I am Sahayak. Choose your prefferred language");
	} else {
		initializeChatbot();
		chatbotDiv.style.display = "none";
		$(this).style.display = "block";
	}
});

document.getElementById("closeButton").addEventListener("click", function() {
	var chatbotDiv = document.querySelector(".chatbot");
	var chatboatImg = document.querySelector("#allincall-popup");
	if (chatbotDiv.style.display === "block" || chatbotDiv.style.display === "") {
		chatbotDiv.style.display = "none";
		chatboatImg.style.display = "block";
	} else {
		initializeChatbot();
		chatbotDiv.style.display = "block";
		$(this).style.display = "none";
	}
});

function initializeChatbot() {
	chatContent.innerHTML = '';  // Clear previous chat content
	//askForName();
}
function showHiddenDiv() {
	const englishRadio = document.getElementById('englishRadio');
    const hindiRadio = document.getElementById('hindiRadio');
    const hiddenDiv = document.getElementById('hiddenDiv');
    const hindihiddenDiv = document.getElementById('hindihiddenDiv');
	if (englishRadio.checked) {
		hiddenDiv.style.display = 'block';
		hindihiddenDiv.style.display = 'none';
		textToSpeech("Hi, I am Sahayak. How may I help you?");
		//askForName();
	} else if (hindiRadio.checked) {
		hindihiddenDiv.style.display = 'block';
		hiddenDiv.style.display = 'none';
		textToHindiSpeech("नमस्ते! कृपया अपना विवरण प्रदान करें");
		askForNameInHindi();

	}
}

