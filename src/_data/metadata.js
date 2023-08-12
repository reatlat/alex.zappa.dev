module.exports = {
    title: "Alex Zappa",
    url: process.env.URL || "http://localhost:8080",
    language: "en",
    description: "I am writing about my experiences as a naval navel-gazer.",
    openGraph: {
        image: "/default-og-image.png",
        imageAlt: "",
    },
    author: {
        name: "Alex Zappa",
        twitter: "reatlat",
        email: "alex@zappa.dev",
        url: `${process.env.URL || "http://localhost:8080"}/about/`,
    },
};
