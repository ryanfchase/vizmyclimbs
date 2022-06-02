const getCondensedYearPositions = (data) => {
    const config = CONFIGS['all-routes']
    let curr = 2018 // preset curr year with something that will immediately get incremented
    let yearLayout = []
    data.forEach((e, i) => {
        let year = e.date.getFullYear()
        if (curr != e.date.getFullYear()) {
            curr++
            let yearObject = {
                x: config.numColumns * config.gridSpacing + 3 * config.circleRadius,
                y: getCondensedY(i, config) + config.circleRadius / 2,
                year: year
            }
            yearLayout.push(yearObject)
        }
    })
    return yearLayout
}

const drawYearMarkers = (chart, layoutData, config, transitions) => {
    const yearData = getCondensedYearPositions(layoutData)
    chart.selectAll('g.marker')
        .data(yearData)
        .join('g')
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
                .duration(transitions.duration)
                .attr('x', d.x)
                .attr('y', d.y)
                .style('opacity', 1)
            marker.select('.label')
                .text(d.year)
        })
}
