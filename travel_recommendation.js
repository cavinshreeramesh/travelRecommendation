document.getElementById("nav-bar-clear-button").addEventListener("click",function(){
    document.querySelector("#nav-bar-search input").value = "";
    document.getElementById("search-result").innerHTML = "";
})

document.getElementById("nav-bar-search-button").addEventListener("click",function(){
    let search_word = document.querySelector("#nav-bar-search input").value.toLowerCase();
    let search_result = document.getElementById("search-result");
    search_result.innerHTML = "";
    search_result.innerHTML = '<div id = "search-result-topper"></div> <div id = "result-1"> <div class = "result-img-container"></div> <div class = "result-desc-container"></div> </div> <div id = "result-2"> <div class = "result-img-container"></div> <div class = "result-desc-container"></div> </div>'
    let result_1_loc = document.querySelector("#result-1 div");
    let result_2_loc = document.querySelector("#result-2 div");
    
    //let result_2_loc = document.getElementById("result-2 div");
    fetch("./travel_recommendation_api.json").then(response => {
        if(!response.ok){
            throw new Error("HTTP error "+ response.status);
        }
        return response.json();
    }).then(data => {
        //work with json data here
        let result =[];
        if(["beach", "beaches"].includes(search_word)){
            result = data.beaches;
        }else if(["temple", "temples"].includes(search_word)){
            result = data.temples;
        }else{
            result = data.countries.find(country => country.name.toLowerCase() === search_word).cities;
        }
        console.log(result);

        const res1_image = document.createElement("img");
        res1_image.src = result[0].imageUrl;
        res1_image.className = "result-img";
        result_1_loc.appendChild(res1_image);

        document.querySelectorAll("#result-1 div")[1].innerHTML = `<h4 class = "result-text">${result[0].name}</h4> <p class = "result-text">${result[0].description}</p> <button class = result-button>Visit</button>`
        
        const res2_image = document.createElement("img");
        res2_image.src = result[1].imageUrl;
        res2_image.className = "result-img";
        result_2_loc.appendChild(res2_image);

        document.querySelectorAll("#result-2 div")[1].innerHTML = `<h4 class = "result-text">${result[1].name}</h4> <p class = "result-text">${result[1].description}</p> <button class = result-button>Visit</button>`
  
    
    })
})