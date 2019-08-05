/*--------------------------------------------------------------------
*Notes:   
*We can alter the get storage key to a time, then compare it so that we can ensure that there is daily refresh of data.  
*Get data!   Date.now()  object.keys ///
*Fetch Article Data out of NewsAPI.org 
*Need to figure out how to hand errors. 
--------------------------------------------------------------------*/


/*--------------------------------------------------------------------
* URL ENDPOINTS GO HERE     #global_varible
--------------------------------------------------------------------*/
const urlEndpoints = {
    newsData: `https://newsapi.org/v2/top-headlines?country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`, //API Key for NewsAPI.org
    memeDataSource: `https://meme-api.herokuapp.com/gimme`,
    techData: `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`,
    busiData: `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`,
    sportsData: `https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`
};
console.log(urlEndpoints.techData)
/*--------------------------------------------------------------------
* Storage Key Variable.   #global_varible 
--------------------------------------------------------------------*/
const STORAGE_KEY = 'articles'; // need to add time-bomb key function here!
const MEME_STORAGE_KEY = 'memes';
const TECH_STORAGE_KEY = 'techarticles';
const BUSI_STORAGE_KEY = 'busarticles';
const SPORT_STORAGE_KEY ='sportarticles'
/*--------------------------------------------------------------------
* FUNCTION - store Article Data to localStorage. 
--------------------------------------------------------------------*/
function saveToStorage(jsonArticleData){
    const savedArticles = JSON.stringify(jsonArticleData.articles)
    localStorage.setItem(STORAGE_KEY, savedArticles)
    return jsonArticleData.articles;
}

function saveMeme(jsonMemeData){
    const savedMemes = JSON.stringify(addToArray(jsonMemeData.url))
    localStorage.setItem(MEME_STORAGE_KEY, savedMemes)
    return jsonMemeData;

}

function saveTech(jsonTechnoData){
    const savedTechArticles = JSON.stringify(jsonTechnoData.articles)
    localStorage.setItem(TECH_STORAGE_KEY, savedTechArticles)
    return jsonTechnoData.articles;
}
function saveBus(jsonBusinessData){
    const savedBusData = JSON.stringify(jsonBusinessData.articles)
    localStorage.setItem(BUSI_STORAGE_KEY, savedBusData)
    return jsonBusinessData.articles;
}
function saveSports(jsonSportData){
    const savedSportData = JSON.stringify(jsonSportData.articles)
    localStorage.setItem(SPORT_STORAGE_KEY, savedSportData)
    return jsonSportData.articles;
}


/*--------------------------------------------------------------------
*FUNCTION - GET DATA FROM NEWS API.   
This ternary identifies whether or not there is already saved Article Data in local storage. 
a. If there is, we will work out of localStorage. 
b. If there isnt anything in localStorage then 
    1. we will make a call to the API url to search for data. 
    2. THEN we will send the results to be json-ified 
    3. THEN we will send the jsonified-data to localStorage
c. FINALLY we return the array of article Data. 
-------------------------------------------------------------------------------------------*/

const fetchMyData = async()=>{
    let articleData = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY))
        : await fetch(urlEndpoints.newsData)
            .then(results=>results.json())
            .then(jsonifiedData=>saveToStorage(jsonifiedData));   
    
    // obtain the meme Data from the endpoint       
    let memeData = await fetch(urlEndpoints.memeDataSource)
    .then(results=>results.json())
    .then(jsonMemeData=>saveMeme(jsonMemeData)) 
    
    await addMemetoScreen(memeData);
    await addArticle(articleData);
}
    fetchMyData()
/*--------------------------------------------------------------------
* Function - Append Article to DOM
*  note here:  I did a forEach here to show that everything is on the DOM.  We can easily get 
--------------------------------------------------------------------*/
function addArticle(articleData){
    articleData.forEach(article=> {
        const section = document.createElement('section');
        const newsContent = document.querySelector('.news-content')
        section.innerHTML = 
        `<a href=${article.url}>Article Source: ${article.source.name}</a><br />
        Article Description: ${article.description}<br /><br />`;

        newsContent.appendChild(section)

       

    });
};




