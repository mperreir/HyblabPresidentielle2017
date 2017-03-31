var count=0;
var checked=true;
var topics;

fetch('data/topics.json')
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            return [];
    })
    .catch((error) => ['Invalid'])
    .then((tp) => {
        topics = tp;
        count=topics.length;
        d3.select('ul.survey-indicator').selectAll('li').data(topics).enter().append('li')
        div = d3.select('.section-survey form')
                .selectAll('div:not(:last-child)')
                .data([null].concat(topics))
                .enter()
                .insert('div', 'div:last-child')
                .attr('class', 'survey-form')
                .attr('id', (d, i) => 'survey-' + i)
                .style('left', (d, i) => i*100+'%');
        d3.select('#survey-x').attr('id', 'survey-' + (count+1)).style('left', (count+1)*100+'%')
        div.append('h2').append('img').attr('src', (d) => d.icon)
        div.select('h2').append('span').text((d) => d.title)
        ul = div.append('ul')
        for(var j=0; j<3; j++) {
            ul.append('li')
                .append('input')
                .attr('name', (d, i) => d.title)
                .attr('value', [1,-1,0][j])
                .attr('type', 'radio')
                .attr('id', (d, i) => 's'+i+'pnu'[j])
                .attr('onchange', 'update_survey(this)')
            ul.select('li:last-child')
                .append('div')
                .attr('class', 'check')
            label = ul.select('li:last-child')
                .append('label')
                .attr('for', (d, i) => 's'+i+'pnu'[j])
                .text((d) => j==0?d.pos.title:j==1?d.neg.title:"I don't know")
            if(j<2) {
                label.append('br')
                label.append('span').text((d) => j==0?d.pos.desc:d.neg.desc)
            }
        }
    })

function update_survey(radio) {
    d3.selectAll('.survey-footer').style('opacity', null)
    d3.selectAll('.survey-button').style('cursor', 'pointer')
    checked=true;
}

function survey_next(index) {
    if(!checked) return;
    button = d3.select('.survey-button')
    if(index==0) {
        d3.select("ul.survey-indicator").style('opacity', null)
        d3.selectAll('.survey-form li input').property('disabled', false)
        button.text("Next topic")
    } else if (index==count-1) {
        button.text("Finish survey")
        if(d3.sum(d3.selectAll('input:checked').nodes().map((item)=>Math.abs(item.value)))===0) {
            d3.select('.survey-form:nth-last-child(2) li:last-child').attr('class', 'disabled')
            d3.select('.survey-form:nth-last-child(2) li:last-child input').property('disabled', true)
        }
    } else if (index==count) {
        d3.select("ul.survey-indicator").style('opacity', '0')
        button.text("Retake survey")
        result = survey_submit()
        fr = result[0]
        us = result[1]
        d3.select('h2.ftop').style('opacity', 0)
        d3.select('h1.ftop').style('display', 'none')
        d3.select('h1.etop').style('display', null)

        art_fr = d3.select('div.survey-end article.fr');
        art_fr.select('section.img').style('background-image', 'url(' + fr.img + ')')
        art_fr.select('section.txt').html(fr.first + '<br/>' + fr.name)
        art_us = d3.select('div.survey-end article.us');
        art_us.select('section.img').style('background-image', 'url(' + us.img + ')')
        art_us.select('section.txt span.content').html(us.first + '<br/>' + us.name)
    } else if (index==count+1) {
        index=-1
        d3.select('h2.ftop').style('opacity', 1)
        d3.select('h1.ftop').style('display', null)
        d3.select('h1.etop').style('display', 'none')
        d3.selectAll('.survey-form:nth-last-child(2) li:last-child').attr('class', null)
        d3.selectAll('.survey-form li input').property('disabled', true)
        d3.selectAll('ul.survey-indicator li').style('background', 'transparent')
        d3.selectAll('input[type=radio]').property('checked', false)
        button.style('opacity', 0)
        setTimeout(() => {button.text("Start")}, 600)
        setTimeout(() => {button.style('opacity', 1)}, 1200)
    }
    index++

    if(index > 0 && index <= count) {
        d3.selectAll('.survey-footer').style('opacity', 0.5)
        button.style('cursor', 'default')
        checked=false
    }

    d3.select('.section-survey a.next').style('display', (index==0 || index>count)?null:'none')
    button.classed('lower', index>0 && index<=count).classed('mid', index>count)
    d3.selectAll('.survey-form').style('left', (d, i) => (i-index)*100+'%');
    button.attr('onclick', 'survey_next(' + index + ')')
    d3.selectAll("ul.survey-indicator li:nth-of-type(-n+" + index + ")").style('background', 'white')
}

function survey_submit() {
    form = {}
    d3.selectAll('.section-survey input:checked').nodes().forEach((input) => {
        form[input.name] = +input.value
    })
    distance = candidates_all.map((c) => ({'dist': 0, 'c':c}))
    distance.forEach((candidate) => {
        topics.forEach((topic) => {
            if(form[topic.title] != 0)
                candidate.dist += Math.abs(form[topic.title] - candidate.c.topics[topic.title].opinion)
        })
    })
    result = distance.sort((a, b) => a.dist > b.dist).map((c) => c.c)
    fr = result.filter((c) => c.country==='FR')
    us = result.filter((c) => c.country==='USA')
    return [fr[0], us[0]]
}
