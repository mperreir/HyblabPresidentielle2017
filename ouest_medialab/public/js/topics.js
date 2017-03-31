var candidates;
var candidates_all;
var interest;
var opinions;
var height = 400;
var bar_width = 90;
var bar_spacing = 40;
var g_width = bar_width + bar_spacing;
var topic='';

var svg = d3.select("#topics_chart")
    // .attr("height", '100%')

function id(d, i) { return candidates[i].name.replace(' ', ''); }

function update(data) {
    svg.attr("viewBox", "0 0 " + g_width * interest.length + " " + (height + g_width))
    var bar = svg.selectAll("g.enter, g.update").data(data)
    bar.attr("class", "update").select('g').style("transform", (d) => "translateY(" + ((1-d) * height) + "px)")

    newb =bar.enter().append("g")
        .attr("class", "enter")
        .attr("transform", function(d, i) { return "translate(" + i * g_width + ")";});

    newb.append("g").attr('class', 'bar')
        .attr("onmouseenter", function(d, i) { return 'hover_topic("' + candidates[i].name + '")'; })
        .attr("onmouseleave", function(d, i) { return 'leave_topic("' + candidates[i].name + '")'; })
        .style("transform", function(d) { return "translateY(" + ((1-d) * height) + "px)"})
        .append("rect")
        .attr("width", bar_width-1)
        .attr("height", height)
        .attr("x", bar_spacing/2)
        .attr("y", g_width)
    newb.append('defs').append('pattern')
        .attr('id', function(d, i) { return candidates[i].name.replace(' ', '') })
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('height', bar_width)
        .attr('width', bar_width + bar_spacing/2)
        .append('image')
        .attr('x', bar_spacing/2).attr('y', 0).attr('height', bar_width).attr('width', bar_width).attr('xlink:href', function(d, i) { return candidates[i].img })
    newb.select('g').append('circle')
        .attr('cx', bar_width/2+bar_spacing/2)
        .attr('cy', bar_width/2)
        .attr('r', bar_width/2)
        .attr('fill', 'white')
        .attr('class', 'background ')
    newb.select('g').append('circle')
        .attr('cx', bar_width/2+bar_spacing/2)
        .attr('cy', bar_width/2)
        .attr('r', bar_width/2*0.9)
        .attr('fill', function(d, i) { return 'url(#' + candidates[i].name.replace(' ', '') + ')'; })
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
        var li = d3.select('#topic_list')
            .selectAll('li')
            .data(topics)
            .enter()
            .append('li')
            .attr('onclick', 'select_topic(this)')
        li.append('img').attr('src', (d) => d.icon)
        li.append('span').text((d) => d.title)
    })

fetch('data/candidates.json')
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            return [];
    })
    .catch((error) => [{'name': 'Invalid data'}])
    .then((json) => {
        candidates_all = json
        candidates = candidates_all.filter((candidate) => candidate.country == "FR")
        interest = candidates.map((_) => 0);
        update(interest);
    });

fetch('data/opinions.json')
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            return {};
    })
    .catch((error) => ({error}))
    .then((json) => { opinions = json; });

function select_topic(li) {
    topic = li.textContent
    ul = document.getElementById('topic_list');
    ul.style.left="-25%";
    Array.from(ul.children).forEach((li) => {
        li.setAttribute('class', null)
    })
    li.setAttribute("class", "selected");
    svg.style("opacity", 1)
    interest = candidates.map((candidate) => candidate.topics[topic].interest)
    update(interest)
}

var thoughts = document.getElementById('topic_corner')

function hover_topic(name) {
    thoughts.innerHTML = opinions[topic][name].join('<br/>')
    thoughts.setAttribute('style', 'display: block')
}

function leave_topic(name) {
    thoughts.textContent = ''
    thoughts.setAttribute('style', 'display: none')
}
