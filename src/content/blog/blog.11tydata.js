module.exports = {
	tags: ["posts"],
	layout: "post.njk",
	permalink: "/blog/{{ title | slugify }}/",
};
