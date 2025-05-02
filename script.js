const apiKey = 'd1e3882738a70c98fea37918b4542282';

// Show the loading spinner
document.getElementById('loading-spinner').style.display = 'block';

// Function to fetch news based on selected country and category
function fetchNews() {
  const country = document.getElementById('country').value;
  const category = document.getElementById('category').value;

  // Fetch headlines from GNews with the selected country, category, and language set to English
  fetch(`https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&apikey=${apiKey}&lang=en`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the response to check what is returned
      const headlines = data.articles;
      const headlinesContainer = document.getElementById('headlines');
      
      // Hide the loading spinner
      document.getElementById('loading-spinner').style.display = 'none';

      if (!headlines) {
        console.error('No headlines found');
        return;
      }

      headlinesContainer.innerHTML = ''; // Clear previous headlines

      headlines.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        
        const title = document.createElement('h3');
        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.innerText = article.title;
        
        const description = document.createElement('p');
        description.innerText = article.description ? article.description : 'No description available';
        
        const source = document.createElement('small');
        source.innerText = `Source: ${article.source.name}`;
        
        title.appendChild(link);
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(source);
        
        headlinesContainer.appendChild(articleDiv);
      });
    })
    .catch(error => {
      // Hide the loading spinner if there's an error
      document.getElementById('loading-spinner').style.display = 'none';
      console.error('Error fetching the news:', error);
    });
}

// Fetch news when the page loads
fetchNews();

// Add event listener to fetch news when country or category is changed
document.getElementById('country').addEventListener('change', fetchNews);
document.getElementById('category').addEventListener('change', fetchNews);

// Dark mode toggle functionality
document.getElementById('toggle-dark').addEventListener('click', function() {
  document.body.classList.toggle('dark');
});
