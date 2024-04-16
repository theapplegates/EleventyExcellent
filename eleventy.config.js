/**
 * Most adjustments must be made in `./src/_config/*`
 */

/**
 * Configures Eleventy with various settings, collections, plugins, filters, shortcodes, and more.
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

import yaml from 'js-yaml';

//  config import
import {getAllPosts, onlyMarkdown, tagList} from './src/_config/collections.js';
import events from './src/_config/events.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import pluginWebc  from '@11ty/eleventy-plugin-webc';
import shortcodes from './src/_config/shortcodes.js';

export default async function (eleventyConfig) {
  // --------------------- layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('blog', 'blog.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');

  //	---------------------  Collections
  eleventyConfig.addCollection('allPosts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_webc/**/*.webc'],
    useTransform: true
  });

  // 	--------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('cssmin', filters.minifyCss);
  eleventyConfig.addNunjucksAsyncFilter('jsmin', filters.minifyJs);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('toAbsoluteUrl', filters.toAbsoluteUrl);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('escapeHtml', filters.escapeHtml);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  
  // --------------------- Pagefind Search
//  eleventyConfig.addShortcode('pagefindSearch', () => `<script type="module" // src="/src/assets/scripts/pagefind-search.js"></script>

// <pagefind-search>
  <!-- Fallback to DuckDuckGo search -->
  // <form action="https://duckduckgo.com/" method="get" style="min-height: 3.2em;"><!-- min-height to reduce CLS -->
    // <label>
      // Search for:
      //<input type="search" name="q" autocomplete="off" autofocus>
    // </label>
    <!-- Put your searchable domain here -->
    // <input type="hidden" name="sites" value="paulapplegate.com">
   // <button type="submit">Search</button>
  // </form>
// </pagefind-search>`);

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // --------------------- Passthrough File Copy
  
  // -- same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  // -- to root  
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  // -- node_modules
  eleventyConfig.addPassthroughCopy({
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/scripts/`
  });

  // --------------------- Build Settings
  eleventyConfig.setDataDeepMerge(true);

  // --------------------- general config
  return {
    htmlTemplateEngine: false,
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',      
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}