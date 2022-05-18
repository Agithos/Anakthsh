// TODO
    //1. Fonts vrisko gia Ellhnika
    //2. Banner - title
    

const card = document.querySelector("#mainCard");
const title = document.querySelector(".title");
const button = document.querySelector(".submit");
const closeButton = document.querySelector(".closed");
const results = document.querySelector(".results");
const queryBox = document.querySelector(".textbox");
const container = document.querySelector(".container");
const isElastic = document.querySelector("form").isElastic;
// const ordList = document.querySelector(".ordList")

const textnode = document.createTextNode("Loading...");
const dataNode = document.createElement("p");
const ordList = document.createElement("ol");
const banner = document.createElement("div");
const bannerTitle = document.createElement("div");
const bannerInfo = document.createElement("div");




dataNode.classList.add("loading");
ordList.classList.add("ordList");
let answers;

let liquidateData = (data, index) => {
    results.innerHTML = data.answerList[index].meta.answer;
    banner.classList.add("results_banner");
    bannerTitle.innerHTML = "QA Theme : " + data.answerList[index].meta.title;
    
    bannerTitle.classList.add("results_banner-title");
    banner.appendChild(bannerTitle);

    bannerInfo.classList.add("results_banner-info");
    bannerInfo.innerHTML="";        // clear bannerInfo
    for (i of ["COUNTRY", "DATE"]){
        let x = document.createElement("p");
        x.innerHTML = i + " : " + data.answerList[index].meta[i.toLowerCase()];
        bannerInfo.appendChild(x);
    }
    //score
    if (data.answerList[index].score){
        let score = document.createElement("p");
        score.innerHTML = "SCORE : " + data.answerList[0].score.toFixed(3);
        bannerInfo.appendChild(score);
    }
    banner.appendChild(bannerInfo);
    results.prepend(banner)
}

let onClickLiHandler = (event) => {
    index = event.target.name;
    // results.innerHTML = answers[index].meta.answer;
    liquidateData(answers, index);

    results.classList.remove("animateUp");
    void results.offsetWidth;
    results.classList.add("animateUp");
}

let doFetch = () => {
    console.log(isElastic.value);
    query = "/" + isElastic.value + queryBox.value;
    fetch(query)
        .then(response => {
            // vazei loading append
            dataNode.appendChild(textnode);
            card.appendChild(dataNode)
            //
            return response.json()
        })
        .then(data => {
            // svhnei to loading kai kanei append ta data
            console.log(data);
            container.classList.add("justStart");

            //liquidateData
            liquidateData(data, 0);

            textnode.nodeValue = "";
            data.answerList.forEach((element,index) => {
                let question = element.meta.query;
                let li = document.createElement("li")
                li.innerHTML = question 
                li.name = index
                ordList.appendChild(li)
                li.addEventListener("click", onClickLiHandler);
            });
            card.appendChild(ordList);
            answers = data;
            })
    //fetch kai otan exei apotelesma , girna tis plirofories (loading mexri tote)
}

let onSubmitHandler = (e) => {
    e.preventDefault();
    if (queryBox.value == "") {
        console.log("Empty")
        return;
    }
    //svhnei ta prohgoumena children
    if (card.children.length > 1){
        dataNode.removeChild(textnode);
        card.removeChild(dataNode);
        ordList.innerHTML = "";
    }
    //    
    card.classList.add("activated");
    card.classList.add("side");
    closeButton.classList.add("visible")
    results.classList.add("visible")

    //titleHide
    title.classList.remove("animateDown");
    void title.offsetWidth;
    title.classList.add("animateDownRev");

    //prosthetei justStart. To evala sto .then(data)

    doFetch() 
}

let onCloseHandler = () => {
    // an exei data ta svhnei
    dataNode.removeChild(textnode)
    card.removeChild(dataNode)

    card.classList.remove("activated");
    card.classList.remove("side");
    closeButton.classList.remove("visible");
    results.classList.remove("visible");
    ordList.innerHTML = "";
    card.removeChild(ordList);

    // titleShow
    title.classList.remove("animateDownRev");
    void title.offsetWidth;
    title.classList.add("animateDown");

    container.classList.remove("justStart");
}


button.addEventListener("click", onSubmitHandler);   // mhpos event oxi on submit
closeButton.addEventListener("click", onCloseHandler);




