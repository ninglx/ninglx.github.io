

// Function to create a triangle icon (arrow)
function createTriangleIcon(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    const context = canvas.getContext("2d");
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(12, 2);
    context.lineTo(22, 22);
    context.lineTo(2, 22);
    context.closePath();
    context.fill();
    return canvas.toDataURL();
}

 function addOrUpdateSelectVehicleTrack(map, geo, id) {

    let layerName = `selectVehicleTrack${id}`
    if (!map.getSource(layerName)) {
        map.addSource(layerName, {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource(layerName).setData(geo);
    }
    if (!map.getLayer(layerName)) {
        map.addLayer(
            {
                id: layerName,
                type: "line",
                source: layerName,
                paint: {
                    "line-color": 'yellow',
                    "line-width": 3,
                },
            },
            "vehicle3D"
        );
    }
}

// 毫米波雷达范围图层
 function addOrUpdateMilliScope(map, geo) {
    if (!map.getSource(`milliScope`)) {
        map.addSource(`milliScope`, {
            type: "geojson",
            data: geo,
        });
    }
    if (!map.getLayer(`milliScope`)) {
        map.addLayer(
            {
                id: `milliScope`,
                source: `milliScope`,
                type: "fill",
                paint: {
                    "fill-color": 'rgba(68, 114, 196, 0.4)', // 默认值，如果没有匹配到上述枚举值]
                },
            },
            "vehicle3D"
        );
    }
}

// 更新灯态图层
 function addOrUpdateLightLayers(map, geo) {
    if (!map.getSource("lightLayer")) {
        map.addSource("lightLayer", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("lightLayer").setData(geo);
    }
    if (!map.getSource("lightLayerText")) {
        map.addSource("lightLayerText", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("lightLayerText").setData(geo);
    }
    if (!map.getLayer("lightLayer")) {
        map.addLayer(
            {
                id: "lightLayer",
                type: "symbol",
                source: "lightLayer",
                layout: {
                    "icon-allow-overlap": true,
                    "icon-ignore-placement": true,
                    "icon-size": 0.7,
                    "icon-image": ["get", "ts"],
                    "icon-pitch-alignment": "map",
                    // "icon-rotate": ["+", ["*", ["get", "roadDir"], 45], 180],
                    'icon-rotate': ['get', 'lightAngle'],
                    "icon-rotation-alignment": "map",
                },
            },
            "vehicle3D"
        );
    }
    
    if (!map.getLayer("lightLayerText")) {
        map.addLayer(
            {
                id: "lightLayerText",
                type: "symbol",
                source: "lightLayerText",
                layout: {
                    "text-allow-overlap": true,
                    "text-ignore-placement": true,
                    "text-field": ["get", "remainTime"],
                    "text-size": 14,
                    "text-pitch-alignment": "map",
                    "text-rotation-alignment": "map",
                    'text-rotate': ['get', 'lightAngle'],
                    // "text-rotate": ["+", ["*", ["get", "roadDir"], 45], 180],
                },
                paint: {
                    "text-color": "white",
                    "text-halo-blur": 1,
                    "text-halo-width": 2,
                    "text-halo-color": [
                        "match",
                        ["get", "state"], // 属性字段名称
                        "red",
                        "rgba(255, 130, 130, 0.5)",
                        "yellow",
                        "rgba(255, 179, 0, 0.5)",
                        "green",
                        "rgba(48, 255, 141, 0.5)",
                        "rgba(255,255,255,0)", // 默认值，如果没有匹配到上述枚举值
                    ],
                },
            },
            "vehicle3D"
        );
    }
}

// 更新等待行人区域灯态
 function addOrUpdateWaitingPolygons(map, geo){
    if (!map.getSource("waitingLayer")) {
        map.addSource("waitingLayer", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("waitingLayer").setData(geo);
    }
    if (!map.getLayer("waitingLayer")) {
        map.addLayer(
            {
                id: "waitingLayer",
                type: "fill",
                source: "waitingLayer",
                paint: {
                    "fill-color": [
                        "match",
                        ["get", "state"], // 属性字段名称
                        'red',
                        "rgba(231, 63, 50,0.4)",
                        'green',
                        'rgba(35, 148, 67,0.4)',
                        'yellow',
                        'rgba(251, 194, 29,0.4)',
                        "rgba(255,255,255,0)",
                    ], // 默认值，如果没有匹配到上述枚举值]
                },
            },
            "vehicle3D"
        );
    }
}

// 检测器layer
 function addOrUpdateDetetorA(map, geo) {
    if (!map.getSource("detetorsA")) {
        map.addSource("detetorsA", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("detetorsA").setData(geo);
    }
    if (!map.getLayer("detetorsA")) {
        map.addLayer(
            {
                id: "detetorsA",
                type: "line",
                source: "detetorsA",
                paint: {
                    "line-color": [
                        "match",
                        ["get", "state"],
                        0,
                        "green",
                        1,
                        "red",
                        "green",
                    ],
                    "line-width": 3,
                },
            },
            "vehicle3D"
        );
    }
}
 function addOrUpdateDetetorB(map, geo) {
    if (!map.getSource("detetorsB")) {
        map.addSource("detetorsB", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("detetorsB").setData(geo);
    }
    if (!map.getLayer("detetorsB")) {
        map.addLayer(
            {
                id: "detetorsB",
                type: "line",
                source: "detetorsB",
                paint: {
                    "line-color": [
                        "match",
                        ["get", "state"],
                        0,
                        "green",
                        1,
                        "red",
                        "green",
                    ],
                    "line-width": 3,
                },
            },
            "vehicle3D"
        );
    }
}
 function addOrUpdateDetetorC(map, geo) {
    if (!map.getSource("detetorsC")) {
        map.addSource("detetorsC", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("detetorsC").setData(geo);
    }
    if (!map.getLayer("detetorsC")) {
        map.addLayer(
            {
                id: "detetorsC",
                type: "line",
                source: "detetorsC",
                paint: {
                    "line-color": [
                        "match",
                        ["get", "state"],
                        0,
                        "green",
                        1,
                        "red",
                        "green",
                    ],
                    "line-width": 3,
                },
            },
            "vehicle3D"
        );
    }
}

// 更新路况矢量切片图层
 function addOrUpdateRoadVector(map) {
    if (!map.getSource("vector_road")) {
        map.addSource("vector_road", {
            type: "vector",
            tiles: [map_config.VECTOR_ROAD],
        });
    }
    if (!map.getLayer("vector_road_layer")) {
        map.addLayer({
            id: "vector_road_layer",
            source: "vector_road",
            "source-layer": "line-layer",
            type: "line",
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-width": 3,
                "line-color": [
                    "match",
                    ["get", "status"],
                    "1",
                    "green",
                    "2",
                    "yellow",
                    "3",
                    "orange",
                    "4",
                    "red",
                    "green",
                ],
            },
        });
        if (map.getLayer("holo_crossPointS")) map.moveLayer("holo_crossPointS");
    }
}

// 更新选中车辆底部闪动波纹
 function addOrUpdateWave(map, geo) {
    if (map.getSource("dot-point")) {
        map.getSource("dot-point").setData(geo);
    } else {
        map.addSource("dot-point", {
            type: "geojson",
            data: geo,
        });
    }
    if (!map.getLayer("vehicleSelectWave")) {
        map.addLayer({
            id: "vehicleSelectWave",
            type: "symbol",
            source: "dot-point",
            layout: {
                "icon-image": "pulsingDot0",
                "icon-pitch-alignment": "map",
                "icon-rotation-alignment": "map",
            },
        });
    }
}
// type 4 种颜色 对应 4种告警信息
 function addOrUpdateWarningWave(map, geo) {
    if (map.getSource("waveWarning")) {
        map.getSource("waveWarning").setData(geo);
    } else {
        map.addSource("waveWarning", {
            type: "geojson",
            data: geo,
        });
    }
    if (!map.getLayer("waveWarning")) {
        map.addLayer({
            id: "waveWarning",
            type: "symbol",
            source: "waveWarning",
            layout: {
                "icon-image": [
                    "match",
                    ["get", "type"],
                    1,
                    "pulsingDot1",
                    2,
                    "pulsingDot2",
                    3,
                    "pulsingDot3",
                    4,
                    "pulsingDot4",
                    "",
                ],
                "icon-pitch-alignment": "map",
                "icon-rotation-alignment": "map",
            },
        });
    }
}

// 更新zoom值较小时的车辆轨迹point
 function addOrUpdateVehicle(map, geo) {
    if (!map.getSource("vehicle")) {
        map.addSource("vehicle", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("vehicle").setData(geo);
    }
    if (!map.getLayer("vehicle")) {
        map.addLayer({
            id: "vehicle",
            type: "circle",
            source: "vehicle",
            paint: {
                "circle-blur": 1,
                "circle-color": "#06f4fe",
                "circle-pitch-alignment": "map",
            },
        });
        if (map.getLayer("holo_crossPoint")) map.moveLayer("holo_crossPoint");
    }
}

// 路口icon
 function addOrUpdateCross(map, geo, callback) {

    if (!map.getSource("holo_crossPoint")) {
        map.addSource("holo_crossPoint", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("holo_crossPoint").setData(geo);
    }
    if (!map.getLayer("holo_crossPoint")) {

        map.addLayer({
            id: "holo_crossPoint",
            type: "symbol",
            source: "holo_crossPoint",
            layout: {
                "icon-image": [
                    "match",
                    ["get", "isSignal"], // 属性字段名称
                    1,
                    "crossNormal",
                    0,
                    "crossFalse",
                    "crossSelect", // 默认值，如果没有匹配到上述枚举值
                ],
                "icon-size": 0.7,
                "icon-offset": [0, -10],
            },
        });
        map.on("click", "holo_crossPoint", (aaa) => callback(aaa));
    }
}

// second 路口icon
 function addOrUpdateCrossS(map, geo, callback) {
    if (!map.getSource("holo_crossPointS")) {
        map.addSource("holo_crossPointS", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("holo_crossPointS").setData(geo);
    }
    if (!map.getLayer("holo_crossPointS")) {
        map.addLayer({
            id: "holo_crossPointS",
            type: "symbol",
            source: "holo_crossPointS",
            layout: {
                "icon-image": [
                    "match",
                    ["get", "isSignal"], // 属性字段名称
                    1,
                    "crossNormal",
                    0,
                    "crossFalse",
                    "crossSelect", // 默认值，如果没有匹配到上述枚举值
                ],
                "icon-size": 0.7,
                "icon-offset": [0, -10],
            },
        });
        map.on("click", "holo_crossPointS", (aaa) => callback(aaa));
    }
}

// 路口名称
 function addOrUpdateCrossName(map, geo) {
    if (!map.getSource("holo_crossPoint")) {
        map.addSource("holo_crossPoint", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("holo_crossPoint").setData(geo);
    }
    if (!map.getLayer("holo_crossName")) {
        map.addLayer({
            id: "holo_crossName",
            type: "symbol",
            source: "holo_crossPoint",
            layout: {
                "text-field": ["get", "name"],
                "text-size": 12,
                "text-offset": [0, 1.5],
                "text-allow-overlap": true,
                "text-ignore-placement": true,
            },
            paint: {
                "text-color": "white",
                "text-halo-blur": 1,
                "text-halo-width": 2,

                "text-halo-color": "black",
            },
        });
    }
}

// 交通事件热力图
 function addOrUpdateEventHeat(map, geo, callback) {
    console.log(geo, 7777777777777777777);
    if (!map.getSource("eventHeat")) {
        map.addSource("eventHeat", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("eventHeat").setData(geo);
    }
    if (!map.getLayer("eventHeat")) {
        map.addLayer({
            id: "eventHeat",
            type: "heatmap",
            source: "eventHeat",
            paint: {
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0,
                    "rgba(38, 233, 251,0.0)",
                    0.1,
                    "rgba(38, 233, 251,0.2)", // 低密度的颜色
                    0.2,
                    "rgba(36, 239, 219,0.7)",
                    0.4,
                    "rgba(83, 231, 169,0.8)",
                    0.6,
                    "rgba(190, 236, 68,0.9)",
                    0.8,
                    "rgba(252, 145, 3,0.9)",
                    1,
                    "rgba(253, 108, 3,1)", // 高密度的颜色
                ],
            },
        });
        if (map.getLayer("vehicle3D")) {
            map.moveLayer("eventHeat", "vehicle3D");
        }
    }
}

// 交通事件点图
 function addOrUpdateEventPoint(map, geo, callback) {
    if (!map.getSource("eventPoint")) {
        map.addSource("eventPoint", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("eventPoint").setData(geo);
    }
    if (!map.getLayer("eventPoint")) {
        map.addLayer({
            id: "eventPoint",
            type: "symbol",
            source: "eventPoint",
            layout: {
                "icon-image": "event",
                "icon-size": 1,
                "icon-offset": [0, -10],
            },
        });
        map.on("click", "eventPoint", (aaa) => callback(aaa));
    }
}

// 相机设备
 function addOrUpdateEquipCamera(map, geo, callback) {
    if (!map.getSource("camera")) {
        console.log("addsource");
        map.addSource("camera", {
            type: "geojson",
            data: geo,
        });
    } else {
        console.log("setData");
        map.getSource("camera").setData(geo);
    }
    if (!map.getLayer("camera")) {
        console.log("addLayer");
        map.addLayer({
            id: "camera",
            type: "symbol",
            source: "camera",
            layout: {
                "icon-image": [
                    "match",
                    ["get", "status"], // 属性字段名称
                    '0',
                    "cameraFalse",
                    '1',
                    'camera',
                    "cameraFalse",
                ], // 默认值，如果没有匹配到上述枚举值]
                // "icon-image": "camera",
                "icon-size": 0.6,
                "icon-ignore-placement": true,
                // 'icon-offset': [0, -10]
            },
        });
        // map.on("click", "camera", (aaa) => callback(aaa, "camera"));
    }
}

// 设备...
 function addOrUpdateEquipMilli(map, geo, callback) {
    if (!map.getSource("milli")) {
        map.addSource("milli", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("milli").setData(geo);
    }
    if (!map.getLayer("milli")) {
        map.addLayer({
            id: "milli",
            type: "symbol",
            source: "milli",
            layout: {
                "icon-image": [
                    "match",
                    ["get", "status"], // 属性字段名称
                    '0',
                    "milliFalse",
                    '1',
                    'milli',
                    "milliFalse",
                ], // 默认值，如果没有匹配到上述枚举值]
                // "icon-image": "milli",
                "icon-size": 0.6,
                "icon-ignore-placement": true,
            },
        });
        // map.on("click", "milli", (aaa) => callback(aaa, "milli"));
    }
}

 function addOrUpdateEquipRadar(map, geo, callback) {
    if (!map.getSource("radar")) {
        map.addSource("radar", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("radar").setData(geo);
    }
    if (!map.getLayer("radar")) {
        map.addLayer({
            id: "radar",
            type: "symbol",
            source: "radar",
            layout: {
                "icon-image": [
                    "match",
                    ["get", "status"], // 属性字段名称
                    '0',
                    "radarFalse",
                    '1',
                    'radar',
                    "radarFalse",
                ], // 默认值，如果没有匹配到上述枚举值]
                // "icon-image": "radar",
                "icon-size": 0.6,
                "icon-ignore-placement": true,
            },
        });
        // map.on("click", "radar", (aaa) => callback(aaa, "radar"));
    }
}

 function addOrUpdateEquipSignal(map, geo, callback) {
    if (!map.getSource("signal")) {
        map.addSource("signal", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("signal").setData(geo);
    }
    if (!map.getLayer("signal")) {
        map.addLayer({
            id: "signal",
            type: "symbol",
            source: "signal",
            layout: {
                // "icon-image": "signal",
                "icon-image": [
                    "match",
                    ["get", "status"], // 属性字段名称
                    '0',
                    "signalFalse",
                    '1',
                    'signal',
                    "signalFalse",
                ], // 默认值，如果没有匹配到上述枚举值]
                "icon-size": 0.6,
                "icon-ignore-placement": true,
            },
        });
        // map.on("click", "signal", (aaa) => callback(aaa, "signal"));
    }
}

 function addOrUpdateEquipWeather(map, geo, callback) {
    if (!map.getSource("weather")) {
        map.addSource("weather", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("weather").setData(geo);
    }
    if (!map.getLayer("weather")) {
        map.addLayer({
            id: "weather",
            type: "symbol",
            source: "weather",
            layout: {
                // "icon-image": "weather",
                "icon-image": [
                    "match",
                    ["get", "status"], // 属性字段名称
                    '0',
                    "weatherFalse",
                    '1',
                    'weather',
                    "weatherFalse",
                ], // 默认值，如果没有匹配到上述枚举值]
                "icon-size": 0.6,
                "icon-ignore-placement": true,
            },
        });
        // map.on("click", "weather", (aaa) => callback(aaa, "weather"));
    }
}

// 车牌号及其背景图片
 function addOrUpdateLicense(map, geo) {
    if (!map.getSource("license")) {
        map.addSource("license", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("license").setData(geo);
    }
    if (!map.getLayer("licenseBack")) {
        map.addLayer({
            id: "licenseBack",
            type: "symbol",
            source: "license",
            layout: {
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
                "icon-size": 0.4,
                "icon-image": ["concat", "license", ["get", "licenseColor"]],
                "icon-offset": [0, -80],
            },
            paint: {
                // 'icon-translate': [-80, 0],
                // 'icon-translate-anchor': 'viewport'
            },
        });
    }
    if (!map.getLayer("license")) {
        map.addLayer({
            id: "license",
            type: "symbol",
            source: "license",
            layout: {
                "text-field": ["get", "picLicense"],
                "text-size": 10,
                "text-offset": [0, -3.5],
                "text-allow-overlap": true,
                "text-ignore-placement": true,
            },
            paint: {
                "text-color": "white",
                "text-halo-width": 0.3,
                "text-halo-color": "white",
            },
        });
    }
}

// 中间层级车辆图片图层
 function addOrUpdateVehiclePic(map, geo) {
    if (!map.getSource("vehiclePic")) {
        map.addSource("vehiclePic", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("vehiclePic").setData(geo);
    }
    if (!map.getLayer("vehiclePic")) {
        map.addLayer(
            {
                id: "vehiclePic",
                type: "symbol",
                source: "vehiclePic",
                layout: {
                    "icon-allow-overlap": true,
                    "icon-ignore-placement": true,
                    "icon-size": 0.2,
                    "icon-image": ["concat", "car", ["get", "originalType"]],
                    "icon-pitch-alignment": "map",
                    "icon-rotate": ["get", "courseAngle"],
                    "icon-rotation-alignment": "map",
                    // 'icon-offset': [0, -20]
                },
            },
            "vehicle3D"
        );
    }
}

// 车道面
 function addOrUpdateRoadPolygon(map, geo, callback) {
    if (!map.getSource("roadPolygon")) {
        map.addSource("roadPolygon", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("roadPolygon").setData(geo);
    }
    if (!map.getLayer("roadPolygon")) {
        map.addLayer(
            {
                id: "roadPolygon",
                type: "fill",
                source: "roadPolygon",
                paint: {
                    "fill-color": [
                        "match",
                        ["get", "select"], // 属性字段名称
                        0,
                        "rgba(114, 186, 190,0.4)",
                        1,
                        // "rgba(114, 186, 190,0.8)",
                        'rgba(213, 44, 54,0.8)',
                        "rgba(255,255,255,1)",
                    ], // 默认值，如果没有匹配到上述枚举值]
                },
            }
            // "vehicle3D"
        );
        // map.on("click", "roadPolygon", (aaa) => callback(aaa));
    }
}

// 轨迹点集合 vector图层
 function addOrUpdateTrackPointVector(map, startTime, endTime, crossId) {
    if (!map.getSource("myMVTLayer")) {
        map.addSource("myMVTLayer", {
            type: "vector",
            tiles: [
                `${map_config.MVT_TILEURL}/holo/histrory-track/tile?z={z}&x={x}&y={y}&startTime=${startTime}&endTime=${endTime}&crossId=${crossId}`,
            ],
        });
    }
    if (!map.getLayer("myMVTLayer")) {
        map.addLayer({
            id: "myMVTLayer",
            type: "circle",
            source: "myMVTLayer",
            "source-layer": "track-point",
            paint: {
                "circle-color": "#00fff1",
                "circle-radius": 1,
            },
        });
    }
}

// 组织评价 - 流量线
 function addOrUpdateFlowLine(map, geo) {
    if (!map.getSource("flowLine")) {
        map.addSource("flowLine", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("flowLine").setData(geo);
    }
    if (!map.getLayer("flowLine")) {
        map.addLayer({
            id: "flowLine",
            type: "line",
            source: "flowLine",
            paint: {
                "line-color": [
                    "match",
                    ["get", "select"], // 属性字段名称
                    1,
                    "rgba(152, 234, 35, 1)",
                    0,
                    "rgba(1,1,1,0)",
                    "rgba(1,1,1,0)", // 默认值，如果没有匹配到上述枚举值
                ],
                "line-width": 2,
            },
        });
    }
}

// 分析报告 - 流量线
 function addOrUpdateFlowLineR(map, geo) {
    if (!map.getSource("flowLineR")) {
        map.addSource("flowLineR", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("flowLineR").setData(geo);
    }
    if (!map.getLayer("flowLineR")) {
        map.addLayer({
            id: "flowLineR",
            type: "line",
            source: "flowLineR",
            paint: {
                // 'line-color':'rgba(152, 234, 35, 1)',
                "line-color": [
                    "match",
                    ["get", "ridDir"], // 属性字段名称
                    1,
                    "#d10401",
                    2,
                    "#d10401",
                    3,
                    "#08a24d",
                    4,
                    "#08a24d",
                    5,
                    "#5440b8",
                    6,
                    "#5440b8",
                    7,
                    "#f37c0b",
                    8,
                    "#f37c0b",
                    "rgba(1,1,1,0)", // 默认值，如果没有匹配到上述枚举值
                ],
                "line-width": 4,
            },
        });
    }
}

// 分析报告 - 流量值
 function addOrUpdateFlowLineRText(map, geo) {
    if (!map.getSource("flowLineRText")) {
        map.addSource("flowLineRText", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("flowLineRText").setData(geo);
    }
    if (!map.getLayer("flowLineRText")) {
        map.addLayer({
            id: "flowLineRText",
            type: "symbol",
            source: "flowLineRText",
            layout: {
                "text-field": ["get", "flowVal"],
                "text-allow-overlap": true,
                "text-ignore-placement": true,
                "text-size": 12,
            },
            paint: {
                "text-color": "rgba(255, 225, 0, 1)",
                "text-halo-color": "black",
                "text-halo-width": 2,
            },
        });
    }
}

// 分析报告 - 流量线箭头
 function addOrUpdateFlowLineRArrow(map, points) {
    if (!map.getSource("flowLineArrowR")) {
        map.addSource('flowLineArrowR', {
            type: 'geojson',
            data: points
        });
    } else {
        map.getSource("flowLineArrowR").setData(points);
    }
    if (!map.getLayer("flowLineArrowR")) {
        // console.log('has.............');
        if (!map.hasImage('arrowIcon1')) {
            const arrowIcons = [];
            // Create a triangle icon (arrow) with a specified color
            // const arrowIcon0 = createTriangleIcon("#d10401");
            const arrowIcon0 = createTriangleIcon("yellow");
            const arrowIcon1 = createTriangleIcon("#08a24d");
            const arrowIcon2 = createTriangleIcon("#5440b8");
            const arrowIcon3 = createTriangleIcon("#f37c0b");
            arrowIcons.push(arrowIcon0, arrowIcon2, arrowIcon3, arrowIcon1);
            for (let i = 0; i < arrowIcons.length; i++) {
                map.loadImage(arrowIcons[i], (error, image) => {
                    if (error) throw error;
                    map.addImage(`arrowIcon${i}`, image)
                })
            }
        }
        map.addLayer({
            id: 'flowLineArrowR',
            type: 'symbol',
            source: 'flowLineArrowR',
            layout: {
                // 'icon-image': [
                //     "match",
                //     ["get", "ridDir"], // 属性字段名称
                //     1,
                //     "arrowIcon0",
                //     2,
                //     "arrowIcon0",
                //     3,
                //     "arrowIcon1",
                //     4,
                //     "arrowIcon1",
                //     5,
                //     "arrowIcon2",
                //     6,
                //     "arrowIcon2",
                //     7,
                //     "arrowIcon3",
                //     8,
                //     "arrowIcon3",
                //     "arrowIcon1",
                // ],
                'icon-image': 'arrowIcon0',
                'icon-size': 0.5, // Adjust the size of the arrow
                'icon-rotation-alignment': 'map',
                'icon-rotate': ['get', 'bearing'], // Rotate the arrow based on bearing
            },
        });
    }
}

// 组织评价 - 流量线箭头
 function addOrUpdateFlowLineArrow(map, json) {
    let features = [];
    for (let item of json) {
        if (item.select) {
            let angle = turf.bearing(
                turf.point(item.lineArray[0]),
                turf.point(item.lineArray[1])
            );
            features.push(
                turf.point([item.endLng, item.endLat], { ...item, angle: angle })
            );
        }
    }
    let geo = turf.featureCollection(features);
    if (!map.getSource("flowLineArrow")) {
        map.addSource("flowLineArrow", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("flowLineArrow").setData(geo);
    }
    if (!map.getLayer("flowLineArrow")) {
        map.addLayer({
            id: "flowLineArrow",
            type: "symbol",
            source: "flowLineArrow",
            layout: {
                "icon-image": "lineArrow",
                "icon-rotate": ["get", "angle"],
                "icon-ignore-placement": true,
                "icon-allow-overlap": true,
                "icon-pitch-alignment": "map",
                "icon-rotation-alignment": "map",
                "icon-size": 0.5,
            },
        });
    }
}

// 流量存在分流 一个起始值对应多个分流末尾

// 组织评价 - 流量值（起始
 function addOrUpdateFlowText(map, json) {
    let features = [];
    for (let item of json) {
        if (item.select) {
            features.push(turf.point([item.startLng, item.startLat], item));
        }
    }
    let geo = turf.featureCollection(features);
    if (!map.getSource("flowText")) {
        map.addSource("flowText", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("flowText").setData(geo);
    }
    if (!map.getLayer("flowText")) {
        map.addLayer({
            id: "flowText",
            type: "symbol",
            source: "flowText",
            layout: {
                "text-field": ["get", "flow"],
                "text-allow-overlap": true,
                "text-ignore-placement": true,
                "text-size": 12,
            },
            paint: {
                "text-color": "rgba(255, 225, 0, 1)",
                "text-halo-color": "black",
                "text-halo-width": 2,
            },
        });
    }
}

// 组织评价 - 流量值（结束
 function addOrUpdateFlowTextEnd(map, json) {
    let features = [];
    for (let item of json) {
        if (item.select) {
            features.push(turf.point([item.endLng, item.endLat], item));
        }
    }
    let geo = turf.featureCollection(features);
    if (!map.getSource("flowTextEnd")) {
        map.addSource("flowTextEnd", {
            type: "geojson",
            data: geo,
        });
    } else {
        map.getSource("flowTextEnd").setData(geo);
    }
    if (!map.getLayer("flowTextEnd")) {
        map.addLayer({
            id: "flowTextEnd",
            type: "symbol",
            source: "flowTextEnd",
            layout: {
                "text-field": ["get", "endFlow"],
                "text-allow-overlap": true,
                "text-ignore-placement": true,
                "text-size": 12,
            },
            paint: {
                "text-color": "rgba(255, 225, 0, 1)",
                "text-halo-color": "black",
                "text-halo-width": 2,
            },
        });
    }
}
// let roadLineGeo = null, roadChunkPointGeo = null
//  function addCalibrationTail(map) {
// 	// 计算1米在当前地图的经度度数
// 	if (!map.getSource("calibrationTail") && !map.getSource("chunkPointGeo")) {
// 		getRoadLines().then(res => {
// 			console.log(res, 111111111111111111111111);

// 			// let lineStringFeature = turf.lineString([map_config.MAP_CENTER, [113.96364, 28.18825]]) // 线feature
// 			// let lineFeatures = [lineStringFeature]
// 			// roadLineGeo = turf.featureCollection(lineFeatures)
// 			// let chunkLineGeo = turf.lineChunk(lineStringFeature, 0.001, { units: 'kilometers' }); // chunk线geo 1m
// 			// let chunkPointFeatures = []
// 			// for (let i = 0; i < chunkLineGeo.features.length; i++) {
// 			// 	let bearing = turf.bearing(
// 			// 		turf.point(chunkLineGeo.features[i].geometry.coordinates[0]),
// 			// 		turf.point(chunkLineGeo.features[i].geometry.coordinates[1])
// 			// 	);
// 			// 	chunkPointFeatures.push(
// 			// 		turf.point(chunkLineGeo.features[i].geometry.coordinates[0], { index: i, angle: bearing })
// 			// 	)
// 			// }
// 			// roadChunkPointGeo = turf.featureCollection(chunkPointFeatures)

// 			let chunkPointFeatures = []
// 			let lineFeatures = []
// 			for (let multiLineString of res.content) {
// 				let currentMultiLineGeo = JSON.parse(multiLineString.geom)
// 				for (let line of currentMultiLineGeo.coordinates) {
// 					let singleLineFeature = turf.lineString(line.reverse())
// 					lineFeatures.push(singleLineFeature)
// 					let singleLineChunkGeo = turf.lineChunk(singleLineFeature, 0.001, { units: 'kilometers' })
// 					for (let i = 0; i < singleLineChunkGeo.features.length; i++) {
// 						let bearing = turf.bearing(
// 							turf.point(singleLineChunkGeo.features[i].geometry.coordinates[0]),
// 							turf.point(singleLineChunkGeo.features[i].geometry.coordinates[1])
// 						);
// 						chunkPointFeatures.push(
// 							turf.point(singleLineChunkGeo.features[i].geometry.coordinates[0], { index: i, angle: bearing })
// 						)
// 					}
// 				}
// 			}
// 			roadChunkPointGeo = turf.featureCollection(chunkPointFeatures)
// 			roadLineGeo = turf.featureCollection(lineFeatures)
// 			console.log('roadLineGeo', roadLineGeo);
// 			console.log('roadChunkPointGeo', roadChunkPointGeo);
// 			map.addSource("calibrationTail", {
// 				type: "geojson",
// 				data: roadLineGeo,
// 			});
// 			map.addSource("chunkPointGeo", {
// 				type: "geojson",
// 				data: roadChunkPointGeo,
// 			});
// 		})
// 	} else {
// 		map.getSource("calibrationTail").setData(roadLineGeo, { diff: true });
// 		map.getSource("chunkPointGeo").setData(roadChunkPointGeo, { diff: true });
// 	}
// 	// 线条
// 	if (!map.getLayer("calibrationTailLine")) {
// 		map.addLayer(
// 			{
// 				id: "calibrationTailLine",
// 				type: "line",
// 				source: "calibrationTail",
// 				paint: {
// 					'line-color': 'yellow',
// 					'line-width': 1,
// 				}
// 			}
// 		);
// 	}
// 	// symbol标记
// 	if (!map.getLayer("chunkSymbol")) {
// 		map.addLayer(
// 			{
// 				id: "chunkSymbol",
// 				type: "symbol",
// 				source: "chunkPointGeo",
// 				layout: {
// 					'text-allow-overlap': true,
// 					'text-ignore-placement': true,
// 					'text-field': '|', // 刻度线的文本标记，可以用符号代替
// 					'text-size': 12,
// 					'text-pitch-alignment': 'map',
// 					'text-rotate': ['-', ['get', 'angle'], 90],
// 					'text-rotation-alignment': 'map'
// 				},
// 				paint: {
// 					'text-color': 'yellow',
// 				},
// 			}
// 		);
// 	}
// 	// text chunk 文本
// 	if (!map.getLayer('chunkText')) {
// 		// 添加刻度点编号图层
// 		map.addLayer({
// 			id: 'chunkText',
// 			type: 'symbol',
// 			source: 'chunkPointGeo',
// 			layout: {
// 				'text-allow-overlap': true,
// 				'text-ignore-placement': true,

// 				'text-field': ['get', 'index'],

// 				'text-size': 10,
// 				// 'text-offset': [0, 2], // 调整文本位置
// 				'text-offset': [2, 0], // 调整文本位置
// 				'text-pitch-alignment': 'map',
// 				'text-rotate': ['-', ['get', 'angle'], 0],
// 				'text-rotation-alignment': 'map'
// 			},
// 			paint: {
// 				'text-color': 'yellow',
// 				'text-halo-color': 'black',
// 				'text-halo-width': 2,
// 			},
// 		});
// 	}
// }

 function addCalibrationTail(map) {
    let roadLineGeo, roadChunkPointGeo;
    let a = new Promise((resolve) => {
        if (!map.getSource("calibrationTail") && !map.getSource("chunkPointGeo")) {
            fetch("roadLineChunk.json").then((res) => {
                console.log("res...", res);
                res.json().then((data) => {
                    console.log("data...", data);
                    roadLineGeo = data.roadLineGeo;
                    roadChunkPointGeo = data.roadChunkPointGeo;
                    map.addSource("calibrationTail", {
                        type: "geojson",
                        data: roadLineGeo,
                    });
                    map.addSource("chunkPointGeo", {
                        type: "geojson",
                        data: roadChunkPointGeo,
                    });
                    resolve();
                });
            });
        } else {
            map.getSource("calibrationTail").setData(roadLineGeo);
            map.getSource("chunkPointGeo").setData(roadChunkPointGeo);
            resolve();
        }
    });
    a.then(() => {
        // 线条
        if (!map.getLayer("calibrationTailLine")) {
            map.addLayer({
                id: "calibrationTailLine",
                type: "line",
                source: "calibrationTail",
                paint: {
                    "line-color": "yellow",
                    "line-width": 1,
                },
            });
            if (map.getLayer("vehicle3D")) {
                map.moveLayer("calibrationTailLine", "vehicle3D");
            }
        }
        // symbol标记
        if (!map.getLayer("chunkSymbol")) {
            map.addLayer({
                id: "chunkSymbol",
                type: "symbol",
                source: "chunkPointGeo",
                layout: {
                    "text-allow-overlap": true,
                    "text-ignore-placement": true,
                    "text-field": "|", // 刻度线的文本标记，可以用符号代替
                    "text-size": 12,
                    "text-pitch-alignment": "map",
                    "text-rotate": ["-", ["get", "angle"], 90],
                    "text-rotation-alignment": "map",
                },
                paint: {
                    "text-color": "yellow",
                },
            });
            if (map.getLayer("vehicle3D")) {
                map.moveLayer("chunkSymbol", "vehicle3D");
            }
        }
        // text chunk 文本
        if (!map.getLayer("chunkText")) {
            // 添加刻度点编号图层
            map.addLayer({
                id: "chunkText",
                type: "symbol",
                source: "chunkPointGeo",
                layout: {
                    "text-allow-overlap": true,
                    "text-ignore-placement": true,

                    "text-field": ["get", "index"],

                    "text-size": 10,
                    // 'text-offset': [0, 2], // 调整文本位置
                    "text-offset": [-2, 0], // 调整文本位置
                    "text-pitch-alignment": "map",
                    "text-rotate": ["-", ["get", "angle"], 0],
                    "text-rotation-alignment": "map",
                },
                paint: {
                    "text-color": "yellow",
                    "text-halo-color": "black",
                    "text-halo-width": 2,
                },
            });
            if (map.getLayer("vehicle3D")) {
                map.moveLayer("chunkText", "vehicle3D");
            }
        }
    });
}

const size = 1000;
 const vehicleWave = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4), // 用来存储图像数据
    onAdd: function () {
        // 创建一个canvas对象并初始化
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
    },
    // render 不断调用更新canvas对象的半径与fillStyle 以实现波纹效果
    render: function () {
        const duration = 1000; // 动画周期
        const t = (performance.now() % duration) / duration; // 当前帧相对于动画周期的时间比例
        const outerRadius = (size / 2) * 0.7 * t;
        const context = this.context;
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(252, 1, 26, ${1 - t})`;
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        this.data = context.getImageData(0, 0, this.width, this.height).data;
        map.triggerRepaint();
        return true;
    },
};
