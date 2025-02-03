function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


const buymoney = document.getElementById("shares")
const investment = document.getElementById("investment")
const perc = document.getElementById("perc")
const vals = document.getElementById("worth")
const price1 = document.getElementById("price1")
const price2 = document.getElementById("price2")
const price3 = document.getElementById("price3")
const news1 = document.getElementById("news1")
const content = document.getElementById("main content")
const news2 = document.getElementById("news2")
const news3 = document.getElementById("news3")
const sellbutt = document.getElementById("sell")
const buybutt = document.getElementById("BUY")
var bank = 100000
const bankelement = document.getElementById("bank")
const sellpercent = document.getElementById("sellpercent")
const countdown = document.getElementById("remaining")
const speedbutt = document.getElementById("speed")
const networth = document.getElementById("networth")
let percentage = 0
let stockprice = 1000000
let cash = 0
let value = 0
let clicks = 0
let hooray = false
let event = false
let worth = 0
let invested = 0
let time = 6
let speed = "slow"
let incr = 0
let change = 0
let steps = 0
let xvals = ['-114s', '-108s', '-102s', '-96s', '-90s', '-84s', '-78s', '-72s', '-66s', '-60s', '-54s', '-48s', '-42s', '-36s', '-30s', '-24s', '-18s', '-12s', '-6s', '0s']
let yvals = [999194, 997250, 1018496, 993973, 1014284, 1017586, 991957, 1000834, 1011035, 997849, 1010327, 1002845, 1008707, 1099807, 991013, 1004668, 1006513, 991888, 988677]
let msgs = ["this is a message", 
"this is another message", 
"Plane Josh has died age 14", 
"Jacob has died age 9348", 
"Liz Truss admits to being diagnosed with Early Onset Stupidity", 
"Schoolbus full of rats explodes, 4 injured", 
"Gregorian calender gets renames the Jeremian calander", 
"King trips over egg and dies", 
"Irish potato famine was caused by lack of cheese/butter", 
"Woman dies on bench, arrested under suspicions of being homeless", 
"Godzilla attacks White House, 243 confirmed dead", 
"Danny dies age 37", 
"Sam dies age 18", 
"Disabled parking spaces actually for Jet-Powered wheelchairs", 
"Weed Monkey(c) has been proven to revive you after death", 
"McDonalds announce new food range to be priced at $-2.", 
"Rishi Sunak genetic composition %95 rat", 
"Boris Johnson was under the influence every day in parliament", 
"Just stop oil protest successfully just stops oil", 
"Chinese government are actually nazis", 
"Putin admits to having bought trump in 2016", 
"Kim Jong-Un classified as 'Devil'", 
"THE WORLD IS A SIMUL-", 
"Breaking Study: Communism actually works", 
"Russia now a monarchy", 
"Mysterious glowing orb vanishes overnight", 
"In un-suspicous circumstances, Putin falls off building", 
"Trump confirmed to be mountain troll", 
"Here is the news", 
"coming to you every hour upon the hour", 
"Josh cobsDickhole dies at age of -5.237"]
let allyvals = []
let allxvals = []
let counter = 0
let initiated = false

buymoney.addEventListener(
  "keyup", function(weedmonkeyyay) {
    console.log(weedmonkeyyay.keycode)
    if (weedmonkeyyay.keyCode === 13) {
      weedmonkeyyay.preventDefault();
      buybutt.click();
      }
    }
  );



let stonks = new Chart("chart", {
			type: "line",
			data:{
			labels: xvals,
			datasets: [{
			backgroundColor:"rgba(255, 0, 0, 0.1)",
			borderColor: "rgba(255, 0, 0, 1.0)",
			data: yvals
			}]
			},
			options:{
				animation: {animationEnabled: false},
				legend: {
           		 display: false
	         	}
					}

		}
	)		

let alltime = new Chart("alltime", {
			type: "line",
			data:{
			labels: allxvals,
			datasets: [{
			backgroundColor:"rgba(255, 0, 0, 0.4)",
			borderColor: "rgba(255, 0, 0, 1.0)",
			color:"red",
			pointRadius:1,
			pointBackgroundColor:"red",
			data: allyvals
			}]
			},
			options:{
				scales: {
					yAxes:[{gridLines: {color:"rgba(255, 255, 255, 0.5)"}}],
					xAxes:[{gridLines: {color:"rgba(255, 255, 255, 0.5)"}}]
},
				legend: {
           		 display: false
	         	},
				plugins: {
					labels: {
						fontColor:"red"
						}
					}
			}

		}
	)		

