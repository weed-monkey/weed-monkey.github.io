var bank = parseInt(localStorage.getItem("weedMonkeyBank"));
var inProgress = false;

if (isNaN(bank)){
  bank = 1000;
  }
const bankReset = document.getElementById("resetBank")
//cards
const cardnames = ["2", "3", "4", "5", "6", "7", "8", "9", "king", "queen", "jack", "ace"];
const suits = ["spades", "clubs", "diamonds", "hearts"];

//history
const history1 = document.getElementById("history1");
const history2 = document.getElementById("history2");
const history3 = document.getElementById("history3");

//games
const guessed = document.getElementById("guessed");
const guessInvested = document.getElementById("invested1");
const guessButton = document.getElementById("go1");
const guessResult = document.getElementById("result1");
const result2 = document.getElementById("result2");

const bjButton = document.getElementById("bjStart");
const bjButton2 = document.getElementById("stand");
const bjButton3 = document.getElementById("hit");
const bjDouble = document.getElementById("doubleDown");
const bjReset = document.getElementById("reset");
const bjInvested = document.getElementById("invested2");
const bjDealer = document.getElementById("dealer1");
const bjPlayer = document.getElementById("player1");
const bjDealerTotal = document.getElementById("dealerVal");
const bjPlayerTotal = document.getElementById("playerVal");
var bjfinished = true;
var bjInv;
var bjBegun;
var dealerVal = 0;
var playerVal = 0;
var dealerCards = [];
var playerCards = [];
const bjResult = document.getElementById("result3");
const dealerCardDiv = document.getElementById("dealerCards");
const playerCardDiv = document.getElementById("playerCards");
const blank = document.createElement("img");
blank.src = "../../assets/casino/cards/card_back.png";
const instruction = document.getElementById("bjbj");

const icons = ["🍆", '🍒', '🍋', '🍇', '🍉', ":3", ">:(", ">:)", ">:|", "|:<", "(:<", "):<"] // "🫒",'🍍',
const slotItems = document.querySelectorAll('.slot-item')
const slotBet = document.getElementById("invested3")
const slotButton = document.getElementById("slot-button")
var reel1 = false
var reel2 = false
var reel3 = false
//reel 1
const reel1Div = document.getElementById("slot-item1")
const reel1top = document.getElementById("top-icon1")
const reel1main = document.getElementById("main-icon1")
const reel1bottom = document.getElementById("bottom-icon1")
//reel 2
const reel2Div = document.getElementById("slot-item2")
const reel2top = document.getElementById("top-icon2")
const reel2main = document.getElementById("main-icon2")
const reel2bottom = document.getElementById("bottom-icon2")
//reel 3
const reel3Div = document.getElementById("slot-item3")
const reel3top = document.getElementById("top-icon3")
const reel3main = document.getElementById("main-icon3")
const reel3bottom = document.getElementById("bottom-icon3")
var catProgress = false
const catSrc = "cat.jpg"
const smallCats = document.getElementsByClassName("smallCat")


//craigs
const goodCraig = "live craig.png"
const loveCraig = "live craig HAPPY.png"
const badCraig = "live craig angry.png"
const hateCraig = "live craig REALLY angry.png"
const craigImg = document.getElementById("craigimg")
const craigDiv = document.getElementById("craigdiv")


async function spin() {
    inv = removeCommas(slotBet.value)
    console.log(inv)
    if (!isNaN(inv)) {
        if (isValid(parseFloat(slotBet.value)) && !catProgress) {
            catProgress = true
            document.getElementById("cat1").src = ""
            document.getElementById("cat2").src = ""
            document.getElementById("cat3").src = ""
            for (var x of smallCats) {
                x.src = ""
            }
            await spinGame(inv)
            catProgress = false
        }
    }
}

async function spinGame(inv, delay=2000) {
    transaction(-parseFloat(inv))
    reel1 = false
    reel2 = false
    reel3 = false
    await spinWheels()
    res1 = reel1main.textContent
    res2 = reel2main.textContent
    res3 = reel3main.textContent
    //1 cat = 5x
    //2 cat = 20x
    //3 cat = 200x

    //pair = 3x
    //3 = 50x
    if (!([res1, res2, res3].includes(""))) {
        x1 = 1
        if (res2 == res1) {
            x1++
        }
        if (res3 == res1) {
            x1++
        }
        highest = x1
        if (x1 == 1) {
            x2 = 1
            if (res2 == res3) {
                x2++
            }
            highest = x2
        }
        if (highest == 2) {
            transaction(inv * 2);
            slotsFlash(100)
        }
        if (highest == 3) {
            transaction(inv * 40);
            slotsFlash(100)
        }

    } else {
        x4 = 0
        for (let car of [res1, res2, res3]) {
            if (car == "") {
                x4++
            }
            console.log(car)
            console.log(x4)
        }
        if (x4 == 1) {
            transaction(inv * 5);
            slotsFlash(100)
        }
        if (x4 == 2) {
            transaction(inv * 20);
            slotsFlash(100)
        }
        if (x4 == 3) {
            transaction(inv * 200);
            slotsFlash(20)
        }
    }
}

