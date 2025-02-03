const aibank = document.getElementById("aibank")
const aiinvestment = document.getElementById("aiinvestment")
const aipercent = document.getElementById("aiperc")
const aiworth = document.getElementById("aiworth")
const headline = document.getElementById("news1")
const ainetworth = document.getElementById("ainetworth")
let preprice = 1000000
let waiting = false

let aiInvVal = 0
let aiPercVal = 0
let aiWorthVal = 0
let aiBankVal = 100000
let cashchange = 0
let refundperc = 0

function updateStats(){
aibank.textContent = aiBankVal.toLocaleString("en-UK")
aipercent.textContent = aiPercVal.toLocaleString("en-UK")
aiWorthVal = aiPercVal*stockprice
aiworth.textContent = aiWorthVal.toLocaleString("en-UK")
aiinvestment.textContent = aiInvVal.toLocaleString("en-UK")
ainetworth.textContent = (aiBankVal + aiWorthVal).toLocaleString("en-UK")
}


function doAI(){
	aiWorthVal = aiPercVal * stockprice
	updateStats()
	if (event == false){
		if (stockprice > preprice + 5000){
			invest("low")
		}
		if (stockprice < preprice - 5000){
			sell("low")
		}
	}
	else{
		if (waiting == false){
			if (event=="up"){
				invest("high")
				waiting = "down"
			}
			if (event=="down"){
				sell("high")
				waiting = "up"
			}
		}
		else{
			if (waiting == "up" && (stockprice > preprice)){
				invest("high")
				waiting = false
			}
			if (waiting == "down" && (stockprice < preprice)){
				sell("high")
				waiting = false
			}
		}
	}
	preprice = stockprice
}

function sell(change){
	if (change == "high"){
		console.log("sold all")
		aiInvVal = 0
		aiBankVal = aiBankVal + (aiPercVal*stockprice)
		aiWorthVal = 0
		aiPercVal = 0
		updateStats()
	}
	else{
		console.log("AI LS", change)
		cashchange = (aiWorthVal/10)*9
		aiInvVal = cashchange
		aiBankVal = (aiBankVal + (aiPercVal*stockprice)) - cashchange
		aiPercVal = cashchange / stockprice
		updateStats()
	}
}

function invest(change){
	if (change == "high"){
		console.log("invested 99%")
		cashchange = (aiBankVal/10)*9.9
		aiBankVal = aiBankVal - cashchange

		aiInvVal = aiInvVal + cashchange
		aiPercVal = aiInvVal / stockprice
		if (aiPercVal > 100){
			refundperc = aiPercVal - 100
			aiBankVal = aiBankVal + (refundperc * stockprice)
			aiPercVal = 100
			aiInvVal = aiInvVal - (refundperc * stockprice)
			
		}
		updateStats()
	}
	else{
		console.log("AI LI", change)
		cashchange = (aiBankVal/10)
		aiInvVal = aiInvVal + cashchange
		aiBankVal = aiBankVal - cashchange
		aiPercVal = aiPercVal + (cashchange / stockprice)
		if (aiPercVal > 100){
			refundperc = aiPercVal - 100
			aiBankVal = aiBankVal + (refundperc * stockprice)
			aiPercVal = 100
			aiInvVal = aiInvVal - (refundperc * stockprice)
			
		}
		updateStats()
	}
}