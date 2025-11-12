uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
in vec2 v_textureCoordinates;
uniform float snowIntensity;      // 积雪强度 (0.0-1.0)
uniform float snowThreshold;      // 积雪阈值 (0.0-1.0)，控制积雪出现的坡度
uniform float snowEdgeSoftness;   // 积雪边缘柔和度
uniform float snowCoverage;       // 积雪覆盖率 (0.0-1.0)
uniform vec3 lightDirection;      // 光源方向
uniform float snowShininess;      // 积雪光泽度
uniform vec3 snowCenterWC;        // 积雪中心世界坐标
uniform float snowRadius;         // 积雪半径（米）
uniform float noiseFactor;        // 噪声系数，建议0.0031
uniform float snowAltitude;       // 积雪海拔阈值（米）
uniform float snowAltitudeSoftness; // 积雪海拔过渡带宽度（米）

float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float valueNoise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    float u = f.x * f.x * (3.0 - 2.0 * f.x);
    float v = f.y * f.y * (3.0 - 2.0 * f.y);
    return mix(mix(a, b, u), mix(c, d, u), v);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 8; i++) {
        value += amplitude * valueNoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

void main() {
    vec4 color = texture(colorTexture, v_textureCoordinates);

    float depth = czm_unpackDepth(texture(depthTexture, v_textureCoordinates));
    if (depth >= 1.0) {
        out_FragColor = color;
        return;
    }

    vec4 eyeCoordinate4 = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    vec4 positionEC = eyeCoordinate4 / eyeCoordinate4.w;

    vec3 dx = dFdx(positionEC.xyz);
    vec3 dy = dFdy(positionEC.xyz);
    vec3 nor = normalize(cross(dx, dy));

    vec4 positionWC4 = czm_inverseView * positionEC;
    vec3 positionWC = positionWC4.xyz / positionWC4.w;
    vec3 normalWC = normalize(czm_inverseViewRotation * nor);

    vec3 snowDir = vec3(0.0, 1.0, 0.0);
    float dotNumWC = dot(snowDir, normalWC);

    // 坡度影响
    float snowFactor = smoothstep(
    snowThreshold - snowEdgeSoftness * 0.5,
    snowThreshold + snowEdgeSoftness * 0.5,
    dotNumWC
    ) * snowCoverage;

    // 海拔影响
    float heightFactor = smoothstep(
    snowAltitude - snowAltitudeSoftness,
    snowAltitude + snowAltitudeSoftness,
    positionWC.y
    );

    // 坡度和海拔共同决定积雪分布
    float finalSnowFactor = max(snowFactor, heightFactor);

    // 分形噪声控制雪堆分布
    float snowNoise = fbm(positionWC.xz * noiseFactor);
    float snowHeap = smoothstep(0.45, 0.8, snowNoise);

    float finalIntensity = finalSnowFactor * snowHeap * snowIntensity;

    // 光照与高光
    float lightDot = max(dot(normalWC, lightDirection), 0.0);
    float spec = pow(max(dot(normalWC, normalize(lightDirection + snowDir)), 0.0), snowShininess);

    // 雪内部颜色渐变（高光与阴影过渡）
    float slopeFactor = smoothstep(0.0, 1.0, dotNumWC);
    vec3 snowColor = vec3(1., 1., 1.0);
    vec3 highlightSnow = snowColor * (1.0 + 0.5 * spec);
    vec3 shadowColor = mix(snowColor, vec3(0.7, 0.85, 1.0), 1.0 - slopeFactor);// 阴影带蓝色
    vec3 snowWithLight = mix(shadowColor, highlightSnow, slopeFactor-0.2);

    // 判断是否在积雪范围内（带边缘渐变）
    float dist = distance(positionWC, snowCenterWC);
    float mask = smoothstep(snowRadius, snowRadius * 0.8, dist);
    finalIntensity *= mask;

    // 增强雪的不透明度
    finalIntensity = clamp(finalIntensity * 1.5, 0.0, 1.0);

    out_FragColor = mix(color, vec4(snowWithLight, 1.0), finalIntensity);
}


// use start
 let llh = options.llh;
        let cartesian3 = Cesium.Cartesian3.fromDegrees(llh.longitude, llh.latitude, llh.height);
        const snowUniforms = {
            snowIntensity: options.snowIntensity || 0.8,                         // 积雪强度
            snowThreshold: options.snowThreshold || 0.73,                         // 积雪坡度阈值
            snowEdgeSoftness: options.snowEdgeSoftness || 0.09,                      // 边缘柔和度
            snowCoverage: options.snowCoverage || 1.4,                          // 覆盖率
            lightDirection: new Cesium.Cartesian3(0.3, 1.0, 0.5), // 光源方向
            snowShininess: options.snowShininess || 51.0,                      // 光泽度
            snowCenterWC: cartesian3,
            snowRadius: options.snowRadius || 3000.0, // 单位米
            noiseFactor: options.noiseFactor || 0.0023,
            snowAltitudeSoftness: options.snowAltitudeSoftness || 100.0,
            snowAltitude: options.snowAltitude || 2000.0,
        };

        const stage = new Cesium.PostProcessStage({
            fragmentShader: fragmentShaderSource,
            uniforms: snowUniforms,
        })