$(document).ready(function() {

    const apiKey = "";

    $("body").on("click", "li", (e) => {
        //console.log(e.target.innerHTML);

        loadPlaces(e.target.innerHTML).then((data) =>{
        	console.log(data);
        }).catch((error) =>{
        	console.log(error);
        });
    });

    const loadPlaces = (dropdownType) => {
        return new Promise ((resolve, reject) => {
        $.ajax(`"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=500&type=${dropdownType}&keyword=cruise&key=${apiKey}`)
        .done((data) => resolve(data))
        .fail((error) => reject(error));
    	});
    };

});
