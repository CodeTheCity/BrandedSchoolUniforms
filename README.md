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

        
