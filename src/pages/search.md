---
title: Search
permalink: /search/index.html
description: 'Search Me'
layout: page
---
<script type="module" src="/assets/scripts/pagefind-search.js"></script>

<link href=“/pagefind/pagefind-ui.css” rel=“stylesheet”>
<script src=“/pagefind/pagefind-ui.js”></script>
<div id=“search”></div>
<script>
    window.addEventListener(‘DOMContentLoaded’, (event) => {
        new PagefindUI({ element: “#search”, showSubResults: true });
    });
</script>