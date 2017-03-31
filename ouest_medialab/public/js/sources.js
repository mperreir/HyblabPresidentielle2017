icon_paths = {
    '-1': 'img/source-minus.png',
    '0': 'img/source-cross.png',
    '1': 'img/source-plus.png'
}

fetch('data/topics.json')
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            return [];
    })
    .catch((error) => ['Invalid'])
    .then((topics) => {
        fetch('data/candidates.json')
            .then((response) => {
                if(response.ok)
                    return response.json();
                else
                    return [];
            })
            .catch((error) => ['Invalid'])
            .then((candidates) => {
                var table = d3.select('table#source');
                table.append('tr')
                    .selectAll('th')
                    .data([null].concat(topics))
                    .enter()
                    .append('th')
                    .each(function(d, i) {
                        if(i==0) {
                            var td = d3.select(this).attr('colspan', 2)
                            td.append('div')
                                .attr('class', 'flagFR')
                                .attr('onclick', 'switchto("FR")')
                            td.append('div')
                                .attr('class', 'flagUSA')
                                .attr('onclick', 'switchto("USA")')
                        } else {
                            d3.select(this).append('div').append('span').text(d.title)
                            d3.select(this).append('img').attr('src', d.icon)
                        }
                    })
                table.selectAll('tr')
                    .data([null].concat(candidates))
                    .enter()
                    .append('tr')
                    .attr('class', (d) => 'c' + d.country)
                    .selectAll('td')
                    .data((candidate, i) => [candidate, candidate].concat(topics.map((topic) => candidate.topics[topic.title])))
                    .enter()
                    .append('td')
                    .each(function(d, i) {
                        td = d3.select(this)
                        if(i==0) {
                            td.append('div').attr('class', 'candidate-name').html(d.first + '<br/>' + d.name)
                        }
                        else if(i==1) {
                            td.append('div').attr('class', 'candidate-background').style('background-image', 'url(' + d.img + ')')
                        } else {
                            td.append('a').attr('href', d.source).attr('target', '_blank')
                                .append('img').attr('src', icon_paths[Math.sign(d.opinion)])
                        }
                    })
                switchto('FR')
            });
    });

function switchto(country) {
    d3.selectAll('.section-sources table th:first-child div').classed('top', false).classed('bottom', true)
    d3.select('div.flag' + country).classed('top', true).classed('bottom', false)
    d3.selectAll('tr:nth-child(n+2):not(.c' + country + ')').style('display', 'none')
    d3.selectAll('tr.c' + country).style('display', null)
}
