vec2 centerImage(vec2 uv){
    uv=(uv*2.-iResolution.xy)/min(iResolution.x, iResolution.y);
    return uv;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    fragColor=vec4(1.);
}
