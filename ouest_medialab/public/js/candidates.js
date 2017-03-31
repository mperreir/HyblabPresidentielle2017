fetch('data/candidates.json')
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            return [];
    })
    .catch((error) => ['Invalid'])
    .then((candidates) => {
        list = document.getElementById('candidate_list');
        candidates = candidates.filter((candidate) => candidate.country == "FR")
        candidates.forEach((candidate) => {
            var li = document.createElement('li')
            var img = document.createElement('div')
            img.setAttribute('class', 'candidate-img')
            img.setAttribute('style', 'background-image: url(' + candidate.img + ')');
            var div = document.createElement('div')
            div.setAttribute('class', 'candidate-info')
            var p = document.createElement('p')
            p.innerHTML = '<span class="candidate-name">' + candidate.first + "<br/>" + candidate.name
                + "</span><br/>" + candidate.party + "<br/>" + candidate.age + " years old"
            div.appendChild(p)
            li.appendChild(img)
            li.appendChild(div)
            list.appendChild(li);
        })
    })
