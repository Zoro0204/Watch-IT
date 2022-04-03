//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 0.5 second for example
var $input = $('#myInput');

//on keyup, start the countdown
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});


//Search movies/shows
function doneTyping() {

    document.getElementById("movieresults").innerHTML = '';

    fetch('https://api.themoviedb.org/3/search/multi?api_key=67b9d9fa2b8bbd0f0eed63c06a11359b&query=' + document.getElementById("myInput").value)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (i = 0; i < data.results.length; i++) {


                if (data.results[i].poster_path == null) {
                    data.results[i].poster_path = 'https://samples-d4024.web.app/images/MoviePosterNA.jpg'

                } else {
                    data.results[i].poster_path = 'https://image.tmdb.org/t/p/original' + data.results[i].poster_path;
                }

                if (data.results[i].release_date == undefined) {
                    data.results[i].release_date = '';
                }

                if (data.results[i].vote_average == 0) {
                    data.results[i].vote_average = 'N/A';
                }

                if (data.results[i].adult == true) {
                    data.results[i].adult = 'A';
                } else {
                    data.results[i].adult = 'UA';
                }

                if (data.results[i].title == undefined) {
                    data.results[i].title = data.results[i].name;
                }

                document.getElementById("movieresults").innerHTML += '<div class="card mb-3 my-2 hover-item" onclick="moviemodal(this.id)" id="' + data.results[i].media_type + data.results[i].id + '" style="max-width: 540px; padding: 0px; background-color: #3F424C; border-color: #F11819; margin-right: 15px;"> <div class="row g-0"> <div class="col-md-4"> <img style="height: 100%; border-right-style: solid; border-right-color: #F11819; border-right-width: 1px;" src="' + data.results[i].poster_path + '" class="img-fluid rounded-start" alt="..."> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title" style="color: #EE3F3F;">' + data.results[i].title + '</h5> <hr> <h6 class="card-text" style="color: white;"> Language Code: ' + data.results[i].original_language.toUpperCase() + ' <hr> Voters: ' + data.results[i].vote_count.toLocaleString("en-US") + ' <hr> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.results[i].vote_average + ' <hr> </h6> <p class="card-text"><small class="text-muted">' + data.results[i].release_date + '</small></p> </div> </div> </div> </div>'
            }

        })
        .catch(function (err) {

        });

}


//movie details
function moviemodal(movieid) {
    myArray = movieid.split(/([0-9]+)/);
    document.getElementById("moviemodalbody").innerHTML = '';
    document.getElementById("exampleModalLabel").innerHTML = '';

    fetch('https://api.themoviedb.org/3/' + myArray[0] + '/' + myArray[1] + '?api_key=67b9d9fa2b8bbd0f0eed63c06a11359b')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (myArray[0] == 'movie') {

                if (data.backdrop_path == null) {
                    data.backdrop_path = 'https://samples-d4024.web.app/images/MoviePosterNA2.jpg'

                } else {
                    data.backdrop_path = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
                }

                if (data.release_date == '') {
                    data.release_date = 'N/A';
                }
                if (data.vote_average == 0) {
                    data.vote_average = 'N/A';
                }
                if (data.revenue == 0) {
                    data.revenue = 'N/A';
                } else {
                    data.revenue = '$' + data.revenue.toLocaleString("en-US");
                }

                document.getElementById("exampleModalLabel").innerHTML += data.title;
                document.getElementById("moviemodalbody").innerHTML += '<div class="modal-body"> <div class="row"> <div class="col"> <div class="card" style="width: 100%; background-color: #17161B;"> <img src="' + data.backdrop_path + '" class="card-img-top" alt="..."> <div class="card-body"> <div style="font-size: 12px;" id="genres"> </div> <hr> <button onclick="Recommendations1(' + data.id + ',' + 1 + ')" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal2" type="button" class="btn btn-danger btn-sm"><i class="fas fa-plus-circle"></i> &nbspRecommend</button> <br><br> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.vote_average + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Revenue: &nbsp' + data.revenue + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> <div class="col"> <p class="card-text" style="color: white;"> Status: &nbsp' + data.status + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Release: &nbsp' + data.release_date + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <br> <div class="row"> <p> ' + data.overview + ' </p> </div> </div> </div> </div> </div> </div>';
                for (i = 0; i < data.genres.length; i++)
                    document.getElementById("genres").innerHTML += '<span style="background-color: grey; padding: 4px; border-radius: 0.4vw; margin-right: 5px;">' + data.genres[i].name + '</span>';
            }

            if (myArray[0] == 'tv') {

                if (data.backdrop_path == null) {
                    data.backdrop_path = 'https://samples-d4024.web.app/images/MoviePosterNA2.jpg'

                } else {
                    data.backdrop_path = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
                }

                if (data.first_air_date == '') {
                    data.first_air_date = 'N/A';
                }
                if (data.vote_average == 0) {
                    data.vote_average = 'N/A';
                }
                if (data.vote_count == 0) {
                    data.vote_count = 'N/A';
                }

                document.getElementById("exampleModalLabel").innerHTML += data.name;
                document.getElementById("moviemodalbody").innerHTML += '<div class="modal-body"> <div class="row"> <div class="col"> <div class="card" style="width: 100%; background-color: #17161B;"> <img src="' + data.backdrop_path + '" class="card-img-top" alt="..."> <div class="card-body"> <div style="font-size: 12px;" id="genres"> </div> <hr> <button onclick="Recommendations1(' + data.id + ',' + 0 + ')" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal2" type="button" class="btn btn-danger btn-sm"><i class="fas fa-plus-circle"></i> &nbspRecommend</button> <br><br> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.vote_average + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Voters: &nbsp' + data.vote_count.toLocaleString("en-US") + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> <div class="col"> <p class="card-text" style="color: white;"> Status: &nbsp' + data.status + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Release: &nbsp' + data.first_air_date + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <br> <div class="row"> <p> ' + data.overview + ' </p> </div> </div> </div> </div> </div> </div>';
                for (i = 0; i < data.genres.length; i++)
                    document.getElementById("genres").innerHTML += '<span style="background-color: grey; padding: 4px; border-radius: 0.4vw; margin-right: 5px;">' + data.genres[i].name + '</span>';
            }

            $('#exampleModal').modal('show');


        })
        .catch(function (err) {

        });
}


