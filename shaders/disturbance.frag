vec2 rotation(vec2 uv, float angle) {
    return vec2(cos(angle) * uv.x - sin(angle) * uv.y, sin(angle) * uv.x + cos(angle) * uv.y);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv=(fragCoord.xy*2.-iResolution.xy)/iResolution.y;
    // set circle
    //uv = uv * 2.;
    uv += vec2(4., 4.);
    uv = uv * rotation(uv, 0.2 * iTime);
    float c = fract(5.*abs(pow(cos(uv).x, 2.) + pow(sin(uv.y), 2.) + 0.2 * iTime));
    c = smoothstep(0., 2., c);

    

    fragColor=vec4(1. * sin(3.*c), 0.2 * c, 0.1 * cos(iTime), 1.);
}
