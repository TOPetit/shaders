//	Classic Perlin 2D Noise
//	by Stefan Gustavson
//
vec2 fade(vec2 t){return t*t*t*(t*(t*6.-15.)+10.);}

vec4 permute(vec4 x,float seed){
    return mod(((x*34.)+1.+seed)*x,289.);
}

float cnoise(vec2 P,float seed){
    vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
    vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
    Pi=mod(Pi,289.);// To avoid truncation effects in permutation
    vec4 ix=Pi.xzxz;
    vec4 iy=Pi.yyww;
    vec4 fx=Pf.xzxz;
    vec4 fy=Pf.yyww;
    vec4 i=permute(permute(ix,seed)+iy,seed);
    vec4 gx=2.*fract(i*.0243902439)-1.;// 1/41 = 0.024...
    vec4 gy=abs(gx)-.5;
    vec4 tx=floor(gx+.5);
    gx=gx-tx;
    vec2 g00=vec2(gx.x,gy.x);
    vec2 g10=vec2(gx.y,gy.y);
    vec2 g01=vec2(gx.z,gy.z);
    vec2 g11=vec2(gx.w,gy.w);
    vec4 norm=1.79284291400159-.85373472095314*
    vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
    g00*=norm.x;
    g01*=norm.y;
    g10*=norm.z;
    g11*=norm.w;
    float n00=dot(g00,vec2(fx.x,fy.x));
    float n10=dot(g10,vec2(fx.y,fy.y));
    float n01=dot(g01,vec2(fx.z,fy.z));
    float n11=dot(g11,vec2(fx.w,fy.w));
    vec2 fade_xy=fade(Pf.xy);
    vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
    float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
    return 2.3*n_xy;
}

vec2 centerImage(vec2 uv){
    if(iResolution.x<iResolution.y){
        uv=(uv*2.-iResolution.xy)/iResolution.x;
    }
    else{
        uv=(uv*2.-iResolution.xy)/iResolution.y;
    }
    return uv;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord.xy;
    uv=2.5*centerImage(uv);
    uv*=cnoise(uv,1.)+cnoise(uv+vec2(.6*iTime),1.);
    
    float d=10.*cos(-.1*iTime+10.*distance(uv,vec2(0.)));
    d=smoothstep(.5,.6,d);
    
    fragColor=vec4(d,d,d,1.);
}