function setReelsTrueAfterTime(ms, mss, msss) {
    setTimeout(()=>{
        reel1 = true
        if (Math.round(getRandomArbitrary(1, 30)) == 2) {
            reel1main.textContent = ""
            document.getElementById("cat1").src = catSrc
            console.log("happned")
        } else {
            console.log("unlucky")
        }
        if (Math.round(getRandomArbitrary(1, 12)) == 2) {
            smallCats[0].src = catSrc;
            reel1top.textContent = ""
        }
        if (Math.round(getRandomArbitrary(1, 12)) == 2) {
            smallCats[1].src = catSrc;
            reel1bottom.textContent = ""
        }
    }
    , ms);
    setTimeout(()=>{
        reel2 = true
        if (Math.round(getRandomArbitrary(1, 30)) == 4) {
            reel2main.textContent = ""
            document.getElementById("cat2").src = catSrc
        }
        if (Math.round(getRandomArbitrary(1, 12)) == 2) {
            smallCats[2].src = catSrc;
            reel2top.textContent = ""
        }
        if (Math.round(getRandomArbitrary(1, 12)) == 2) {
            smallCats[3].src = catSrc;
            reel2bottom.textContent = ""
        }
    }
    , mss);
    setTimeout(()=>{
        reel3 = true
        if (Math.round(getRandomArbitrary(1, 30)) == 4) {
            reel3main.textContent = ""
            document.getElementById("cat3").src = catSrc
        }
        if (Math.round(getRandomArbitrary(1, 12)) == 2) {
            smallCats[4].src = catSrc;
            reel3top.textContent = ""
        }
        if (Math.round(getRandomArbitrary(1, 12)) == 2) {
            smallCats[5].src = catSrc;
            reel3bottom.textContent = ""
        }
    }
    , msss);
}

async function spinWheels() {
    stop = false
    setReelsTrueAfterTime(getRandomArbitrary(100, 2000), getRandomArbitrary(200, 7500), getRandomArbitrary(500, 15000))
    while (!reel1 || !reel2 || !reel3) {
        //asyncStop()
        if (!reel1) {
            reel1bottom.textContent = reel1main.textContent
            reel1main.textContent = reel1top.textContent
            reel1top.textContent = getRandomItem(icons)
        }
        await new Promise(resolve=>setTimeout(resolve, getRandomArbitrary(0.1, 90)));
        if (!reel2) {
            reel2bottom.textContent = reel2main.textContent
            reel2main.textContent = reel2top.textContent
            reel2top.textContent = getRandomItem(icons)
        }
        await new Promise(resolve=>setTimeout(resolve, getRandomArbitrary(0.1, 90)));
        if (!reel3) {
            reel3bottom.textContent = reel3main.textContent
            reel3main.textContent = reel3top.textContent
            reel3top.textContent = getRandomItem(icons)
        }
        await new Promise(resolve=>setTimeout(resolve, getRandomArbitrary(0.1, 90)));
    }
}

function getRandomItem(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}

function findKey(obj, val) {
    for (let key in obj) {
        if (String(key) == String(val)) {
            return obj[key];
        }
    }
    return null;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function inject(message, element) {
    element.textContent = message
}

function flashScreen(duration, slots=false) {
    const body = document.body;
    const originalColor = body.style.backgroundColor;
    const originalTextColor = body.style.color;
    body.style.backgroundColor = "white";
    body.style.color = "white";
    setTimeout(()=>{
        body.style.backgroundColor = originalColor;
        body.style.color = originalTextColor;
    }
    , duration);
}

function slotsFlash(duration) {
    const div = document.getElementById("slot-machine");
    const originalColorDiv = div.style.backgroundColor;
    const originalTextColorDiv = div.style.color;
    div.style.backgroundColor = "white";
    div.style.color = "white";
    setTimeout(()=>{
        div.style.backgroundColor = originalColorDiv;
        div.style.color = originalTextColorDiv;
    }
    , duration);
}
function removeCommas(str) {
    str = String(str)
    return str.replace(/,/g, '');
}

function isValid(value) {
    if (!isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value)) && value <= bank + 100 && value >= 0.01 && !inProgress) {
        return !isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value)) && value <= bank + 100 && value >= 0.01 && !inProgress
    } else {
        alert("please ensure all boxes are filled correctly, and there are no games in progress")
    }
}

