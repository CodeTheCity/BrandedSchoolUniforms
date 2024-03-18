# Branded School Uniform Project

## Project goal

- Educating parents about the specific uniform pieces that are required versus optional.
- Providing options for cost-saving by highlighting where generic items can be substituted for branded ones.
- Potentially automating the process of data collection and maintenance to keep the platform up-to-date with the latest school uniform policies and pricing.


## What's being done over the weekend
- Set our goal and discussed why we are doing this
- With the use of an existing database of schools, we scraped and cleaned data on school uniforms and created our database
- Created a design of our website 
- Started the front-end and back-end of our website
- Found a way to turn pdf files into text
- Coded a part of the website
- Linked the database to the website

## Directory structure
- `data`: where all of the scraped data located
    - `asda`: ASDA prices data
    - `combined`: Combined ASDA and supplier data
    - `school`: List of schools
    - `supplier`: Supplier data from https://www.border-embroideries.co.uk/
- `school-uniform-comparison`: Main `Next.js` code for both frontend and backend of the wb
- `src`: Source codes
    - `notebook`: Collection of notebook both boilerplates and the one used to scrape
    - `py`: Collection of python script
        - `myclothing_scraper.py`: Scraper for my clothing
        - `roy_data_cleaner.py`: Script to clean the inconsistencies in the data
        - `roy_seller_matching.py`: Script to generate the final data for the database
        - `roy_supplier_scraper.py`: Script to scrape the pricing information from BE
    - `trial/pdf_to_text`: Trial for converting pdf to text

## Final data structure
```
[
    {
        "school_id": "0",
        "school_name": "Abberley Preschool",
        "school_logo": "https://www.border-embroideries.co.uk/pub/media/catalog/category/Abberley_Preschool.jpg",
        "school_url": "https://www.border-embroideries.co.uk/schools/abberley-preschool.html",
        "product_list": [
            {
                "product_id": "0",
                "product_name": "ABBERLEY PRE SCHOOL SWEATSHIRT",
                "product_price": "6.88",
                "product_url": "https://www.border-embroideries.co.uk/abberley-pre-school-762-sshirt-100060.html",
                "product_searchable": "sweatshirt",
                "closest_product_name": "Cobalt Easy On School Sweatshirt 2 Pack",
                "closest_product_price": "5",
                "closest_product_img_src": "https://asda.scene7.com/is/image/Asda/5059190704613?hei=600&wid=450&qlt=85&fmt=pjpg&resmode=sharp2&op_usm=1.1,0.5,0,0&defaultimage=default_details_George_rd",
                "closest_product_url": "https://direct.asda.com/george/school/jumpers-sweatshirts/cobalt-easy-on-school-sweatshirt-2-pack/GEM936313-122253,default,pd.html?clr=Cobalt",
                "price_difference": 27.33
            },
        ]
    }
]
```
        
