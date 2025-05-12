import csv
import json

skills= set() # Use a set to avoid duplicate skill names

with open('skills_en.csv', newline='', encoding='utf-8') as csvfile:
    reader= csv.DictReader(csvfile) # Read the CSV as a dictionary where headers become keys

    # Loop through each row (line) in the CSV file
    for row in reader : 
        label = row.get('preferredLabel')  #get the skill name
        skill_type = row.get('skillType')
        # include only rows where the skill type is "skill/competence"
        if label and skill_type== 'skill/competence':
            # add the skill to the set
            skills.add(label.lower())


# Save the skills set to a JSON file
with open('skills.json', 'w', encoding='utf-8') as outfile:
    # convert the set to a sorted list  (indented and with readable characters)
    json.dump(sorted(list(skills)), outfile, indent=2, ensure_ascii=False)

# Print a message showing how many unique skills were saved
print(f"Saved {len(skills)} unique skills to skills.json")