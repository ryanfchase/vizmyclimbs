
const drawCondensedSortedByType = (chart, layoutData, config, transitions) => {
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

const condensedSortedLayout = (data) => {
    if (data == null) return []
    const config = CONFIGS['all-routes']

    return data
    .sort((a, b) => {
        const aVal = climbTypeSortable[a.type]
        const bVal = climbTypeSortable[b.type]
        if (aVal == bVal) {
            return a.date - b.date
        }
        else return aVal - bVal
    })
    .map((d, i) => ({
        id: d.id,
        x: ((i % config.numColumns) + 1 ) * config.gridSpacing,
        y: (parseInt(i / config.numColumns) + 1) * config.gridSpacing,
        type: d.type,
        color: getColorByType(d.type)
    }))
}