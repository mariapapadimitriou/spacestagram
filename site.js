const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
  });

  const fetchNASAData = async () => {

    const loader = document.querySelector('.loader');
    loader.style.opacity = 1;
    loader.style.display = 'flex';
      
    document.getElementById("container").innerHTML = "";
    const start_date = document.getElementById("startdate").value
    const end_date = document.getElementById("enddate").value
    
    const url = 'https://api.nasa.gov/planetary/apod?api_key=0pGY5v8sAphcSRyVocADwQBcFh6jaaP2WHa8dkMM&start_date=' + start_date + '&end_date=' + end_date
    
    try {
      const response = await fetch(`${url}`)
      const data = await response.json()
      console.log('NASA APOD data', data)
      displayData(data)
    } catch (error) {
      console.log(error)
    }
    loader.style.opacity = 0;
    loader.style.display = 'none';
  }

  const displayData = data => {
    var dynamic_images = ""

    for (i = 0; i < data.length; i++) {
        if (typeof(data[i].hdurl) == "undefined" || typeof(data[i].title)=="undefined" || typeof(data[i].date) == "undefined" || typeof(data[i].explanation) == "undefined") {
            continue;
        }
        if (localStorage.getItem(data[i].hdurl)) {
            console.log("Hi")
            if (localStorage.getItem(data[i].hdurl) == 0) { // IF PHOTO IN LIKED PHOTOS AND NOT LIKED
                dynamic_images += "<div class='picture-explanation-container'><p style='font-weight: 900; font-size: 20px;'><span>"+ data[i].title +"</span><span style='font-weight: lighter; font-size: 13px; color: #353535'>"+ data[i].date +"</span></p><img class='posts' src='" + data[i].hdurl + "' height='100%' width='100%'/><p style='justify-content: start;'><button class='likebutton' id='" + data[i].hdurl + "' onclick='liked(this.id)'><i class='far fa-heart fa-3x'></button></i></p><p style='justify-content: flex-start; font-weight: bold;'>Description</p><p>" + data[i].explanation + "</p></div>"
            }
            else { // IF PHOTO IN LIKED PHOTOS AND LIKED
                dynamic_images += "<div class='picture-explanation-container'><p style='font-weight: 900; font-size: 20px;'><span>"+ data[i].title +"</span><span style='font-weight: lighter; font-size: 13px; color: #353535'>"+ data[i].date +"</span></p><img class='posts' src='" + data[i].hdurl + "' height='100%' width='100%'/><p style='justify-content: start;'><button class='likebutton' id='" + data[i].hdurl + "' onclick='liked(this.id)'><i class='fas fa-heart fa-3x'></button></i></p><p style='justify-content: flex-start; font-weight: bold;'>Description</p><p>" + data[i].explanation + "</p></div>"
            }
        }
        else { // IF PHOTO NOT IN LIKED PHOTOS
            dynamic_images += "<div class='picture-explanation-container'><p style='font-weight: 900; font-size: 20px;'><span>"+ data[i].title +"</span><span style='font-weight: lighter; font-size: 13px; color: #353535'>"+ data[i].date +"</span></p><img class='posts' src='" + data[i].hdurl + "' height='100%' width='100%'/><p style='justify-content: start;'><button class='likebutton' id='" + data[i].hdurl + "' onclick='liked(this.id)'><i class='far fa-heart fa-3x'></button></i></p><p style='justify-content: flex-start; font-weight: bold;'>Description</p><p>" + data[i].explanation + "</p></div>"
            localStorage.setItem(data[i].hdurl, 0)
        }        
    }
    document.getElementById("container").innerHTML = dynamic_images
  }

  function liked(btn) {
      var x = localStorage.getItem(btn);

    console.log(x)

    if (localStorage.getItem(btn) == 0) { //IF NOT LIKED
        document.getElementById(btn).innerHTML = "<i class='fas fa-heart fa-3x'></i>"
        localStorage.setItem(btn, 1)
    }
    else { // IF LIKED
        document.getElementById(btn).innerHTML = "<i class='far fa-heart fa-3x'></i>"
        localStorage.setItem(btn, 0)
    }
    //
  }

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}