/*--------------------------------------------------------------------
*Notes:   
*We can alter the get storage key to a time, then compare it so that we can ensure that there is daily refresh of data.  
*Get data!   Date.now()  object.keys ///
*idea --> use an input box to change the iframe. 
*Fetch Article Data out of NewsAPI.org 
--------------------------------------------------------------------*/


/*--------------------------------------------------------------------
* URL ENDPOINTS GO HERE     #global_varible
--------------------------------------------------------------------*/
const urlEndpoints = {
    newsData: `https://newsapi.org/v2/top-headlines?country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`, //API Key for NewsAPI.org
    memeData: `https://SOME_ADDRESS.COM`,
};
/*--------------------------------------------------------------------
* Storage Key Variable.   #global_varible 
--------------------------------------------------------------------*/
const STORAGE_KEY = 'articles';
/*--------------------------------------------------------------------
* FUNCTION - store Article Data to localStorage. 
--------------------------------------------------------------------*/
function saveToStorage(jsonArticleData){
    const savedArticles = JSON.stringify(jsonArticleData.articles)
    localStorage.setItem(STORAGE_KEY, savedArticles)
}
/*--------------------------------------------------------------------
*FUNCTION - GET DATA FROM NEWS API.   
--------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------------------
This ternary identifies whether or not there is already saved Article Data in local storage. 
a. If there is, we will work out of localStorage. 
b. If there isnt anything in localStorage then 
1. we will make a call to the API url to search for data. 
2. THEN we will send the results to be json-ified 
3. THEN we will send the jsonified-data to localStorage

c. FINALLY we return the array of article Data. 
-------------------------------------------------------------------------------------------*/

async function fetchMyData(){
    const articleData = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY))
        : await fetch(urlEndpoints.newsData)
            .then(results=>results.json())
            .then(jsonifiedData=>saveToStorage(jsonifiedData));   
    return articleData
};
fetchMyData()//when we append data lets use this function to get an array of of objects! 

    

/*--------------------------------------------------------------------
* Append Data to DOM
--------------------------------------------------------------------*/
