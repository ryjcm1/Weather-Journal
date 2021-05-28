
//Define Global Variables

// Personal API Key for OpenWeatherMap API
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const myApi = "&appid=f89361fb753c9647ce4d1c6ca62fdc3c";
const units = "&units=metric"



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', function(event){
    event.preventDefault();
    submitForm();
});



/* Function called by event listener */
function submitForm(){
    
    //grabs user input
    var zip = document.getElementById('zip').value;
    var userComment = document.getElementById('feelings').value;

    //dynamically generating time value
    var d = new Date();
    var newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

    getWeatherData(baseUrl,zip,myApi,units)
    .then(function(data){
        postWeatherData("/add", 
        {
            temp: Math.round(data.main.temp),
            location: `${data.name}, ${data.sys.country}`,
            desc: data.weather[0]["description"],
            realFeel: Math.round(data.main.feels_like),
            feeling: userComment,
            date: newDate,
            iconCode: data.weather[0]["icon"]

        })
        .then(updataUI())
    })    
};



/* Function to GET Web API Data*/
async function getWeatherData(baseUrl,zip,myApi,units){

    const getResponse = await fetch(baseUrl+zip+myApi+units)
    try{
        const data = await getResponse.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('Error: ', error);
    }
};



/* Function to POST data */
async function postWeatherData(url, data) {

    const postResponse = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    })
};



/* Function to GET Project Data */
async function updataUI(){

    const updateResponse = await fetch("/all");
    const lastEntry = await updateResponse.json();

    //assigning all values on the weather user interface
    document.getElementById("temperature").innerHTML = `${lastEntry.temp} &deg;C`;
    document.getElementById("location").innerHTML = `${lastEntry.location}`;
    document.getElementById("content").innerHTML = `${lastEntry.desc}`;
    document.getElementById("realFeel").innerHTML = `Feels like: ${lastEntry.realFeel} &deg;C`;
    document.getElementById("userFeeling").innerHTML = `${lastEntry.feeling}`;
    document.getElementById("date").innerHTML = `${lastEntry.date}`;
    document.getElementById("icon").innerHTML = `<img src=\"Weather Icons/${lastEntry.iconCode}.svg\" alt=\"icon\">`;

    //clearing user's previous input
    document.getElementById('zip').value ="";
    document.getElementById('feelings').value ="";
};