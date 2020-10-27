const client_id = 'Iv1.b91cde5331cec56d';
const client_secret = '8bdafdd98e9551ee28718f949c0a1d027558d236';

function searchRepos(){
    const user = $('#username').val();
    fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`)
        .then(response => {
            if (response.ok) {
               return response.json() 
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch (err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`).removeClass('hidden')
        })
}

function displayResults(responseJson){
    
    for(let i = 0; i < responseJson.length; i++){
        $('#js-results-list').append(`<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3></li>`)
    }
    $('#js-results').removeClass('hidden');
}

function watchForm(){
    $("#js-form").submit(event => {
        event.preventDefault();
        $('#js-results-list').empty();
        $('#js-results').addClass('hidden');
        $('.error-message').addClass('hidden');
        searchRepos();
    });
}

$(watchForm);