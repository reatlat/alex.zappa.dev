import nodeHtmlToImage from "node-html-to-image";
import fs from "fs";
import slugify from "slugify";
import chalk from "chalk";

if (!fs.existsSync("./_temp/titles-for-og-images.txt")) {
  console.log(
    chalk.red(
      "File ./_temp/titles-for-og-images.txt does not exist. Please run `npm run build` first."
    )
  );
  process.exit(1);
}

let titles = fs
  .readFileSync("./_temp/titles-for-og-images.txt", "utf8")
  .split("\n");

titles = titles.filter((title) => title !== "");

const bgColors = ["blue", "purple", "marine", "red", "candy"];

const htmlTemplate = `
<html lang="en" style="width: 1200px; height: 630px;">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex,nofollow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{title}}</title>
  <style>
    .card {
      background: #111;
    }
    .blue {
      background: linear-gradient(137.13deg,#030023 -2.05%,#1560d1 81.78%);
    }
    .purple {
      background: linear-gradient(161deg,rgba(255,49,140,.5),rgba(255,49,140,0)),#5233cc;
    }
    .marine {
      background: linear-gradient(161deg, rgba(72, 255, 72, 0.5),rgba(0,255,0,0)), #0080ff;
    }
    .red {
      background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
    }
    .candy {
      background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    }
    h1 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .shadow {
      text-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    .img-shadow {
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body style="width: 1200px; height: 630px; padding: 0; margin: 0; font-family: sans-serif">
  <div class="card {{bgColor}}" style="width: 1200px; height: 630px; box-sizing: border-box; color: #fff; padding: 70px 70px">
    <img class="img-shadow"
         style="border-radius: 999px; border: 4px solid #404040;"
         width="120" height="120"
         src="data:image/jpeg;base64,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"
         alt="Alex Zappa">
    <h1 class="shadow" style="font-size: 72px; font-weight: 700; margin: 20px 0 10px 40px;">{{title}}</h1>
    <p class="shadow" style="margin: 20px 0 0 40px; font-size: 24px; font-weight: 700;">ALEX.ZAPPA.DEV</p>
  </div>
</body>
`;

const getSlug = (title) => {
  return slugify(title.replaceAll(/\//g, " or ").replaceAll(/&amp;/g, "and"), {
    lower: true,
    replacement: "-",
    remove: /[*+~.·,()'"`´%!?¿:@]/g,
  });
};

const generateImage = (title) => {
  title = title.trim().replaceAll(/&amp;/g, "and");
  nodeHtmlToImage({
    output: `./src/public/img/og/${getSlug(title)}.png`,
    content: {
      title: title,
      bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
    },
    html: htmlTemplate,
  }).then(() => {
    console.log(chalk.green(`✅ Generated image for ${title}`));
    // remove first title from array
    titles.shift();
    // if there are still titles left, call generateImage again
    if (titles.length > 0) {
      generateImage(titles[0]);
    }
  });
};

// start the process
generateImage(titles[0]);