const fetchSubjectData = async()=>{
    const technoData = localStorage.getItem(TECH_STORAGE_KEY) ? JSON.parse(localStorage.getItem(TECH_STORAGE_KEY))
        : await fetch(urlEndpoints.techData)
            .then(results=>results.json())
            .then(jsonifiedData=>saveTech(jsonifiedData));
        console.log(technoData)
    const busineData = localStorage.getItem(BUSI_STORAGE_KEY) ? JSON.parse(localStorage.getItem(BUSI_STORAGE_KEY))
        : await fetch(urlEndpoints.busiData)
            .then(results=>results.json())
            .then(jsonifiedData=>saveBus(jsonifiedData));
        console.log(busineData)
    const sportyData = localStorage.getItem(SPORT_STORAGE_KEY) ? JSON.parse(localStorage.getItem(SPORT_STORAGE_KEY))
        : await fetch(urlEndpoints.sportsData)
            .then(results=>results.json())
            .then(jsonifiedData=>saveSports(jsonifiedData));
    
    await addTech(technoData);
    await addBusine(busineData);
    await addSporty(sportyData);
        console.log(sportyData)
    }    
  //console.log(sportyData)

fetchSubjectData()

function addTech(technoData){
    technoData.forEach(article=> {
        const section = document.createElement('section');
        const newsContent = document.querySelector('.news-content')
        section.innerHTML = 
        `<a href=${article.url}>Article Source: ${article.source.name}</a><br />
        Article Description: ${article.description}<br /><br />`;
        newsContent.appendChild(section)


    });
};

function addBusine(busineData){
    busineData.forEach(article=> {
        const section = document.createElement('section');
        const newsContent = document.querySelector('.news-content')
        section.innerHTML=
        `<a href=${article.url}>Article Source: ${article.source.name}</a><br />
        Article Description: ${article.description}<br /><br />`;

        newsContent.appendChild(section)
    });
    
};

function addSporty(sportyData){
    sportyData.forEach(article=> {
        const section = document.createElement('section');
        const newsContent = document.querySelector('.news-content')
        section.innerHTML=
        `<a href=${article.url}>Article Source: ${article.source.name}</a><br />
        Article Description: ${article.description}<br /><br />`;

        newsContent.appendChild(section)
    });
    
};


function getNews() {
    const memebtn = document.querySelector(".icon"); // Get the button that opens the modal
    const newsmodal = document.querySelector("#newsModal"); // Get the modal
    memebtn.onclick = function(){
        newsmodal.style.display ="block"; 
        newsmodal.innerHTML = addBusine();
    }
    //When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
     if (event.target == mememodal) {
       newsmodal.style.display = "none";
     }
   }
 
 const span1 = document.querySelector(".exit"); // Get the <span> element that closes the modal)
   span1.onclick = function() {
     newsmodal.style.display = "none";
   }
   
} getNews();


/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  closeNav()

// get the modal
const modal = document.getElementById("myModal");

//get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//when the user clicks on span(x), close the modal
span.onclick = function() {
    modal.style.display ="none";
}

//when the user clicks anywhere outside of the modal, close the modal
window.onclick=function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addToArray(jsonMemeData){
    const memeArray = JSON.parse(localStorage.getItem(MEME_STORAGE_KEY)) || []
    memeArray.push(jsonMemeData);
    return(memeArray)
}

function rightbtn(){
    const rightbtn = document.getElementById('rightbtn')
    rightbtn.onclick = async () => {
        const memeData = await fetch(urlEndpoints.memeDataSource)
        .then(results=>results.json())
        .then(jsonMemeData=>saveMeme(jsonMemeData))    
        addMemetoScreen(memeData)
    }
};
rightbtn()



function addMemetoScreen(memeData) {
    document.getElementById('memeImg').innerHTML = `'<img src='${memeData.url}'/>'`
}

function leftbtn() {
    const memeInStorage =JSON.parse(localStorage.getItem(MEME_STORAGE_KEY))
    console.log('memestorage', memeInStorage)
    const leftbtn = document.getElementById('leftbtn');
    leftbtn.onclick = function (){
        // console.log(memeInStorage[0])
        console.log('last item', memeInStorage[memeInStorage.length-1])
        lastImage = memeInStorage[memeInStorage.length-1] || memeInStorage[0]
        document.getElementById('memeImg').innerHTML = `<img src='${lastImage}'/>`
    }
};
leftbtn();


$(window).on('load', function () {
    $("#coverScreen").hide();
    });
$("#rightbtn").click(function () {
    $("#coverScreen").show(1000).hide(1800);
    });



/*
1. rightbtn gets NEW meme 
    a. save meme to local storage 
    b. press rightbtn again updates Local Storage. 
    c. onces you go back... needs to increment in order before it gets new meme. 

2.  leftbtn just needs to go to localStorage 

    a. retrieve last img 


*/


