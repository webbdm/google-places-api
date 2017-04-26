$(document).ready(function() {

    const apiKey = "";

    $("body").on("click", "li", (e) => {

        loadPlaces(e.target.innerHTML).then((results) => {
            //console.log(results);
            print(results);
        }).catch((error) => {
            console.log(error);
        })

    });

    $("body").on("click", ".place", (e) => {
        console.log(e.target.id);
        let place_id = e.target.id;
        loadDetail(place_id).then((result) => {
            console.log(result);
            writeAddressToDom(result.formatted_address);
        });
    });

    const loadDetail = (place_id) => {
        return new Promise((resolve, reject) => {
            $.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
                .done((data) => resolve(data.result))
                .fail((error) => reject(error));
        })
    }

    const print = (places) => {
        let outputString = "";

        places.forEach((place, i) => {
            //console.log(place);
            outputString += `<a href="#"><div class="place" id="${place.place_id}">${place.name}</div></a>`;
        });
        $("#main").html(outputString);
    }

    const writeAddressToDom = (address) => {
        let outputString = `<div>${address}</div>`;
        $("#addresses").append(outputString);
    }


    const loadPlaces = (dropdownType) => {
        return new Promise((resolve, reject) => {
            $.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=5000&type=${dropdownType}&key=${apiKey}`)
                .done((data) => resolve(data.results))
                .fail((error) => reject(error));
        });
    };

});
