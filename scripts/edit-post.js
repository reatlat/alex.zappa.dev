// edit postname and title

// Path: scripts/edit-post.mjs
import {
    readdirSync,
    readFileSync,
    writeFileSync,
    unlinkSync,
    mkdirSync,
} from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import slugify from "slugify";

// Ask the post name to edit from the list of posts

inquirer
    .prompt([
        {
            type: "list",
            name: "year",
            message: "Which year do you want to edit?",
            choices: readdirSync("./src/content/blog", { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name),
        },
    ])
    .then((answers) => {
        const yearSelected = answers.year;

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "post",
                    message: "Which post do you want to edit?",
                    choices: readdirSync(`./src/content/blog/${yearSelected}`, {
                        withFileTypes: true,
                    })
                        .filter((dirent) => dirent.isDirectory())
                        .map((dirent) => dirent.name),
                },
            ])
            .then((answers) => {
                const postSelected = answers.post;
                const currentFilepath = `./src/content/blog/${yearSelected}/${postSelected}/index.md`;

                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the new title for the post?",
                        },
                        {
                            type: "input",
                            name: "date",
                            message:
                                "What is the new date for the post? (yyyy-LL-dd)",
                        },
                    ])
                    .then((answers) => {
                        const newTitle = answers.title;
                        const newSlug = slugify(newTitle, {
                            remove: /[_*+~.()'"!:@]/g,
                            strict: true,
                            lower: true,
                        });
                        const newDate = answers.date;
                        const newYear = newDate.split("-")[0];
                        const newFilepath = `./src/content/blog/${newYear}/${newSlug}/index.md`;

                        const content = readFileSync(currentFilepath, "utf8");
                        const lines = content.split("\n");
                        const title = lines[1].replace("title: ", "");
                        const slug = slugify(title, {
                            remove: /[_*+~.()'"!:@]/g,
                            strict: true,
                            lower: true,
                        });
                        const date = lines[2].replace("date: ", "");

                        const newContent = content
                            .replace(title, newTitle)
                            .replace(slug, newSlug)
                            .replace(date, newDate);

                        mkdirSync(path.dirname(newFilepath), {
                            recursive: true,
                        });
                        writeFileSync(newFilepath, newContent);

                        console.log(chalk.green(`Edited ${newFilepath}`));

                        // remove old file
                        unlinkSync(currentFilepath);
                    });
            });
    });
