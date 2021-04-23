module.exports = {
    plugins: {
        "posthtml-expressions": {
            locals: {
                title: "Designer Developer",
                buttons: {
                    contact: "Contact",
                },
                projectReferences: [
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./design-process.html",
                        thumbnails: {
                            t1: "./assets/images/sample-1.jpg",
                            t2: "./assets/images/sample-2.jpg",
                            t3: "./assets/images/sample-1.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-2.jpg",
                            t2: "./assets/images/sample-1.jpg",
                            t3: "./assets/images/sample-2.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-1.jpg",
                            t2: "./assets/images/sample-2.jpg",
                            t3: "./assets/images/sample-1.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-2.jpg",
                            t2: "./assets/images/sample-1.jpg",
                            t3: "./assets/images/sample-2.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-1.jpg",
                            t2: "./assets/images/sample-2.jpg",
                            t3: "./assets/images/sample-1.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-2.jpg",
                            t2: "./assets/images/sample-1.jpg",
                            t3: "./assets/images/sample-2.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-1.jpg",
                            t2: "./assets/images/sample-2.jpg",
                            t3: "./assets/images/sample-1.jpg",
                        },
                    },
                    {
                        name: "FA",
                        year: "2020",
                        fullname: "FA Homes",
                        description: "Brand Identity, Visual Design, Web and Application Design",
                        link: "./index.html",
                        thumbnails: {
                            t1: "./assets/images/sample-2.jpg",
                            t2: "./assets/images/sample-1.jpg",
                            t3: "./assets/images/sample-2.jpg",
                        },
                    },
                ],
                homeIntro: {
                    greeting: "Hello",
                    title: "I am an Interactive Designer and a Creative Developer, based in New Delhi, India",
                    availability: "I am available to work remotely at any time zone from April 2021",
                },
                homeWork: {
                    position: (index) => (index % 2 === 0 ? "m-work__item--left" : "m-work__item--right"),
                },
                caseStudy: {
                    FA: {
                        introduction: {
                            name: "FA",
                            fullname: "FA Homes",
                            deliverables: "Brand Identity, Visual Design, Web and Application Design",
                            deliveryDate: "",
                            thumbnails: {
                                t1: "./assets/images/sample-1.jpg",
                                t2: "./assets/images/sample-2.jpg",
                                t3: "./assets/images/sample-1.jpg",
                            },
                            information: "2020",
                            process: "2020",
                            myRole: "2020",
                            credits: "2020",
                        },
                        brief: {
                            challenge: "",
                            description: "",
                        },
                        finalDesign: {},
                    },
                },
                designProcess: {
                    title: "Design Process",
                },
            },
        },
    },
};
