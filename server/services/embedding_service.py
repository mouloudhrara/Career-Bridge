from sentence_transformers import SentenceTransformer
import numpy as np
import torch
import logging
import os
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'  # Disable symlink warning

# Initialize model (will auto-download on first run)
model = SentenceTransformer(
    'all-MiniLM-L6-v2',
    device='cuda' if torch.cuda.is_available() else 'cpu'
)

def get_embedding(text):
    """Generate embedding for a single text"""
    try:
        if not text or not isinstance(text, str):
            raise ValueError("Input must be a non-empty string")
        
        # Clean and truncate text
        clean_text = ' '.join(text.strip().split()[:512])
        
        # Generate embedding (automatically normalizes)
        embedding = model.encode(
            clean_text,
            convert_to_tensor=False,
            show_progress_bar=False
        )
        
        return embedding.tolist()
    
    except Exception as e:
        logging.error(f"Embedding error: {str(e)}")
        raise