function updateStockPrices(){
	
	if (updateTimer() == 0){
		doAI()
		if (event == false){
			dum = false
			price3.textContent = price2.textContent.toLocaleString("en-UK")
			price2.textContent = price1.textContent.toLocaleString("en-UK")
			small = -10000
			big = 10000
			if (Math.round(getRandomArbitrary(0, 100))==3){
				event = "down"
				small = -((stockprice*6)/5)
				big = -(stockprice/4)
				dum = true
				liveUpdate("STOCK MARKET CRASH!!!!!!!!!")
			}
			rng = Math.round(getRandomArbitrary(0, 100))
			if(rng == 2 && (dum == false)){
				event= "up"
				small = stockprice
				big = (stockprice *4) + 23659
				liveUpdate("STOCK MARKET TO THE MOON!!!!!!!!!")
				}
			change = getRandomArbitrary(small, big)
			steps = Math.round(getRandomArbitrary(3, 10))
			incr = change/steps
			if (event == false){stockprice = stockprice + change}
			if (stockprice < 0){stockprice=getRandomArbitrary(0.1, 100)}
			if (yvals.push(stockprice)>20){
				yvals.shift()
				}
			allyvals.push(stockprice)
			allxvals.unshift(-6*counter)
			counter++
			price1.textContent = stockprice.toLocaleString("en-UK")
			worth = percentage*stockprice
			worth = Math.round(worth*100)/100
			vals.textContent = worth.toLocaleString("en-UK")
			stonks.update()
			alltime.update()
			}
		if (event != false){
			price3.textContent = price2.textContent.toLocaleString("en-UK")
			price2.textContent = price1.textContent.toLocaleString("en-UK")
			if (event == "down"){
				if (steps > 0){
					stockprice = stockprice + incr
					change = change + incr
					steps = steps - 1
				}
				if (steps == 0){
					event = false
					change = 0
					incr = 0
				}
			}
			else{
				if (steps > 0){
					stockprice = stockprice + incr
					change = change - incr
					steps = steps -1
				}
				if (steps == 0){
					event = false
					change = 0
					incr = 0
				}
			price1.textContent = stockprice
		}
		if (stockprice < 0){stockprice=getRandomArbitrary(0.1, 100)}
		if (yvals.push(stockprice)>20){
			yvals.shift()
		}
		allyvals.push(stockprice)
		allxvals.unshift(-6*counter)
		counter++
		price1.textContent = stockprice.toLocaleString("en-UK")
		worth = percentage*stockprice
		worth = Math.round(worth*100)/100
		vals.textContent = worth.toLocaleString("en-UK")
		stonks.update()
		alltime.update()
		}
	}
networth.textContent = (bank + worth).toLocaleString("en-UK")
}


function updateTimer(){
countdown.textContent = countdown.textContent - 1
if (countdown.textContent < 1){
countdown.textContent = time
return 0
}
}
function speedChange(){
	if (speed == "fast"){
		speedbutt.textContent = "Slow Mode"
		speed = "slow"
		time = 6
		countdown.textContent = 6
	}
	else{
		speedbutt.textContent = "Fast Mode"
		speed = "fast"
		time = 0
		countdown.textContent = 0
}
}

speedbutt.addEventListener("click", speedChange)

updateStockPrices()
updateStockPrices()
updateStockPrices()
updateStockPrices()
updateStockPrices()
updateStockPrices()
setInterval(updateStockPrices, 1000)

function liveUpdate(message=[msgs[~~(Math.random() * msgs.length)], "Business as usual...", "Business nearly as usual...?"][~~(Math.random() * 3)]){
news3.textContent = news2.textContent
news2.textContent = news1.textContent
news1.textContent = message
}

setInterval(liveUpdate, 15000)
buybutt.addEventListener("click", () => {
	cash = parseFloat((buymoney.value).replaceAll(",", ""))
	console.log(cash, isFinite(cash), buymoney.value, buymoney.value.replaceAll(",", ""))
	if ((cash <= parseFloat(bank)) && (isFinite(buymoney.value.replaceAll(",", "")))&&(cash>0)){
		buymoney.value = ""
		percentage = percentage + (cash/stockprice)
		bank = Math.round((bank - cash)*100)/100
		bankelement.textContent = bank.toLocaleString("en-UK")
		worth = percentage*stockprice
		invested = invested+cash
		investment.textContent = invested.toLocaleString("en-UK")
		perc.textContent = percentage
		worth = Math.round(worth*100)/100
		vals.textContent = worth.toLocaleString("en-UK")
		console.log("yeah it works you idiot")
		if (percentage < 100){hooray = false}
		if (percentage >= 100 && hooray != true){
			alert("you now own 100% of the company! you win")
			hooray = true
			}
		if (percentage >= 100){
			difference = percentage - 100
			bank = bank + (difference*stockprice)
			bankelement.textContent = bank.toLocaleString("en-UK")
			invested = invested - (difference*stockprice)
			investment.textContent = invested.toLocaleString("en-UK")
			percentage = 100
			perc.textContent = 100
			worth = 100*stockprice
			worth = Math.round(worth/100)*100
			vals.textContent = worth.toLocaleString("en-UK")
}
		}
	else{
		console.log("cash variable is less than banktextcontent")
		alert("You don't have that")
		buymoney.value = ""
}
	}
)
function sellbuttfunc(){
	bank = (Math.round((parseFloat(bank)+worth)*100)/100)
	bankelement.textContent = bank.toLocaleString("en-UK")
	worth = 0.00
	investment.textContent = 0.00
invested = 0
	perc.textContent = 0.00
	percentage = 0.00
	vals.textContent = 0.00
}
function readNews(message=1){
return {1:news1, 2:news2, 3:news3}[message]
}


sellbutt.addEventListener("click", sellbuttfunc)
