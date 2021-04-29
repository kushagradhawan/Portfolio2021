module.exports = {
    plugins: {
        "posthtml-include": {},
        "posthtml-expressions": {
            locals: {
                title: "Designer Developer",
                buttons: {
                    contact: "Contact",
                },
                projectReferences: [
                    {
                        name: "FA Homes",
                        year: "2020",
                        fullname: "Fashion Accessories Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./fa-home.html",
                        thumbnails: {
                            t1: "./assets/images/fa/t1.jpg",
                            t2: "./assets/images/fa/t2.jpg",
                            t3: "./assets/images/fa/t3.jpg",
                        },
                    },
                    {
                        name: "Renest",
                        year: "2020",
                        fullname: "Renest Hotels",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/renest/renest-t1.jpg",
                            t2: "./assets/images/renest/renest-t3.jpg",
                            t3: "./assets/images/renest/renest-t2.jpg",
                        },
                    },
                    {
                        name: "Just Jobs",
                        year: "2020",
                        fullname: "Just Jobs Network",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./ui-gallery.html",
                        thumbnails: {
                            t1: "./assets/images/jjn/jjn-t1.jpg",
                            t2: "./assets/images/jjn/jjn-t2.jpg",
                            t3: "./assets/images/jjn/jjn-t3.jpg",
                        },
                    },
                    {
                        name: "ILD",
                        year: "2020",
                        fullname: "ILD Lightning Private Limited",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/ild/ild-t1.jpg",
                            t2: "./assets/images/ild/ild-t2.jpg",
                            t3: "./assets/images/ild/ild-t3.jpg",
                        },
                    },
                    {
                        name: "CSP",
                        year: "2020",
                        fullname: "Capital Square Partners",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/csp/csp-t1.jpg",
                            t2: "./assets/images/csp/csp-t2.jpg",
                            t3: "./assets/images/csp/csp-t3.jpg",
                        },
                    },
                    {
                        name: "Giant Cell",
                        year: "2020",
                        fullname: "Giant Cell Healthcare",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/gc/gc-t1.jpg",
                            t2: "./assets/images/gc/gc-t2.jpg",
                            t3: "./assets/images/gc/gc-t3.jpg",
                        },
                    },
                    {
                        name: "LCMP",
                        year: "2020",
                        fullname: "Low Carbon Mobility Plan",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/lcmp/lcmp-t1.jpg",
                            t2: "./assets/images/lcmp/lcmp-t2.jpg",
                            t3: "./assets/images/lcmp/lcmp-t3.jpg",
                        },
                    },
                    {
                        name: "EUFF",
                        year: "2020",
                        fullname: "European Union Film Festival",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/euff/euff-t1.jpg",
                            t2: "./assets/images/euff/euff-t2.jpg",
                            t3: "./assets/images/euff/euff-t3.jpg",
                        },
                    },
                ],
                homeIntro: {
                    greeting: "Hello",
                    title: "Interactive Designer and a Creative Developer based in India",
                    availability: "I am available to work remotely at any time zone from May 2021",
                    info: `
                    <p>
                    I have 2 years of experience working as the principle experience and interface designer at Wishbox Studio, based in New Delhi, India. I can also code.    
                    </p>
                    <p class="mt4">
                    I am still very new to writing production ready code. I have a bachelors in Engineering. I can code in ThreeJs and WebGL.  
                    </p>                    
                    `,
                },
                homeWork: {
                    title: "Interactive Designer and a Creative Developer based in India",
                    description: "I am available to work remotely at any time zone from April 2021",
                    position: (index) => (index % 2 === 0 ? "m-work__item--left" : "m-work__item--right"),
                },
                caseStudy: {
                    FA: {
                        introduction: {
                            name: "FA Home",
                            fullname: "Fashion Accessories Home",
                            titleIndentation: "" /* in percentage */,
                            deliverables: "Brand Identity, Visual Design, Web and Application Design",
                            deliveryDate: "08.2021",
                            timeline: "From August 2019 to September 2021",
                            thumbnails: {
                                t1: "./assets/images/fa/t2.jpg",
                                t2: "./assets/images/fa/t1.jpg",
                                t3: "./assets/images/fa/t3.jpg",
                            },
                            information: `
                            <p>
                            Fashion Accessories is a manufacturer - exporter of home textiles based in Gurgaon, Haryana (India).   
                            </p>
                            <p class="mt4">
                            Established in the year 2000, it is a partnership firm initiated by people who are pioneers in the clothing and textile industry since the last 30 years.  
                            </p>
                            <p class="mt4">
                            Their website needed a redesign to reflect their ever-evolving brand, and to showcase their latest and greatest work
                            </p>
                            `,
                            process: `
                            <p>
                            Fashion Accessories is a manufacturer - exporter of home textiles based in Gurgaon, Haryana (India).   
                            </p>
                            <p class="mt4">
                            Established in the year 2000, it is a partnership firm initiated by people who are pioneers in the clothing and textile industry since the last 30 years.  
                            </p>
                            `,
                            myRole: "Established in the year 2000, it is a partnership firm initiated by people",
                            credits: "Established in the year 2000, it is a partnership firm initiated by people who are pioneers.",
                        },
                        brief: {
                            challenge: "The challenge of creating a corporate website with no user research",
                            descriptionLeft: `
                            <p>
                            Being the largest producer of films in the world, India is the perfect setting to showcase European cinematic talent.                             
                            </p>
                            <p class="mt4">
                            Since both regions share a very rich cinema-going culture, the European Union Film Festival is a good bridge that brings a diverse range of European cinema to an audience that loves watching movies.                             
                            </p>
                            <p class="mt4">
                            We were approached by the European Union to create the identity and publicize the 24th annual European Film Festival on a pan-Indian scale. The festival was to start in the capital, Delhi, and end in Mumbai, covering a smattering of 9 cities in between.                            </p>
                            `,
                            descriptionRight: `
                            <p>
                            Fashion Accessories is a manufacturer - exporter of home textiles based in Gurgaon, Haryana (India).   
                            </p>
                            <p class="mt4">
                            Established in the year 2000, it is a partnership firm initiated by people who are pioneers in the clothing and textile industry since the last 30 years.  
                            </p>
                            `,
                            image: "./assets/images/sample-1.jpg",
                            imageCaption: "The challenge of creating a corporate website with no user research",
                            imageDescription: "We delivered on Brand Identity, Visual Design, Web and Application Design",
                        },
                        finalDesigns: [
                            {
                                link: "./assets/images/jjn/1.png",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/sample-9.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/sample-1.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/sample-2.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/sample-9.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/jjn/fullpage-1.png",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "fullpage",
                            },
                            {
                                link: "./assets/images/sample-1.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/sample-2.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "desktop",
                            },
                            {
                                link: "./assets/images/sample-9.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "mobile",
                            },
                            {
                                link: "./assets/images/sample-1.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "mobile",
                            },
                            {
                                link: "./assets/images/sample-2.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                                flag: "mobile",
                            },
                        ],
                        wireframes: [
                            {
                                link: "./assets/images/jjn/1.png",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/sample-9.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/sample-1.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/sample-2.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/sample-9.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/jjn/fullpage-1.png",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/sample-1.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                            {
                                link: "./assets/images/sample-2.jpg",
                                caption: "The challenge of creating a corporate website with no user research",
                                description: "We delivered on Brand Identity, Visual Design, Web and Application Design ",
                            },
                        ],
                    },
                },
                designProcess: {
                    title: "Design Process",
                },
                UIGallery: {
                    title: "Gallery",
                    squareImages: [
                        "./assets/images/sample-1.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-5.jpg",
                        "./assets/images/sample-1.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-6.jpg",
                        "./assets/images/sample-1.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-5.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-5.jpg",
                        "./assets/images/sample-6.jpg",
                    ],
                    desktopImages: [
                        "./assets/images/sample-1.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-5.jpg",
                        "./assets/images/sample-6.jpg",
                        "./assets/images/sample-1.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-5.jpg",
                        "./assets/images/sample-6.jpg",
                    ],
                    mobileImages: [
                        "./assets/images/sample-7.jpg",
                        "./assets/images/sample-8.jpg",
                        "./assets/images/sample-1.jpg",
                        "./assets/images/sample-2.jpg",
                        "./assets/images/sample-7.jpg",
                        "./assets/images/sample-8.jpg",
                    ],
                },
            },
        },
    },
};
