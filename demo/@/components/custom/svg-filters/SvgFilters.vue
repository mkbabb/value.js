<template>
    <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
            <filter
                id="watercolor-filter"
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="4"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1.5"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            <!-- Hero-specific watercolor: scaled for native 115px rendering -->
            <filter
                id="watercolor-filter-hero"
                x="-12%"
                y="-12%"
                width="124%"
                height="124%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.022"
                    numOctaves="4"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="2.7"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            <!-- Gooey metaball filter — parameters scaled for 115px hero blob -->
            <filter
                id="gooey-filter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                color-interpolation-filters="sRGB"
            >
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 12 -5"
                    result="goo"
                />
                <feGaussianBlur in="goo" stdDeviation="1" result="goo-smooth" />
                <feBlend in="SourceGraphic" in2="goo-smooth" />
            </filter>
        </defs>
    </svg>
</template>
