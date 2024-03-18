#This is a scraper for the provider url="https://myclothing.com/".
#the company provides items for more than 7500 schools in UK,
#which includes more than 100 schools in Aberdeen and Aberdenshire 

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
import pandas as pd
import json


url="https://myclothing.com/"

#Gets item websites for each school
def get_websites(url):
    school_urls=[]
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")  
    driver = webdriver.Chrome(options=options)
   
    driver.get(url)

    #Searches the schools urls by postcode district for Aberdeen and Aberdeenshire.
    #Postcodes for the whole UK can be added
    postcodes=["AB1","AB2","AB3","AB4","AB5"]
    time.sleep(2)
    cookies=driver.find_element(By.XPATH,'//button[@id="close-pc-btn-handler"]').click()
    time.sleep(2)

    for postcode in postcodes:
        print(f'Getting school urls for postcode {postcode}...')
        driver.find_element(By.XPATH,'//input[@class="reset-input index-hero-ff-search-input heroSearchInput"]').send_keys(postcode)
        time.sleep(5)
        elements=driver.find_elements(By.XPATH,'//div[@class="wbskFFues__resultsItems"]/a')
        time.sleep(5)
        driver.find_element(By.XPATH,'//input[@class="reset-input index-hero-ff-search-input heroSearchInput"]').clear()
        time.sleep(2)
        new_schools=list(map(lambda element:element.get_attribute('href'),elements))
        
        print(new_schools,'\n')
        school_urls.extend(new_schools)
    
    driver.quit()
    return school_urls

#Gets products data from schools' websites
def get_products(url,id):
    results_dict={}

    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new") 
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    time.sleep(2)
    cookies=driver.find_element(By.XPATH,'//button[@id="close-pc-btn-handler"]').click()
    time.sleep(2)

    results_dict['school_id']=id

    #school_name
    school_name=driver.find_element(By.XPATH,'//h1[@class="h-style t-ml f-w500 row--xxs d-block"]').text
    results_dict['school_name']=" ".join(school_name.split()[:-1])
    
    #school_logo
    school_logo=driver.find_element(By.XPATH,'//div[@class=" block-2/12 cell-r--s row @mobile-mobile-p__block-3/12"]/a/span/div/img')
    results_dict['school_logo']='https:'+school_logo.get_attribute('data-src')

    #school_url
    try:
        school_url=driver.find_element(By.XPATH,'//a[@class="t-accent-lb t-s ct--xs d-block  @mobile-tablet__hide"]').get_attribute('href')
        results_dict['school_url']=school_url
    except NoSuchElementException:
        results_dict['school_url']=None 

    #product_list: items
    items=driver.find_elements(By.XPATH,'//a[@class="d-block block-4/12 cell-l--s cell-r--s row block-fh @mobile-tablet__block-6/12"]/h3')
    items_list=list(map(lambda x:x.text,items))

    #product_list: items_irl
    items_links=driver.find_elements(By.XPATH,'//a[@class="d-block block-4/12 cell-l--s cell-r--s row block-fh @mobile-tablet__block-6/12"]')
    items_links_list=list(map(lambda x:x.get_attribute('href'),items_links))

    #product_list: prices
    prices=driver.find_elements(By.XPATH,'//a[@class="d-block block-4/12 cell-l--s cell-r--s row block-fh @mobile-tablet__block-6/12"]/span')
    prices_list=list(map(lambda x:x.text.strip('£'),prices))
    
    #product_list: images
    #It is not included in the final dictionary. It can be added to results_dict['product_list']
    # images=driver.find_elements(By.XPATH,'//a[@class="d-block block-4/12 cell-l--s cell-r--s row block-fh @mobile-tablet__block-6/12"]/div/img')
    # images_list=list(map(lambda x:'https:'+x.get_attribute('data-src'),images))

    # Arranges all elements in product_list dict
    product_list=[]
    for i,(item,link,price) in enumerate(zip(items_list,items_links_list,prices_list)):
        product_list.append({'product_id':i,'product_name':item,'product_price':price,'product_url':link})
    results_dict['product_list']=product_list

    return results_dict


def main():

    school_urls=get_websites(url)

    output_file=[]
    print('Starting to scrape products')
    
    #This foor loop calls get_products() to get the infor for each school
    for i,school_url in enumerate(school_urls):
        items=get_products(school_url,i)
        output_file.append(items)

        #Saves the data to .json
        with open("myclothing_df.json", "w") as outfile:
            json.dump(output_file, outfile)
        
        #Provides a partial output to the console
        df=pd.DataFrame.from_dict(output_file)
        print(f"{i+1} schools scraped out of {len(school_urls)}")
        print(f"Last school scraped: {df.tail(1)['school_name'].values[0]}")
        print(df.tail(1),'\n')
            
if __name__=='__main__':
     main()
