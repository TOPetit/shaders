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
    uv=(uv*2.-iResolution.xy)/min(iResolution.x, iResolution.y);
    return uv;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{   

    vec2 coord = centerImage(fragCoord);
    vec2 uv = coord;
    uv = 5.*uv;
    uv *= cnoise(uv, 0.)+cnoise(uv+vec2(.3*iTime),1.);
    vec2 triangle = 4. * abs(uv - floor(uv + 0.5));
    // float 
    float c = min(triangle.x, triangle.y) > 0.1 ? 1. : 0.;
    c = distance(vec2(0.), uv) < 0.2 ? 1. : 0.;

    // if (distance(coord, vec2(0.)) < 0.1)
    //     c = 1.;

    c = smoothstep(-1.,1.,(c-.55)/fwidth(c));
    c = coord.x > 0. ? c : 1. - c;
    c = coord.y > 0. ? c : 1. - c;

    fragColor=vec4(c, c, c, 1.);
}

// Auto antialiasing by GregRostami & FabriceNeyret2
// Check out https://www.shadertoy.com/view/wtBBW3 (Same code but easier to read)
// Usage: paste this bit of code at the end of any shader, change the AA value,
//       the higher the AA value, the longer it takes to render.
//       AA = 1 is no antialiasing, AA = 2 is 2x2, AA = 3 is 3x3, etc.

#define mainImage(O,U)                         \
    vec4 T = vec4(0.);                         \
    int AA = 8, x, y;                          \
    float A = float (AA);                      \
    for (x = 0; x < AA; x++) {                 \
        for (y = 0; y < AA; y++) {             \
            mainImage( T, U + vec2(x,y)/A-.5 );\
            O += min(T,1.);                    \
        };                                     \
    };                                         \
    O /= A*A
