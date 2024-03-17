import json

import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession

# session = HTMLSession()

with open("school_directory.json", "r") as file:
    school_directory = json.load(file)

website = "https://www.border-embroideries.co.uk"

length = len(school_directory)
result_directory = []
for school_id, school in enumerate(school_directory):
    result = {}
    school_name = school["name"]
    school_url = website + school["url"]
    school_logo = school["image"]

    page = requests.get(school_url)

    soup = BeautifulSoup(page.content, "html.parser")

    items = soup.find_all("div", class_="product details product-item-details")

    product_list = []
    for item_id, item in enumerate(items):
        product_instance = {}
        name = item.find("a", class_="product-item-link")
        price = item.find("span", class_="price-wrapper")

        product_instance["product_id"] = str(item_id)
        product_instance["product_name"] = name.text.strip()
        product_instance["product_price"] = price["data-price-amount"]
        product_instance["product_url"] = name["href"]

        product_list.append(product_instance)
    result["school_id"] = str(school_id)
    result["school_name"] = school_name
    result["school_logo"] = school_logo
    result["school_url"] = school_url
    result["product_list"] = product_list

    result_directory.append(result)

    if int(school_id) % 50 == 0:
        print(int(school_id) / length * 100)
        with open("temp.json", "w") as file:
            json.dump(result_directory, file)


"""
URL = "https://www.border-embroideries.co.uk/schools/abberley-preschool.html"
page = requests.get(URL)
# page.html.render()

item_class_names = "item product first-row-item first-sm-item first-xs-item product-item-info product-item col-lg-3 col-md-3 col-sm-4 col-xs-6"


soup = BeautifulSoup(page.content, "html.parser")
items = soup.find_all("div", class_="product details product-item-details")
print(len(items))
for id, item in enumerate(items):
    name = item.find("a", class_="product-item-link")
    price = item.find("span", class_="price-wrapper")

    url = name["href"]
    price = price["data-price-amount"]
    name = name.text

"""
"""
with open("Output.txt", "w") as text_file:
    text_file.write(page.text)
"""
