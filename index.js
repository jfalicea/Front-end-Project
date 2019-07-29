/*--------------------------------------------------------------------
*  News API works to provide data.   Quality appears to be satisfactory. 
--------------------------------------------------------------------*/
const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=b1d2a2d19a1c47fd822364fb24e03910';//API Key for NewsAPI.org
STORAGE_KEY = 'articles'
/*--------------------------------------------------------------------
* store to localStorage  
--------------------------------------------------------------------*/
const something = 'something'
function saveToStorage(jsonArticleData){
    const savedArticles = jsonArticleData.articles
    localStorage.setItem(STORAGE_KEY, savedArticles)
}

/*--------------------------------------------------------------------
* Get data!   Date.now()  object.keys ///



idea --> use an input box to change the iframe. 

<div id='privacy-enable'> 
    <div id='privacy-disable>
        <button id='back'>Back<button><button id='forward'>Forward<button> 
        <label>URL/Search</label> <input></input>
            //inputBox changes the iframe Source 
        <iframe> </iframe> 
    </div>
</div>



--------------------------------------------------------------------*/

async function fetchMyData(){
    const articleData = localStorage.getItem(STORAGE_KEY) ? 
    json.parse(localStorage.getItem(STORAGE_KEY)):(await fetch(url));
    const jsonArticleData = await articleData.json();
    // console.log(jsonArticleData.articles[0])
    saveToStorage(JSON.stringify(jsonArticleData));
    console.log('i made it through the script')
};
fetchMyData()

    

/*--------------------------------------------------------------------
*  Imgur API works to provide data.   Quality appears to be satisfactory. 
--------------------------------------------------------------------*/
