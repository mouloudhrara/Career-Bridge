import csv
import json

skills= set() # Use a set to avoid duplicate skill names

with open('skills_en.csv', newline='', encoding='utf-8') as csvfile:
    reader= csv.DictReader(csvfile) # Read the CSV as a dictionary where headers become keys

    # Loop through each row (line) in the CSV file
    for row in reader : 
        label = row.get('preferredLabel')  #get the skill name
        skill_type = row.get('skillType')
        # include only 