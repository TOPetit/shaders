void mainImage( out vec4 O, vec2 u ) {
    vec2 R = iResolution.xy,
         U = (u+u - R ) / R.y;
    O *= 0.;
    
    for ( float l = length(U), d, i = 0.; i < 4.; i++)
        U = fract(U * 1.5) - .5,
        d = length(U) * exp(-l),
        d = pow(abs( .08 / sin(d*8. + iTime) ) , 1.2),
        O += d * ( .5 + .5*cos( 6.28*(l + i*.4 + iTime*.4 +vec4(.26,.42,.56,0) ) ) );
}
