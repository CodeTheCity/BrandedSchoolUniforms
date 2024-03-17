from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import pandas as pd


url="https://myclothing.com/"

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

def get_websites(url):
    school_urls=[]

    driver.get(url)
    #Searches the schools urls by postcode district
    postcodes=["AB1","AB2","AB3","AB4","AB5"]
    time.sleep(2)
    cookies=driver.find_element(By.XPATH,'//button[@id="close-pc-btn-handler"]').click()
    time.sleep(2)

    for postcode in postcodes:
        driver.find_element(By.XPATH,'//input[@class="reset-input index-hero-ff-search-input heroSearchInput"]').send_keys(postcode)
        time.sleep(2)
        elements=driver.find_elements(By.XPATH,'//div[@class="wbskFFues__resultsItems"]/a')
        time.sleep(2)
        driver.find_element(By.XPATH,'//input[@class="reset-input index-hero-ff-search-input heroSearchInput"]').clear()
        time.sleep(2)
        new_schools=list(map(lambda element:element.get_attribute('href'),elements))
        print(new_schools)
        school_urls.extend(new_schools)
  
    pd.Series(school_urls).to_csv('school_urls.csv',index=False)
    driver.quit()
    return school_urls

def get_products(url):
    product_dict={}

    driver.get(url)
    time.sleep(2)
    cookies=driver.find_element(By.XPATH,'//button[@id="close-pc-btn-handler"]').click()
    time.sleep(2)

    school_name=driver.find_element(By.XPATH,'//h1[@class="h-style t-ml f-w500 row--xxs d-block"]').text
    product_dict['school_name']=school_name
    items=driver.find_elements(By.XPATH,'//a[@class="d-block block-4/12 cell-l--s cell-r--s row block-fh @mobile-tablet__block-6/12"]/h3')
    product_dict['items']=list(map(lambda x:x.text,items))

    prices=driver.find_elements(By.XPATH,'//a[@class="d-block block-4/12 cell-l--s cell-r--s row block-fh @mobile-tablet__block-6/12"]/span')
    product_dict['prices']=list(map(lambda x:x.text.strip('£'),prices))


    return product_dict

    


# school_urls=get_websites(url)
school_urls=pd.read_csv('school_urls.csv')
for school_url in school_urls.values:
        items=get_products(school_url[0])
        print(pd.DataFrame(items))

