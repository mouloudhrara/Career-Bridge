# groq_service.py
import sys
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

cv_text = sys.argv[1]
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def extract_cv_data(cv_text):
    prompt = f"""
You are an AI assistant. Extract the following from the CV text:

Respond with only JSON. Do not say "Here is", "Sure", or any explanation.
Do not wrap the JSON in triple backticks or markdown.
Return ONLY a JSON object with the following format:
{{
  "skills": ["..."],
  "experience": [
    {{
      "job_title": "...",
      "company": "...",
      "years": "...",
      "description": "..."
    }}
  ]
}}

CV:
\"\"\"
{cv_text}
\"\"\"
"""

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama3-70b-8192",
        "messages": [{"role": "user", "content": prompt}]
    }

    response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data)
    content = response.json()["choices"][0]["message"]["content"]

    json_start = content.find("{")
    json_end = content.rfind("}")

    if json_start == -1 or json_end == -1:
        raise ValueError("Response does not contain valid JSON.")

    json_str = content[json_start:json_end + 1]

    return json.loads(json_str)
if __name__ == "__main__":
    result = extract_cv_data(cv_text)
    print(json.dumps(result))
