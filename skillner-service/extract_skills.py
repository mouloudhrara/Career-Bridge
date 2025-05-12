import spacy
from skillNer.skill_extractor_class import SkillExtractor
import json

# Load skill patterns config
with open("skillner_config.json") as f:
    config= json.load(f)


# Load spaCy model 
nlp = spacy.load(config['labels']['SKILL']['model_path'])

# Create SkillExtractor with the specified model and patterns
skill_extractor= SkillExtractor(nlp, SKILL_PATTERN_PATH=config['labels']['SKILL']['patterns'])

# function to extract skills from text 
def extractSkillsFromText(text):
    # takes the input text (CV content) as args
    # returns a List[str] of extracted skills
    annotations= skill_extractor.annotate(text)
    skills= [item['doc_nde_value'] for items in annotations['results']['full_matches']]
    skills+=[item['doc_nde_value'] for items in annotations['results']['ngram_scored']]
    return list(set(skills))





