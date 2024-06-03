import pandas as pd
import requests
from bs4 import BeautifulSoup
from cards import cards

def scrape_card_price(card_name, card_number):
    url = f"https://www.pricecharting.com/game/pokemon-base-set/{card_name}-{card_number}"
    print("URL:", url)  #debug
    page_to_scrape = requests.get(url)
    print("Status Code:", page_to_scrape.status_code)  # debug

    soup = BeautifulSoup(page_to_scrape.content, "html.parser")

    price_elements = soup.find_all("span", class_="price js-price")

    if price_elements:
        first_price = price_elements[0].get_text().strip()
        last_price = price_elements[-1].get_text().strip()
        return {
            "Card Name": f"Base Set {card_name}",
            "Card Number": card_number,
            "Ungraded Price": first_price,
            "PSA 10 Price": last_price
        }
    else:
        return {
            "Card Name": f"Base Set {card_name}",
            "Card Number": card_number,
            "Ungraded Price": "Price not found",
            "PSA 10 Price": "Price not found"
        }


scraped_data = []

for card in cards:
    scraped_data.append(scrape_card_price(card["name"], card["number"]))

df = pd.DataFrame(scraped_data)

df.to_excel("pokemon_price_data.xlsx", index=False)