function transaction(result) {
  
  floatColour = "red"
  assume = ""
  if (result > 0) {floatColour = "light-green";assume="+"}
  showFloatingNumber(assume+result, floatColour)
    if (bank >= 0 || result < 0) {
        bank += result
        document.getElementById("bank").textContent = bank
        history1.textContent = history2.textContent
        history2.textContent = history3.textContent
        history3.textContent = result
    } else {
        console.log(Math.floor(result * 0.9))
        bank += Math.floor(result * 0.9)
        document.getElementById("bank").textContent = bank
        history1.textContent = history2.textContent
        history2.textContent = history3.textContent
        history3.textContent = `${Math.floor(result * 0.9)} - 10% (debt)`
    }
    for (var x of [history1, history2, history3])
        if (parseFloat(x.textContent) >= 0) {
            x.style.color = "green"
        } else {
            x.style.color = "red"
        }
        
    craigDiv.style.opacity = "0.85"
    craigImg.style.width = "200px"
    craigDiv.style.width = ""
    craigImg.style.height = ""
    craigDiv.style.height = ""
    craigDiv.style.left = "75%"
    craigDiv.style.top = "0px"
    if (bank >= 20000){
      craigImg.src = loveCraig

      }
    else if (bank >= 900){
      craigImg.src = goodCraig
      }
    else if (bank < 0){
      craigImg.src = hateCraig
      craigDiv.style.opacity = "0.8"
      craigImg.style.height = "100%"
      craigImg.style.width = "100%"
      craigDiv.style.width = "100%"
      craigDiv.style.height = "100%"
      craigDiv.style.left = "0px"
      craigDiv.style.top = "0px"
      alert("CRAIG DOES NOT LIKE DEBT")
      }
    else {
      craigImg.src = badCraig
      }
      localStorage.setItem("weedMonkeyBank", bank);
}

//games

function guess(choice, invested) {
    res = Math.round(getRandomArbitrary(1, 20))

    choice = removeCommas(choice)
    invested = removeCommas(invested)
    if (isValid(choice) && isValid(invested)) {
        guessResult.textContent = `Last result was ${res}`
        if (choice == res) {
            inject("Hoorah! you got it right!", result2)
            flashScreen(200)
            transaction(invested * 14)
        } else {
            inject("Incorrect. :(", result2)
            transaction(-invested)
        }
    }
}

function showFloatingNumber(increase, colr = "red") {
    let floatingNumber = document.createElement('div');
    floatingNumber.classList.add('floating-number');
    floatingNumber.textContent = increase; 
    let topDeviation = (Math.random() * 16 - 8);
    let rightDeviation = (Math.random() * 15 - 8);
    let topPosition = 60 - topDeviation + '%';
    let rightPosition = 10 - rightDeviation + '%';
    if (colr != "red"){floatingNumber.style.zIndex = 99}
    floatingNumber.style.top = topPosition;
    floatingNumber.style.right = rightPosition;
    floatingNumber.style.color = colr
    document.body.appendChild(floatingNumber); 
  
    floatingNumber.style.animation = 'floatUp 2s ease-out forwards';
    
  
    setTimeout(() => {
      floatingNumber.remove();
    }, 2000);
  }

function bjInit(invested) {
    transaction(-invested)
    bjfinished = false
    bjButton.style.display = "none"
    bjButton2.style.display = "block"
    bjButton3.style.display = "block"
    if (bank+100 >= invested){
      bjDouble.style.display = "block"
    }
    instruction.style.display = "none"
    bjInvested.style.display = "none"
    bjInv = invested
    p1 = genCard()
    p2 = genCard()
    d1 = genCard()

    var pCard = document.createElement("img")
    pCard.src = p1[0]
    playerCardDiv.append(pCard)
    var pCard = document.createElement("img")
    pCard.src = p2[0]
    playerCardDiv.append(pCard)
    var dCard = document.createElement("img")
    dCard.src = d1[0]
    dealerCardDiv.append(dCard)
    dealerCardDiv.append(blank)
    dealerCards.push(d1)
    playerCards.push(p1)
    playerCards.push(p2)
    bjScoreCalc()
}

function bjScoreCalc() {
    aces = 0
    highaces = 0
    dealerVal = 0
    playerVal = 0
    for (card of playerCards) {
        if (!card[0].includes("ace")) {
            playerVal += card[1]
        } else {
            aces += 1
        }
    }
    for (let i = 0; i < aces; i++) {
        if (playerVal + 11 < 22) {
            playerVal += 11
            highaces += 1
        } else {
            playerVal += 1
        }
    }
    if (playerVal > 21) {
        for (let i = 0; i < highaces; i++) {
            playerVal -= 10
            if (playerVal < 22) {
                break
            }
        }
    }
    aces = 0
    highaces = 0
    bjPlayerTotal.textContent = playerVal
    for (card of dealerCards) {
        if (!card[0].includes("ace")) {
            dealerVal += card[1]
        } else {
            aces += 1
        }
    }
    for (let i = 0; i < aces; i++) {
        if (dealerVal + 11 < 22) {
            dealerVal += 11
            highaces += 1
        } else {
            dealerVal += 1
        }
    }
    if (dealerVal > 21) {
        for (let i = 0; i < highaces; i++) {
            dealerVal -= 10
            if (dealerVal < 22) {
                break
            }
        }
    }
    bjDealerTotal.textContent = dealerVal
}

