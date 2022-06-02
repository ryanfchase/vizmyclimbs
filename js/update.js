const ALL_ROUTES1 = 0
const ALL_ROUTES2 = 1
const ALL_ROUTES3 = 2
const ALL_ROUTES4 = 3

const configureChart = (num, width, height) => {
    const svg = d3.select(`#container-${num} .graph`).html('')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    return svg
}

const update = () => {
    if (innerWidth == state.oldWidth)
        return state.oldWidth = innerWidth

    let width = height = d3.select('.graph').node().offsetWidth
    if (innerWidth <= 925) {
        width = innerWidth
        height = innerHeight * .70
    }
    const transitions1 = CONFIGS['transition'],
        config1 = CONFIGS['all-routes']
    
    const chart1 = configureChart(1, width, height),
        container1 = d3.select('#container-1'),
        graph1 = container1.select('.graph'),
        sections1 = container1.selectAll('.sections > div'),
        uniqueId1 = 'uniqueId1'

    const gs1 = d3.graphScroll()
        .container(container1)
        .graph(graph1)
        .eventId(uniqueId1) // namespace for scroll / resize events
        .sections(sections1)
        .on('active', section => {
            let layout = []
            if (section == ALL_ROUTES1) {
                layout = splashLayout(state.data)
                setSplashGradient(innerWidth <= 945)
                drawSplashRoutes(chart1, layout, config1, transitions1)
            }
            else if (section == ALL_ROUTES2) {
                layout = condensedLayout(state.data)
                setSplashGradient(false)
                drawCondensedRoutes(chart1, layout, config1, transitions1)
                drawYearMarkers(chart1, layout, config1, transitions1)
            }
            else if (section == ALL_ROUTES3) {
                layout = condensedSortedLayout(state.data)
                drawCondensedSortedByType(chart1, layout, config1, transitions1)
                drawPercentageMarkers(chart1, layout, config1, transitions1)
            }
            else if (section == ALL_ROUTES4) { }
        })
    const transitions2 = CONFIGS['transition'],
        config2 = CONFIGS['all-routes']
    
    const chart2 = configureChart(2, width, height),
        container2 = d3.select('#container-2'),
        graph2 = container2.select('.graph'),
        sections2 = container2.selectAll('.sections > div'),
        uniqueId2 = 'uniqueId2'

    const gs2 = d3.graphScroll()
        .container(container2)
        .graph(graph2)
        .eventId(uniqueId2) // namespace for scroll / resize events
        .sections(sections2)
        .on('active', section => {
            let layout = []
            if (section == ALL_ROUTES1) {
                layout = boulderingHeightsLayout(state.data)
                drawBoulderingHeights(chart2, layout, config1, transitions1)
            }
            else if (section == ALL_ROUTES2) {
                /*
                layout = condensedLayout(state.data)
                setSplashGradient(false)
                drawCondensedRoutes(chart1, layout, config, transitions)
                drawYearMarkers(chart1, layout, config, transitions)
                */
            }
            else if (section == ALL_ROUTES3) {
                /*
                layout = condensedSortedLayout(state.data)
                drawCondensedSortedByType(chart1, layout, config, transitions)
                drawPercentageMarkers(chart1, layout, config, transitions)
                */
            }
            else if (section == ALL_ROUTES4) { }
        })
}
