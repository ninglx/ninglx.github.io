Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OWE5YzQ2ZS05NDYzLTQ3NTEtYTZhOC0yNDhmMmIyY2I5ZTAiLCJpZCI6MTA0MTAyLCJpYXQiOjE2ODU2MTMxOTB9.JxmgXnf8_-V1eM9we2W8VfiP37vyGMJJDSWF4Br6hKU';
// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate: true,
    // terrainProvider: new Cesium.EllipsoidTerrainProvider({}), // 地形
    contextOptions: {
        requestWebgl2: true
    },
    msaaSamples: 2,
    animation: false, // 隐藏动画控件
    baseLayerPicker: false, // 隐藏图层选择控件
    fullscreenButton: false, // 隐藏全屏按钮
    vrButton: false, // 隐藏VR按钮，默认false
    geocoder: false, // 隐藏地名查找控件
    homeButton: false, // 隐藏Home按钮
    infoBox: false, // 隐藏点击要素之后显示的信息窗口
    sceneModePicker: false, // 隐藏场景模式选择控件
    selectionIndicator: false, // 显示实体对象选择框，默认true
    timeline: true, // 时间线控件
    navigationHelpButton: false, // 隐藏帮助按钮
    scene3DOnly: true, // 每个几何实例将只在3D中呈现，以节省GPU内存
    sceneMode: 3, // 初始场景模式 1：2D 2：2D循环 3：3D，默认3
    requestRenderMode: true, // 减少Cesium渲染新帧总时间并减少Cesium在应用程序中总体CPU使用率
});
viewer.scene.light = new Cesium.DirectionalLight({
    direction: new Cesium.Cartesian3(0.354925, -0.890918, -0.283358),
    intensity: 1,
});
// 以下设置为了使cesium地图鼠标控制符合mapbox习惯
// 鼠标右键旋转
viewer.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.RIGHT_DRAG,
];
// 中键滚动缩放
viewer.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.WHEEL,
];
// 鼠标左键平移
viewer.scene.screenSpaceCameraController.rotateEventTypes = [
    Cesium.CameraEventType.LEFT_DRAG,
];
viewer.scene.globe.enableLighting = true;
viewer.scene.postProcessStages.fxaa.enabled = true

// 流动线条start
// 定义线条的起点和终点
var startPoint = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
var endPoint = Cesium.Cartesian3.fromDegrees(-75.53777, 40.08883);

// 自定义材质
var customMaterial = new Cesium.Material({
    fabric: {
        type: 'CustomArrowFlow',
        uniforms: {
            time: 0,
            arrowSize: 0.1,
            arrowGap: 0.2,
            arrowColor: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            lineColor: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
        },
        source: `
                    uniform float time;
                    uniform float arrowSize;
                    uniform float arrowGap;
                    uniform vec4 arrowColor;
                    uniform vec4 lineColor;

                    czm_material czm_getMaterial(czm_materialInput materialInput) {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        float distance = st.x;
                        float phase = fract(distance / arrowGap + time);
                        if (phase < arrowSize) {
                            material.diffuse = arrowColor.rgb;
                            material.alpha = arrowColor.a;
                        } else {
                            material.diffuse = lineColor.rgb;
                            material.alpha = lineColor.a;
                        }
                        return material;
                    }
                `
    },
    translucent: false
});

// 创建线条实体
var lineEntity = viewer.entities.add({
    polyline: {
        positions: [startPoint, endPoint],
        width: 10,
        material: customMaterial,
        clampToGround: true
    }
});

// 动画循环
var startTime = Date.now();
function animate() {
    var elapsedTime = (Date.now() - startTime) / 1000;
    customMaterial.uniforms.time = elapsedTime * 0.1;
    viewer.scene.requestRender();
    requestAnimationFrame(animate);
}
animate();
viewer.trackedEntity = lineEntity
// 流动线条end