function genCard() {
    suffix = ""
    val = 10
    const cName = getRandomItem(cardnames)
    if (isNaN(parseFloat(cName)) && cName != "ace") {
        suffix = 2
    }
    const cSuit = getRandomItem(suits)
    path = `../../assets/casino/cards/${cName}_of_${cSuit}${suffix}.png`
    if (isNaN(parseFloat(cName)) && cName != "ace") {
        value = 10
    } else if (cName == "ace") {
        value = [1, 11]
    } else {
        value = parseInt(cName)
    }
    return [path, value]
}

async function blackjack(button) {
    if (button == "hit") {
        console.log("hit")
        bjDouble.style.display = "none"
        card = genCard()
        pCard = document.createElement("img")
        pCard.src = card[0]
        playerCardDiv.append(pCard)
        playerCards.push(card)
    } 
    else {
        console.log("else")
        bjDouble.style.display = "none"
        bjButton2.style.display = "none"
        bjButton3.style.display = "none"
        if (button == "double"){
              console.log("doubled")
              transaction(-bjInv)
              bjInv *= 2
              card = genCard()
              pCard = document.createElement("img")
              pCard.src = card[0]
              playerCardDiv.append(pCard)
              playerCards.push(card)
              bjScoreCalc()
              if (playerVal > 21) {
                bjfinished = true
                bjResult.textContent = "Over 21! Bust - You lose"
              }
            }
          if (!bjfinished){
          dealerCardDiv.removeChild(dealerCardDiv.children[1])
          while (dealerVal < playerVal && dealerVal < 17) {
              card = genCard()
              dCard = document.createElement("img")
              dCard.src = card[0]
              dealerCardDiv.append(dCard)
              dealerCards.push(card)
              bjScoreCalc()
              await sleep(500)
        }
        if (playerVal > 21) {
          bjfinished = true
          bjResult.textContent = "Over 21! Bust - You lose"
        }
        else if (dealerVal > 21) {
            bjfinished = true
            transaction(bjInv * 2)
            bjResult.textContent = "Dealer bust - You win"
        } else if (dealerVal >= playerVal) {
            bjfinished = true
            bjResult.textContent = "Dealer higher/equal - You lose"
        } else {
            bjfinished = true
            transaction(bjInv * 2)
            bjResult.textContent = "Dealer lower than you - You win"
        }}}

    bjScoreCalc()

    if (playerVal > 21) {
        bjfinished = true
        bjResult.textContent = "Over 21! Bust - You lose"
    }

    if (bjfinished) {
        playerCards = []
        dealerCards = []
        bjReset.style.display = "block"
        bjButton2.style.display = "none"
        bjButton3.style.display = "none"
        bjDouble.style.display = "none"

    }
}
//events

guessButton.addEventListener("click", ()=>{
    var invested = guessInvested.value.replace(/-/g, "")
    var choice = guessed.value
    guess(choice, invested)
}
)

bjButton.addEventListener("click", ()=>{
    inv = bjInvested.value.replace(/-/g, "")
    if (isValid(inv)) {
        bjInit(inv)
    }
}
)
bjButton2.addEventListener("click", ()=>{
    blackjack("stand")
}
)
bjButton3.addEventListener("click", ()=>{
    blackjack("hit")
}
)
bjDouble.addEventListener("click", ()=>{
    blackjack("double")
}
)
bankReset.addEventListener("click", ()=>{
    if (bank < -99){
      transaction(100-bank) 
      }
}
)
bjReset.addEventListener("click", ()=>{
    playerCardDiv.textContent = ""
    dealerCardDiv.textContent = ""
    bjButton.style.display = "block"
    instruction.style.display = "block"
    bjInvested.style.display = "block"
    bjReset.style.display = "none"
    bjResult.textContent = ""
    bjScoreCalc()
}
)

//weird ass button thing
a = "ha"
const funcHash = {
    "invested1": guessButton,
    "guessed": guessButton,
    "invested2": bjButton,
    "invested3": slotButton

}

const inputs = document.querySelectorAll('input');

function clickButton(event) {
    if (event.key === 'Enter') {
        const inputId = event.target.id;
        const buttonId = funcHash[inputId]
        if (buttonId) 
            buttonId.click()
            console.log("pressed")
        }
    }


inputs.forEach(input=>{
    input.addEventListener('keypress', clickButton);
}
);

transaction(0)}