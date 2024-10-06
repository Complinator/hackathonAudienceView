import requests
from bs4 import BeautifulSoup

def scrape_pharmacy_products(base_url, search_keyword):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Construct the search URL for Salcobrand
    search_url = f"{base_url}/catalogsearch/result/?q={search_keyword}"
    response = requests.get(search_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find product containers (based on inspecting Salcobrand's HTML)
        products = soup.find_all('li', class_='item product product-item')
        product_data = []

        for product in products:
            # Extract product name and URL
            name = product.find('a', class_='product-item-link').text.strip()
            url = product.find('a', href=True)['href']
            product_data.append({'name': name, 'url': url})

        return product_data
    else:
        return f"Error: Unable to fetch data (Status code: {response.status_code})"
