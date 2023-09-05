let farmerdetails = {};




function askForNameInHindi() {
	console.log("script2 Function")
	chatHindiInputs.innerHTML = `
        <input type="text" id="name" placeholder="अपना नाम दर्ज करें">
        <button onclick="collectHindiName()">आगे</button>
    `;

}
function collectHindiName() {
	farmerdetails.name = document.getElementById('name').value;
	appendUserMessages(farmerdetails.name);
	appendBotMessages("अपना एप्लिकेशन आईडी दर्ज करें");
	askForApplicationID();
}