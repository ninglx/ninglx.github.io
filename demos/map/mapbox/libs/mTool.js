function convertPointsLngLatToGeo(arr) {
    let features = []
    for (let item of arr) {
        features.push(turf.point([item.lng, item.lat], item))
    }
    return turf.featureCollection(features)
}

window.addPoint = (map, arr, id) => {
    let geo = convertPointsLngLatToGeo(arr)
    if (map.getSource(id)) {
        map.getSource(id).setData(geo)
    } else {
        map.addSource(id, {
            type: "geojson",
            data: geo,
        })
        map.addLayer({
            id: id,
            type: "circle",
            source: id,
            paint: {
                'circle-color': 'red',
                'circle-radius': 5
            },
        })
    }
}

window.removeLayers = (map, names) => {
    if (map) {
        for (let layerId of names.split(",")) {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }
            if (map.getSource(layerId)) {
                map.removeSource(layerId);
            }
        }
    }
}