// let entities = {} // 用来保存entities
// let canvas = viewer.scene.canvas;
// let handler = new Cesium.ScreenSpaceEventHandler(canvas);
// handler.setInputAction(function (lclickment) {
//     let scene = viewer.scene;
//     let ellipsoid = scene.globe.ellipsoid;
//     //let cartesian = LoadCesium.Viewer.camera.pickEllipsoid(lclickment.position, ellipsoid);
//     let cartesian = viewer.scene.pickPosition(lclickment.position);
//     positionPick = cartesian;
//     let pinBuilder = new Cesium.PinBuilder();
//     if (cartesian) {
//         let cartographic = ellipsoid.cartesianToCartographic(cartesian);
//         lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
//         lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
//         //地理高度
//         height1 = (cartographic.height + 1).toFixed(2);
//         //相机高度
//         height = viewer.camera.positionCartographic.height.toFixed(0);
//         //方向   围绕Z轴旋转
//         heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2);
//         //倾斜角度   围绕Y轴旋转
//         pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2);
//         //围绕X轴旋转
//         roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2);
//         console.log(`[${lon},${lat},${height1}]`);
//         console.log('heading:' + heading + ';' + 'pitch:' + pitch + ';' + 'roll:' + roll)
//     }
// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
//
// entities.scene = viewer.entities.add({
//     id: `entity001`,
//     model: {
//         uri: './station.glb',
//         scale: 1,
//         // minimumPixelSize: 128,
//         color: Cesium.Color.fromCssColorString('#fff'),
//     },
// })
// entities.scene.position = Cesium.Cartesian3.fromDegrees(
//     133,
//     22,
//     0
// )
// viewer.zoomTo(entities.scene)
//
// let path = [
//     {location: [133.0386878, 22.0361746, 38.12], angle: 262},
//     {location: [133.0385028, 22.0361512, 38.11], angle: 262},
//     {location: [133.0382878, 22.0361145, 38.09], angle: 262},
//     {location: [133.0381455, 22.0360983, 38.11], angle: 262},
//     {location: [133.0378574, 22.0360555, 38.09], angle: 262},
//     {location: [133.0376871, 22.0360262, 38.08], angle: 262},
//     {location: [133.0375448, 22.0360056, 38.07], angle: 262},
//     {location: [133.0373521, 22.0359712, 38.05], angle: 262},
//     {location: [133.0372766, 22.0359540, 38.05], angle: 262},
//     {location: [133.0371469, 22.0359320, 38.03], angle: 262},
//     {location: [133.0370439, 22.0359174, 38.03], angle: 262},
//     {location: [133.0369039, 22.0359008, 38.02], angle: 262},
// ]
//
// let carEntity = viewer.entities.add({
//     id: `entity002`,
//     model: {
//         uri: './car.gltf',
//         scale: 1,
//         color: Cesium.Color.fromCssColorString('#fff'),
//     },
// })
// let initT = '2000-01-01 00:00:00.000'
// // for (let i = 0; i < path.length; i++) {
// //     updateEntityProperty(carEntity, convertDate(initT, i * 4), path[i].location[0], path[i].location[1], path[i].location[2], path[i].angle);
// // }
// viewer.clock.startTime = Cesium.JulianDate.fromDate(new Date(initT)).clone();
// viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(initT)).clone();
viewer.clock.shouldAnimate = true
// viewer.clock.onTick.addEventListener(() => {
//     // if (viewer.clock.shouldAnimate) {
//     //     if (viewer.trackedEntity) {
//     //         setCameraView(viewer.trackedEntity, 43, 12, -10);
//     //     }
//     // }
// })
// setInterval(() => {
//     viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(initT)).clone();
// }, 10 * 4 * 1000)
// viewer.trackedEntity = carEntity

// 更新输入entity的property
function updateEntityProperty(entity, timestamp, lng, lat, height, angle) {
    let time = Cesium.JulianDate.fromDate(
        new Date(timestamp)
    );
    let position = Cesium.Cartesian3.fromDegrees(
        lng,
        lat,
        height
    );
    if (!entity.position) {
        entity.position = new Cesium.SampledPositionProperty()
    }
    if (!entity.orientation) {
        entity.orientation = new Cesium.VelocityOrientationProperty(entity.position)
    }
    if (!entity.angleProperty) {
        entity.angleProperty = new Cesium.SampledProperty(Number)
    }
    entity.position.addSample(time, position);
    entity.angleProperty.addSample(time, angle)
}

function setCameraView(targetEntity, height, distance, pitch) {
    let position = targetEntity.position?.getValue(viewer.clock.currentTime);
    let angle = targetEntity.angleProperty?.getValue(
        viewer.clock.currentTime
    );
    if (position && angle) {
        let ellipsoid = viewer.scene.globe.ellipsoid;
        let cartographic = ellipsoid.cartesianToCartographic(position); // 笛卡尔坐标 => 经纬度 （弧度表示）
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        let lng = Cesium.Math.toDegrees(cartographic.longitude);
        // 相机position点向车后偏移12米
        let translatedPoint = turf.destination(
            [lng, lat],
            distance,
            Number(angle) - 180,
            {units: "meters"}
        );
        let offsetPoint = translatedPoint.geometry.coordinates;
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(...offsetPoint, height), // 相机高度
            // 相机俯仰姿态 hpr
            orientation: {
                heading: Cesium.Math.toRadians(angle), // east, default value is 0.0 (north)
                pitch: Cesium.Math.toRadians(pitch), // default value (looking down)
                roll: 0,
            },
        });
    }
}

// example：
// 输入 '2021-1-1 10:00:00:000', 20
// 返回 '2021-1-1 10:00:20:000'
function convertDate(date, second) {
    let getTime = new Date(date).getTime()
    let after = new Date(getTime + second * 1000)
    const yy = after.getFullYear()
    const mm = after.getMonth() + 1 < 10 ? '0' + (after.getMonth() + 1) : after.getMonth() + 1
    const dd = after.getDate() < 10 ? '0' + after.getDate() : after.getDate()
    const hh = after.getHours()
    const mf = after.getMinutes() < 10 ? '0' + after.getMinutes() : after.getMinutes()
    const ss = after.getSeconds() < 10 ? '0' + after.getSeconds() : after.getSeconds()
    const ms = after.getMilliseconds()
    return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss + ':' + ms
}

function addCircle() {
    let center = [133, 22]; // 中心点
    let pt = turf.point(center);
    let distance = 50; // 半径
    let circlePoints = [];
    let lineWidth = 3; // 线宽
    let height = 0; // 圆环所在高度
    for (let i = -180; i <= 180; i++) {
        let destination = turf.rhumbDestination(pt, distance, i);
        circlePoints.push(new Cesium.Cartesian3.fromDegrees(destination.geometry.coordinates[0], destination.geometry.coordinates[1], height));
    }
    let polyline = viewer.entities.add({
        polyline: {
            positions: circlePoints,
            width: lineWidth,
            material: Cesium.Color.YELLOW
        }
    });
    viewer.zoomTo(polyline)
}