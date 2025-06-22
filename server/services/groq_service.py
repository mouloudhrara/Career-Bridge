import sys
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def extract_cv_data(cv_text):
    prompt = f"""
Extract the following from this CV in JSON format ONLY:
{{
  "skills": ["skill1", "skill2"],
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
{cv_text}
"""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-70b-8192",
        "messages": [{"role": "user", "content": prompt}],
        "response_format": {"type": "json_object"}  # Critical addition
    }

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=30
        )
        response.raise_for_status()
        
        # Debug: Print full API response
        print("Groq API Response:", response.json(), file=sys.stderr)
        
        content = response.json()
        if "choices" not in content or not content["choices"]:
            raise ValueError("Invalid API response format - no choices found")
            
        message_content = content["choices"][0]["message"]["content"]
        
        try:
            # Handle both JSON strings and wrapped markdown
            json_str = message_content.strip()
            if json_str.startswith("```json"):
                json_str = json_str[7:-3].strip()
            return json.loads(json_str)
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse JSON: {str(e)}. Content: {message_content}")

    except Exception as e:
        print(f"Error in extract_cv_data: {str(e)}", file=sys.stderr)
        raise ValueError(f"CV extraction failed: {str(e)}")

if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            print("Usage: python groq_service.py <cv_text>", file=sys.stderr)
            sys.exit(1)
            
        cv_text = sys.argv[1]
        result = extract_cv_data(cv_text)
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)