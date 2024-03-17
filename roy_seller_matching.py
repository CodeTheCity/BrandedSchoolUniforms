import json

from Levenshtein import distance as levenshtein_distance

with open("branded_items_searchable.json", "r") as file:
    school_branded_items = json.load(file)

with open("asda_product.json", "r") as file:
    asda_product = json.load(file)

product_title_list = []
for product in asda_product:
    product_title_list.append(product["product_title"])


def find_closest_match_index(special_item, generic_list):
    ld_list = [
        levenshtein_distance(special_item, generic_item) / len(generic_item)
        for generic_item in generic_list
    ]
    penalty = 0.5
    for i, generic_item in enumerate(generic_list):
        for keyword in special_item.split(" "):
            if keyword.lower() not in generic_item.lower():
                # print(generic_item)
                ld_list[i] += penalty

    best_match_index = ld_list.index(min(ld_list))

    return best_match_index


website = "https://direct.asda.com"
for school_id, school in enumerate(school_branded_items):
    items_per_school = {}
    school_name = school["school_name"]
    product_list = school["product_list"]
    for product_id, product in enumerate(product_list):
        product_name = product["product_name"]
        school_product_price = product["product_price"]
        closest_id = find_closest_match_index(product_name, product_title_list)
        closest_url = website + asda_product[closest_id]["product_link"]
        closest_img = asda_product[closest_id]["product_image_src"]
        try:
            closest_price = asda_product[closest_id]["product_price"][1:]
        except:
            closest_price = 0
        try:
            price_difference = round(
                (float(school_product_price) - float(closest_price))
                / float(school_product_price)
                * 100,
                2,
            )
        except:
            price_difference = 0

        school_branded_items[school_id]["product_list"][product_id][
            "closest_product_name"
        ] = asda_product[closest_id]["product_title"]
        school_branded_items[school_id]["product_list"][product_id][
            "closest_product_price"
        ] = closest_price
        school_branded_items[school_id]["product_list"][product_id][
            "closest_product_img_src"
        ] = closest_img
        school_branded_items[school_id]["product_list"][product_id][
            "closest_product_url"
        ] = closest_url
        school_branded_items[school_id]["product_list"][product_id][
            "price_difference"
        ] = price_difference

with open("price_match_directory.json", "w") as file:
    json.dump(school_branded_items, file)
