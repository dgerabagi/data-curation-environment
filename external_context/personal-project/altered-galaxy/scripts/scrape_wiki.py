import requests
from bs4 import BeautifulSoup
import re
import time
import os

def scrape_fandom_page(page_title):
    # Handle known redirects or corrections observed in the fandom wiki
    original_title = page_title
    if page_title == "Galery":
        page_title = "Gallery"
    if page_title == "Specture":
        page_title = "Spectre"
    if page_title == "Planets & Ressources":
         page_title = "Planets & Resources"
    if page_title == "Super-Organics":
        page_title = "Super Organics"

    base_url = "https://shattered-galaxy.fandom.com/wiki/"
    # Basic URL encoding for titles
    url_title = page_title.replace(" ", "_")
    # Use requests.utils.quote to handle special characters like '&' correctly
    url = base_url + requests.utils.quote(url_title)

    headers = {
        # Use a generic User-Agent to avoid being blocked
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'}

    try:
        # allow_redirects=True handles cases where the wiki normalizes the URL (e.g., capitalization)
        response = requests.get(url, headers=headers, timeout=15, allow_redirects=True)

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            # The main content area in MediaWiki/Fandom
            content_div = soup.find('div', class_='mw-parser-output')

            if content_div:
                # Remove known noisy elements (TOC, edit links, navigation boxes, sidebars, etc.)
                # This improves the signal-to-noise ratio of the scraped text.
                for noisy_element in content_div.find_all(['div', 'span', 'aside'], class_=['toc', 'editsection', 'navbox', 'metadata', 'mw-editsection', 'portable-infobox', 'page-header__actions', 'WikiaBar']):
                     if noisy_element:
                        noisy_element.decompose()

                # Extract text, using newline as a separator to preserve some structure (like lists/paragraphs)
                text = content_div.get_text(separator='\n', strip=True)

                # Basic cleanup
                text = re.sub(r'\[\d+\]', '', text) # Remove citations like [1]
                text = re.sub(r'(\n\s*){3,}', '\n\n', text) # Collapse excessive newlines

                return text.strip()
            else:
                return f"Could not find main content area (mw-parser-output) on page: {response.url}"
        elif response.status_code == 404:
             return f"Page not found (404): {url}"
        else:
            return f"Failed to fetch page: {url} (Status code: {response.status_code})"
    except requests.RequestException as e:
        return f"Error fetching page: {url} ({e})"

def main():
    # The raw list provided in the Cycle 1 context
    page_list = [
        "Ability Glossary", "Abomination", "Albatross", "Apparition", "Arbalest",
        "Army & Skill-Points", "Aviation Advanced", "Aviation Bonus & Misc", "Aviation Prime",
        "Ballista", "Banshee", "Basic Equipment", "Battles", "Behemoth",
        "Biodirves & Engines", "Charise", "Charnal", "Chimera", "Clout Table", "Condor",
        "Daeva", "Defense", "Dythe", "Eagle", "Equipment", "Falcon", "Galery", "Gallery",
        "Gear-Doc", "Ghast", "Gryphon", "Hawk", "Hotkeys & Chat-Commands", "Hydra", "Imp",
        "Infantry Advanced", "Infantry Bonus & Misc", "Infantry I", "Infantry Misc",
        "Infantry Prime", "Informative Links", "Jorias", "Larva, Scave, Knell", "Leviathan",
        "Liche", "Lithubik", "Main Page", "Mamos, Momos, Mamos", "Manta, Onnir", "Manticore",
        "Mantlet", "Max. Skill-Units", "Medic", "Mephit", "Miasam", "Miasmal",
        "Mobile Advanced", "Mobile Bonus & Misc", "Mobile Prime", "Offense",
        "Oizys, Boreas, Eris, Lyssa", "Orbus", "Organic", "Organic Bonus & Misc", "Organic Misc",
        "Owl", "Pegasus", "Pelican", "Phantom", "Phoenix", "Planets & Resources",
        "Planets & Ressources", "Poda, Kritsk, Mlortha", "Quorg", "Rayoks", "Red-Eye",
        "Reincarnation", "Remakes, Private Servers, and Spiritual Successors", "Revenant",
        "Roc", "Sapper", "Shade", "Shattered Galaxy Wiki", "Slanth, Crudgin, Rouke",
        "Spectre", "Specture", "Spirit", "Super-Organics", "Super Organics", "Trebuchet",
        "Triage", "Ubik, Tyr, Haltyr", "Virus", "Volte", "Vulture", "Vytyr", "War Pigeon",
        "Weapon & Armor", "Wight", "Wraith"
    ]

    # Normalize and deduplicate the list based on known corrections
    unique_pages = []
    seen = set()
    for page in page_list:
        normalized = page
        if normalized == "Galery":
            normalized = "Gallery"
        if normalized == "Specture":
            normalized = "Spectre"
        if normalized == "Planets & Ressources":
            normalized = "Planets & Resources"
        if normalized == "Super-Organics":
            normalized = "Super Organics"

        if normalized not in seen:
            # We use the normalized name for scraping and organization
            unique_pages.append(normalized)
            seen.add(normalized)

    scraped_data = {}
    start_time = time.time()
    print(f"Starting scrape of {len(unique_pages)} unique pages...")

    for i, page in enumerate(unique_pages):
        print(f"Scraping page {i+1}/{len(unique_pages)}: {page}")
        content = scrape_fandom_page(page)
        scraped_data[page] = content
        time.sleep(0.2) # Be polite to the server

    end_time = time.time()
    print(f"Scraping finished in {end_time - start_time:.2f} seconds.")

    # Define the output path for the consolidated artifact
    # Assuming the script is run from the project root
    output_dir = os.path.join("src", "Artifacts")
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "AlteredGalaxy-A25-Wiki-Scrape-C1.md")

    # Write the results to the artifact file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Artifact A25: Altered Galaxy - Shattered Galaxy Wiki Scrape (C1)\n")
        f.write("# Date Created: C1\n")
        f.write("# Author: AI Model (Scraper Script) & Curator\n")
        f.write("\n- **Key/Value for A0:**\n")
        f.write(f"- **Description:** The raw text content scraped from the Shattered Galaxy Fandom Wiki ({len(scraped_data)} pages) in Cycle 1, providing essential data on units, items, and mechanics.\n")
        f.write("- **Tags:** research, data sourcing, raw data, shattered galaxy, wiki scrape\n")
        f.write("\n## 1. Overview\n\n")
        f.write("This artifact contains the raw text scraped from the Shattered Galaxy Fandom Wiki (https://shattered-galaxy.fandom.com/). This data is crucial for filling the content gaps identified in A18 and A19.\n\n")
        f.write(f"Total Pages Scraped: {len(scraped_data)}\n\n")
        f.write("## 2. Scraped Content\n")

        # Write the content of each page into the consolidated file
        for title, content in scraped_data.items():
            clean_title = title.replace("#", "").strip()
            # Ensure the URL in the markdown is correctly formatted
            url_segment = requests.utils.quote(title.replace(" ", "_"))
            f.write(f"\n---\n\n### Page: {clean_title}\n\n")
            f.write(f"Source: https://shattered-galaxy.fandom.com/wiki/{url_segment}\n\n")
            f.write("```text\n")
            if content:
                f.write(content)
            else:
                f.write("No content scraped (see scraper logs for details).")
            f.write("\n```\n")

    print(f"\nSuccessfully wrote consolidated scraped data to {output_file}")

if __name__ == "__main__":
    main()
