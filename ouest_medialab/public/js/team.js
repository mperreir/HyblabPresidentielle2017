fetch('data/team.json')
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            return [];
    })
    .catch((error) => ['Invalid'])
    .then((team) => {
        list = document.getElementById('team_list');
        d3.select('#team_list')
            .selectAll('li')
            .data(team)
            .enter()
            .append('li')
            .each(function(d) {
                var li = d3.select(this)
                if('link' in d)
                    var li = li.append('a').attr('href', d.link).attr('target', '_blank')
                li.append('div')
                    .classed('team-img', true)
                    .style('background-image', (d) => 'url(' + d.pic + ')')
                var p = li.append('p')
                p.append('span').classed('member-name', true).text((d) => d.first + ' ' + d.name)
                p.append('br')
                p.append('span').classed('member-job', true).text((d) => d.job)
            })
    })
