/*--------------------------------------------------------------------
*  News API works to provide data.   Quality appears to be satisfactory. 
--------------------------------------------------------------------*/
const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=b1d2a2d19a1c47fd822364fb24e03910';//API Key for NewsAPI.org
const STORAGE_KEY = 'articles'
/*--------------------------------------------------------------------
* store to localStorage  
--------------------------------------------------------------------*/
function saveToStorage(jsonArticleData){
    const savedArticles = JSON.stringify(jsonArticleData.articles)
    localStorage.setItem(STORAGE_KEY, savedArticles)
}

/*--------------------------------------------------------------------
*Note:   We can alter the get storage key to a time, then compare it so that we can ensure that there is daily refresh of data.  
*Get data!   Date.now()  object.keys ///
*idea --> use an input box to change the iframe. 
*Fetch Article Data out of NewsAPI.org 
--------------------------------------------------------------------*/

async function fetchMyData(){
    /* Ternary identifies whether or not something is in local storage. If there is, we will work out of localStorage. 
    if there isnt anything in localStorage then we will make a call to the API url to search for data. 
    */
    const articleData = localStorage.getItem(STORAGE_KEY) ? 
    JSON.parse(localStorage.getItem(STORAGE_KEY)):await fetch(url).then(results=>results.json());   
    saveToStorage(articleData);
    return articleData
};
fetchMyData()

    

/*--------------------------------------------------------------------
* Append Data 
--------------------------------------------------------------------*/
