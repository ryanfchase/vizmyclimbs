var state = {
    data: null,
    data2019: null,
    data2020: null,
    data2021: null,
    data2022: null,
    selectedIndicator: null,
    oldWidth: 0
}

var popup = d3.select('body')
    .append('div')
    .classed('tooltip', true)
    .style('opacity', 0)


const action = (type, param) => {
    switch(type) {
        case 'setData':
            state.data = param
            break
        case 'setPartitionedData':
            state.data2019 = param[0]
            state.data2020 = param[1]
            state.data2021 = param[2]
            state.data2022 = param[3]
            break;
        case 'setSelectedIndicator':
            state.selectedIndicator = param
            break
    }
    
    update()
}