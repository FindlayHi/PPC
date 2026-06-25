import Image from "@11ty/eleventy-img";
import path from "path";

async function imageShortcode(src, alt, cls = "w-full h-full object-cover", sizes = "100vw") {
  const fullSrc = path.join("src", src);
  const metadata = await Image(fullSrc, {
    widths: [640, 960, 1280, 1920],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: cls,
  };

  return Image.generateHTML(metadata, imageAttributes);
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addWatchTarget("_site/css/styles.css");

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
