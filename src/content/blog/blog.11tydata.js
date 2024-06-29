export default {
    tags: ["posts"],
    layout: "post.njk",
    permalink: "/blog/{{ title | slugify }}/",
};
