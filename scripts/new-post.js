import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { DateTime } from "luxon";
import slugify from "slugify";

// Ask the name of the new post and create it

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of the new post?",
    },
];

inquirer.prompt(questions).then((answers) => {
    const title = answers.title;
    const slug = slugify(title, {
        remove: /[_*+~.()'"!:@]/g,
        strict: true,
        lower: true,
    });
    const date = DateTime.local().toFormat("yyyy-LL-dd");
    const year = DateTime.local().toFormat("yyyy");
    const filepath = `./src/content/blog/${year}/${slug}/index.md`;

    // Create the directory and file
    mkdirSync(path.dirname(filepath), { recursive: true });
    writeFileSync(
        filepath,
        `---
title: "${title}"
desc: ""
date: ${date}
tags: []
draft: true
---
This is a draft post

`,
    );

    console.log(chalk.green(`Created ${filepath}`));
});
