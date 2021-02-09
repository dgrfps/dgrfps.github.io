var url  = 'https://api.github.com/users/dgrfps';
var urlRepos = 'https://api.github.com/users/dgrfps/repos';

api(url, function(res){    
    insertValue('avatar', ` <a href="${res.html_url}"> <img src="${res.avatar_url}"> </a> `);
    insertValue('name', ` <p> ${res.login} </p> `);
});

api(urlRepos, function(res){    
    res.map(repo => {
        var desc = repo.description == null ? 'nenhuma informação dada' : repo.description;
        insertValueClass('repos', 
        `
        <a href="${repo.html_url}" class="repo">
            <div class="data">
                <div class="title">
                    <div class="name">${repo.name}</div>
                </div>
                <div class="desc">${desc}</div>
            </div>
            <div class="url">${repo.html_url}</div>
        </a>
        `);
    });
});

function api(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
}

insertValue = (elem, val) => { document.getElementById(elem).innerHTML += val; }
insertValueClass = (elem, val) => { document.getElementsByClassName(elem)[0].innerHTML += val; }
