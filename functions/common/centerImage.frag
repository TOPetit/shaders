vec2 centerImage(vec2 uv){
    uv=(uv*2.-iResolution.xy)/min(iResolution.x, iResolution.y);
    return uv;
}
