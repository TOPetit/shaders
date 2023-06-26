// Auto antialiasing by GregRostami & FabriceNeyret2
// Check out https://www.shadertoy.com/view/wtBBW3 (Same code but easier to read)
// Usage: paste this bit of code at the end of any shader, change the AA value,
//       the higher the AA value, the longer it takes to render.
//       AA = 1 is no antialiasing, AA = 2 is 2x2, AA = 3 is 3x3, etc.

#define AA 12
void mainImage(out vec4 fragColor,in vec2 fragCoord) {                
    vec4 T;
    fragColor = vec4(0.);
    float x, y, d = 1./float (AA);
    for (x = 0.; x < 1.; x += d) {
        for (y = 0.; y < 1.; y += d) {
            mainImage0( T, fragCoord + vec2(x,y));
            fragColor += min(abs(T), 1.);
        }
    }
    fragColor *= d*d;
}
