---
title: Search
permalink: /search/index.html
description: 'Search Me'
layout: page
---
<script type="module" src="/asstes/scripts/pagefind-search.js"></script>

<pagefind-search>
	<!-- Fallback to DuckDuckGo search -->
	<form action="https://duckduckgo.com/" method="get" style="min-height: 3.2em;"><!-- min-height to reduce CLS -->
		<label>
			Search for:
			<input type="search" name="q" autocomplete="off" autofocus>
		</label>
		<!-- Put your searchable domain here -->
		<input type="hidden" name="sites" value="paulapplegate.com">
		<button type="submit">Search</button>
	</form>
</pagefind-search>