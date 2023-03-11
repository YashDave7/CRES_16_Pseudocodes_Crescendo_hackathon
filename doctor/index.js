var arrayOfFood = [];
var typeOfFood = "";
var quantity = 0;
var val = {};

function storeValue() {
  var select = document.getElementById("mySelect");
  typeOfFood = select.options[select.selectedIndex].value;
  console.log(typeOfFood);
}

function getQuantity() {
  quantity = document.getElementById("quantity").value;
  console.log(quantity);
}

function getMeasure() {
  if (
    typeOfFood === "Indian Bread" ||
    typeOfFood === "Fried Snacks" ||
    typeOfFood === "Cold Snacks" ||
    typeOfFood === "Starter Snacks"
  )
    return "Pieces";
  else return "kg";
}

document.getElementById("btn").addEventListener("click", function (event) {
  var isChecked = document.getElementById("yes18");

  if (typeOfFood !== "" && quantity > 0) {
    if (isChecked.checked) {
      val = { typeOfFood, quantity };
      const item = document.createElement("li");
      item.innerHTML = `<span>${val.typeOfFood}   x   ${
        val.quantity
      } ${getMeasure()}</span>`;
      list.appendChild(item);
      arrayOfFood.push(val);
    } else alert("please check the checkbox if made less than 18 hrs");
  } else
   {
    alert("choose every option!!!");
  }
 
 

  

  event.preventDefault();
});

const getData = () => {
  
}

document.getElementById("btn1").addEventListener("click", function (event) {
  console.log(arrayOfFood)
  const data = JSON.stringify({data: arrayOfFood});
    const response = fetch('http://localhost:3000/savef1',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    })
    if(response.ok){
      const jsonResponse = response.json();
    }
  
});

//Map integration

console.log("hello");

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 18.96667,
      lng: 72.83333,
    },
    zoom: 10,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", (e) => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          console.log(pos.lat, pos.lng);

          //Add marker
          let marker = new google.maps.Marker({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            map: map,
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;
