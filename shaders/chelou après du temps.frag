vec2 centerImage(vec2 uv){
    uv=(uv*2.-iResolution.xy)/min(iResolution.x, iResolution.y);
    return uv;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    
    vec2 uv=fragCoord;
    uv=centerImage(uv);
    
    float d=cos(10.*iTime*distance(uv,vec2(0.)));
    
    fragColor=vec4(d,d,d,1.);
}
