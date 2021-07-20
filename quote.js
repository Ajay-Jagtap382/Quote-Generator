const quoteContainer =document.getElementById ('quote-container');
const quoteText =document.getElementById ('quote');
const authorText =document.getElementById ('author');
const twitterBtn =document.getElementById ('twitter');
const newQuoteBtn =document.getElementById ('new-quote');
const loader =document.getElementById('loader');

let apiQuotes =[];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden =true;

}

// Hide loading
function complete()
{
    quoteContainer.hidden=false;
    loader.hidden=true;
}

// show new quote
function newQuote() {
    loading();
    // pick a random quote from apiQuotes array
    const quote =apiQuotes[Math.floor(Math.random() *  apiQuotes.length)];
    
    // check isf author is blank andreplace it with 'Unknown'
    if(!quote.author)
    {
        authorText.textContent ='Unknown';
    }

    else{
        authorText.textContent = quote.author;
    }

    // check the length to determin styling

    if(quote.text.length > 50)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // set quote , hide loader
    quoteText.textContent = quote.text;
    complete();
}


// Get Quote from API
async function getQuote(){
    loading();
    // const proxyUrl='https://powerful-everglades-48968.herokuapp.com/'
    // const apiUrl = 'http://api.forismatic.com/api/1.0/method=getQuote&lang=en&format=json';
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response= await fetch(apiUrl);
        // const data = await response.json();
        apiQuotes = await response.json();
        // authorText.innerText =data.quoteAuthor;
        // quoteText.innerText = data.quoteText;
        newQuote();
    }
    catch(error){
        // getQuote();
        // console.log('whooops',error);
    }
}


// Tweet quote
function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click' , tweetQuote);


// On load
getQuote();
