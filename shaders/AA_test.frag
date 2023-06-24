// This uses an idea that was created by Fabrice Neyret's:
// https://www.shadertoy.com/view/WlfyW8 
// It's an improvement to my previous box-filter.
// Add the extra code at the bottom of this shader to any shader to anti-alias it. 
// 
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 r = iResolution.xy,
         u = ( 2.*fragCoord - r ) / r.y;
    float m = 4.* sin(.1*iTime);
	fragColor = vec4 (fract( m / length(u) + atan(u.y,u.x)/3.14 + .3*iTime ));
}


// Add this code to the bottom of any shader to add Anti-aliasing:
// Made a few changes to Fabrice's code:
// Replaced the single for() loop with double for() loops (x,y) - Because it's faster.
// Added min(T,1.0) to guarantee the output is maximum value of vec4(1.0)
// Without the min() function, bright areas do not anti-alias.

#define mainImage(O,U)                         \
    vec4 T = vec4(0.);                         \
    int AA = 16, x, y;                          \
    float A = float (AA);                      \
    for (x = 0; x < AA; x++) {                 \
        for (y = 0; y < AA; y++) {             \
            mainImage( T, U + vec2(x,y)/A-.5 );\
            O += min(T,1.);                    \
        };                                     \
    };                                         \
    O /= A*A
