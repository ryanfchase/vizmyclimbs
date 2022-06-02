const setSplashGradient = (shouldSet) => {
    const mask = '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))'
    d3.select('#container-1 .graph svg').style('-webkit-mask-image', shouldSet ? mask : 'none')
}

const splashLayout = (data) => {
    if (data == null) return []
    const config = CONFIGS['all-routes']

    return data.map((d, i) => ({
        id: d.id,
        x: ((i % config.numColumns) + 0.0) * config.gridSpacingLarge,
        y: (parseInt(i / config.numColumns) + 0.5) * config.gridSpacingLarge,
        name: d.name,
        type: d.type,
    }))
}

const drawSplashRoutes = (chart, layoutData, config, transitions) => {
    chart.selectAll('g.route')
        .data(layoutData, d => d.id)
        .join('g')
        .each((d, i, nodes) => {
            const route = d3.select(nodes[i])

            init(route, config, d.x, d.y)

            // don't think I need this anymore
            route.select('#dot-clip-path circle')
                .attr('r', config.circleRadiusLarge)
                .attr('transform', `translate(${d.x + config.circleRadiusLarge}, ${d.y})`)

            route.transition()
                .duration(transitions.quickDuration)
                .style('opacity', 0)
                .transition()
                .attr('transform', `translate(${d.x}, ${d.y})`)
                .transition()
                .duration(transitions.duration) // need a longer duration for smoother opacity change
                .delay(i * transitions.delay)
                .style('opacity', 1)
            
            route.selectAll('.dot')
                .transition()
                .duration(transitions.quickDuration)
                .attr('r', config.circleRadiusLarge)
        })

        // remove labels
        chart.selectAll('g.marker')
            .each((d, i, nodes) => {
                const marker = d3.select(nodes[i])
                if (marker.selectAll('*').empty()) {
                    marker.classed('marker', true)
                        .style('opacity', 0)
                        .attr('transform', `translate(${d.x}, ${d.y})`)

                    marker.append('text')
                        .classed('label', true)
                        .style('stroke', 'black')
                }
                
                marker.transition()
                    .style('opacity', 0)
            })
}

const init = (route, config, x, y) => {
    if (route.selectAll('*').empty()) {
        route.classed('route', true)
            .style('opacity', 0)
            .attr('transform', `translate(${x}, ${y})`)

        route.append('circle')
            .classed('dot', true)
            .attr('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', '2')
    }
}

/*
    route.select('.img')
        .attr('xlink:href', d.url)
        
    route.append('defs')
        .append('clipPath')
            .attr('id', 'dot-clip-path')
        .append('circle')

    route.append('image')
        .classed('img', true)
        .attr('width', 3 * config.circleRadiusLarge) // .attr('height', 2 * config.circleRadiusLarge) // wow ok i just need to leave out the height
        .attr('transform', `translate(-${config.circleRadiusLarge}, -${config.circleRadiusLarge})`)
        .attr('clip-path', 'url(#dot-clip-path)')
        .attr('xlink:href', '')
*/