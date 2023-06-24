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
