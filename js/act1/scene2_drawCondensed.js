const getCondensedX = (i, config) => ((i % config.numColumns) + 1) * config.gridSpacing
const getCondensedY = (i, config) => (parseInt(i / config.numColumns) + 1) * config.gridSpacing
const getColorByType = (type) =>  {
    switch(type) {
        case 'trad':
            return 'red'
        case 'sport':
            return 'green'
        case 'boulder':
            return 'magenta'
        case 'aid':
        case 'spectator':
            return 'grey'
    }
    return 'black'
} // case 'spectator': return 'grey'

const condensedLayout = (data) => {
    if (data == null) return []
    const config = CONFIGS['all-routes']

    return data
        .sort((a, b) => a.id - b.id)
        .map((d, i) => ({
            id: d.id,
            x: getCondensedX(i, config),
            y: getCondensedY(i, config),
            type: d.type,
            date: d.date,
            color: getColorByType(d.type)
        }))
}

const drawCondensedRoutes = (chart, layoutData, config, transitions) => {
    chart.selectAll('g.route')
        .data(layoutData, d => d.id)
        .join('g')
        .each((d, i, nodes) => {
            const route = d3.select(nodes[i])

            init(route, config, d.x, d.y)

            route.transition()
                .duration(transitions.duration)
                .attr('transform', `translate(${d.x}, ${d.y})`)
                .style('opacity', 1)
            
            route.select('.dot')
                .attr('r', config.circleRadius)
                .style('fill', d => d.color)
        })
}