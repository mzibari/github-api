





function displayResults(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length ; i++){
        
        $('#results-list').append(
          `<li><h3><a href="${responseJson[i].owner.url}">${responseJson[i].owner.url}</a></h3>
          <p>${responseJson[i].name}</p>
          </li>`
        )};
      $('#results').removeClass('hidden');
}

function getRepos(user) {
    const url = `https://api.github.com/users/${user}/repos`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchUser = $('#js-search-user').val();
        getRepos(searchUser);
    });
}

$(watchForm);