import difflib
import json

with open("branded_items.json", "r") as file:
    school_branded_items = json.load(file)


def generate_junk_keywords(junk_keyword_list):  # not needed after string implementation
    junk_list = []
    # concat cases
    for i in range(len(junk_keyword_list) - 1):
        junk_list.append(f"{junk_keyword_list[i]}{junk_keyword_list[i + 1]}")
    # s cases
    for keyword in junk_keyword_list:
        junk_list.append(f"{keyword}s")

    return junk_keyword_list + junk_list


def remove_a_from_b(s1, s2):
    s1 = "".join(s1.lower().split(" "))
    s2 = "".join(s2.lower().split(" "))
    matcher = difflib.SequenceMatcher(a=s1, b=s2)
    result = ""
    has_matches = False
    for match in matcher.get_matching_blocks():
        a = match.a
        b = match.b
        size = match.size
        if size > 3:
            has_matches = True
            result = result + s2[b + size :]

    if not has_matches:
        return s2
    return result


def remove_special_characters(s):
    return "".join(char for char in s if char.isalnum())


item_dataset = []
for school_id, school in enumerate(school_branded_items):
    items_per_school = {}
    school_name = school["school_name"]
    product_list = school["product_list"]
    for product_id, product in enumerate(product_list):
        product_name = product["product_name"]
        clean_product_name = remove_a_from_b(school_name, product_name)
        searchable = remove_special_characters(clean_product_name)
        school_branded_items[school_id]["product_list"][product_id][
            "product_searchable"
        ] = searchable

with open("branded_items_searchable.json", "w") as file:
    json.dump(school_branded_items, file)
