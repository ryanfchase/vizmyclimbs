const drawPercentageMarkers = (chart, layoutData, config, transitions) => {
    const percentageData = getSortedPercentagePositions(layoutData)
    
    chart.selectAll('g.marker')
        .data(percentageData)
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
                .text(`${d.type}: ${d.percentage}%`)
        })
}

const getSortedPercentagePositions = (data) => {
    const config = CONFIGS['all-routes']
    const total = data.length
    let percentageLayout = []
    let curr = data[0].type
    let firstRow = getCondensedY(0, config) + config.circleRadius / 2, lastRow = 0
    let percentage = 0
    data.forEach((e, i) => {
        if (curr != e.type) {
            lastRow = getCondensedY(i-1, config) + config.circleRadius / 2
            curr = e.type // update the outer loop variable to match the current type
            let percentageObject = {
                x: config.numColumns * config.gridSpacing + 3 * config.circleRadius,
                y: parseInt((firstRow + lastRow) / 2),
                type: data[i-1].type,
                percentage: (percentage / total * 100).toFixed(2)
            }
            // reset counters
            firstRow = getCondensedY(i, config) + config.circleRadius / 2
            percentage = 0
            
            // add percentage to list
            if (percentageObject.percentage > 0) {
                percentageLayout.push(percentageObject)
            }
        }
        else {
            percentage++
        }
    })
    lastRow = getCondensedY(data.length - 1, config) + config.circleRadius / 2
    percentageLayout.push({
        x: config.numColumns * config.gridSpacing + 3 * config.circleRadius,
        y: parseInt((firstRow + lastRow) / 2),
        type: data[data.length-1].type,
        percentage: (percentage / total * 100).toFixed(2)
    })
    return percentageLayout

}