const getBoulderingX = (i, config) => (i + 1) * config.gridSpacing

const boulderingHeightsLayout = (data) => {

    if (data == null) return []
    const config = CONFIGS['height-chart']
    const group = ['boulder']
    const boulderingData = data.filter(d => group.includes(d.type))

    let width = height = d3.select('.graph').node().offsetWidth
    if (innerWidth <= 925) {
        width = innerWidth
        height = innerHeight * .70
    }
    const maxHeight = Math.max(...boulderingData.map(d => d.height))
    const minHeight = Math.min(...boulderingData.map(d => d.height))
    const sideBuffer = 60
    const maxScaledX = width
    const maxScaledY = height

    // [0, n], where n is number of bouldering types
    const boulderScaleX = d3.scaleLinear()
        .domain([0, boulderingData.length])
        .range([sideBuffer, maxScaledX - config.circleRadius])

    const boulderScaleY = d3.scaleLinear()
        .domain([minHeight, maxHeight])
        .range([2 * config.circleRadius, maxScaledY - 2 * config.circleRadius])

    return boulderingData
        .sort((a, b) => a.id - b.id)
        .map((d, i) => ({
            id: d.id,
            x: boulderScaleX(i),
            y: maxScaledY - boulderScaleY(d.height),
            color: getColorByType(d.type),
            name: d.name
        }))
}

const drawBoulderingHeights = (chart, layoutData, config, transitions) => {
    chart.selectAll('g.boulder')
        .data(layoutData, d => d.id)
        .join('g')
        .each((d, i, nodes) => {
            const boulder = d3.select(nodes[i])

            if (boulder.selectAll('*').empty()) {
                boulder.classed('boulder', true)
                    .style('opacity', 1)
                    .attr('transform', `translate(${d.x}, ${d.y})`)

                boulder.append('circle')
                    .classed('dot', true)
                    .attr('fill', 'none')
                    .style('stroke', 'black')
                    .style('stroke-width', '2')
            }

            boulder.transition()
                .duration(transitions.quickDuration)
                .attr('transform', `translate(${d.x}, ${d.y})`)
            
            boulder.selectAll('.dot')
                .transition()
                .duration(transitions.quickDuration)
                .attr('r', config.circleRadius)
        })
}