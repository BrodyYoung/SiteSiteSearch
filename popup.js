document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  function performSearch() {
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentUrl = new URL(tabs[0].url);
      const site = currentUrl.hostname;
      const selectedEngine = document.querySelector('input[name="searchEngine"]:checked').value;
      
      const searchUrls = {
        google: `https://www.google.com/search?q=site:${site} ${keyword}`,
        baidu: `https://www.baidu.com/s?wd=site:${site} ${keyword}`,
        bing: `https://www.bing.com/search?q=site:${site} ${keyword}`
      };

      const searchUrl = searchUrls[selectedEngine];
      chrome.tabs.create({ url: searchUrl });
    });
  }
}); 