//firebase

var db = firebase.firestore();

//pick yourself (users)
function Recommendations1(id, mediatype) {

    document.getElementById("usermodalbody").innerHTML = '';

    db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          

            document.getElementById("usermodalbody").innerHTML += '<div class="row" style="text-align: center;"> <div class="col"> <button onclick="Recommendations2(this.id,' + id + ',' + mediatype + ')" id="' + doc.id + '" class="btn userbutton" style="border-color: #F11819; padding: 20px; border-radius: 2vw; min-width: 30vw;"><img class="img-fluid" src="' + doc.data().image + '" style="height: 50px; width: 50px; border-radius: 50%;" alt=""> &nbsp&nbsp' + doc.data().name + '</button> </div> </div> <br>'

        });
    });



}

//Push reccomendations
function Recommendations2(user, mediaid, mediatype) {
    console.log(user + ' ' + mediaid + ' ' + mediatype);

    if (mediatype == 0) {
        mediatype = 'tv';
    } else {
        mediatype = 'movie';
    }

    db.collection("Recommendations").add({
        userId: user,
        id: mediaid,
        mediaType: mediatype,
        time: Date.now()
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    $('#exampleModal2').modal('hide');
    $('#exampleModal3').modal('show');
    
}

function registernewuser() {

    db.collection("Users").add({
        name: document.getElementById("newusername").value,
        image: document.getElementById("newuserimage").value
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        $('#exampleModal2').modal('hide');
}


//display reccomendations [reccomendations.html]

db.collection("Recommendations").orderBy("time", "desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        fetch('https://api.themoviedb.org/3/' + doc.data().mediaType + '/' + doc.data().id + '?api_key=67b9d9fa2b8bbd0f0eed63c06a11359b')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                if (doc.data().mediaType == 'movie') {

                    if (data.backdrop_path == null) {
                        data.backdrop_path = 'https://samples-d4024.web.app/images/MoviePosterNA2.jpg'

                    } else {
                        data.backdrop_path = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
                    }

                    if (data.release_date == '') {
                        data.release_date = 'N/A';
                    }
                    if (data.vote_average == 0) {
                        data.vote_average = 'N/A';
                    }
                    if (data.revenue == 0) {
                        data.revenue = 'N/A';
                    } else {
                        data.revenue = '$' + data.revenue.toLocaleString("en-US");
                    }


                    var docRef = db.collection("Users").doc(doc.data().userId);

                    docRef.get().then((doc) => {
                        if (doc.exists) { 
                            console.log("Document data:", doc.data());

                            document.getElementById("reccomendationscards").innerHTML += '<div class="col" style="margin-bottom: 2.6755vw;"><div class="card" style="width: 22rem; background-color: #17161B;"> <img src="'+data.backdrop_path+'" class="card-img-top" alt="..."> <div class="card-body"> <div style="font-size: 12px;" id="genres"> </div> <hr> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <h5>' + data.title + '</h5> <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.vote_average + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <div class="row"> <div class="col"> <p class="card-text" style="color: white; font-size: 11px;">' + data.overview + '<hr> </p> </div> </div> <div class="row"> <div class="col"> <p> <img src="'+doc.data().image+'" style="height: 50px; width: 50px; border-radius: 50%; border: solid 2px #F11819;" alt=""> &nbsp&nbsp'+doc.data().name+' </p> </div> </div> </div> </div></div>'

                        } else {
                            
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });

                }

                if (doc.data().mediaType == 'tv') {

                    if (data.backdrop_path == null) {
                        data.backdrop_path = 'https://samples-d4024.web.app/images/MoviePosterNA2.jpg'

                    } else {
                        data.backdrop_path = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
                    }

                    if (data.first_air_date == '') {
                        data.first_air_date = 'N/A';
                    }
                    if (data.vote_average == 0) {
                        data.vote_average = 'N/A';
                    }
                    if (data.vote_count == 0) {
                        data.vote_count = 'N/A';
                    }

                    var docRef = db.collection("Users").doc(doc.data().userId);

                    docRef.get().then((doc) => {
                        if (doc.exists) { 
                            console.log("Document data:", doc.data());

                            document.getElementById("reccomendationscards").innerHTML += '<div class="col" style="margin-bottom: 2.6755vw;"><div class="card" style="width: 22rem; background-color: #17161B;"> <img src="'+data.backdrop_path+'" class="card-img-top" alt="..."> <div class="card-body"> <div style="font-size: 12px;" id="genres"> </div> <hr> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <h5>' + data.name + '</h5> <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.vote_average + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <div class="row"> <div class="col"> <p class="card-text" style="color: white; font-size: 11px;">' + data.overview + '<hr> </p> </div> </div> <div class="row"> <div class="col"> <p> <img src="'+doc.data().image+'" style="height: 50px; width: 50px; border-radius: 50%; border: solid 2px #F11819;" alt=""> &nbsp&nbsp'+doc.data().name+' </p> </div> </div> </div> </div></div>'

                        } else {
                          
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });

                }

            })
            .catch(function (err) {

            });

    });
});



