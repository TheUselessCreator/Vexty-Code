import torch
from transformers import BertTokenizer, BertForSequenceClassification

class NSFWFilter:
    def __init__(self, model_path='nsfw_classification_model', threshold=0.9):
        # Load the tokenizer and model
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model = BertForSequenceClassification.from_pretrained(model_path)
        self.model.eval()
        self.threshold = threshold

    def is_nsfw(self, text):
        # Tokenize the text input
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            probabilities = torch.softmax(outputs.logits, dim=-1)

        nsfw_prob = probabilities[0][1].item()
        
        return nsfw_prob > self.threshold

# Example usage:
if __name__ == "__main__":
    nsfw_filter = NSFWFilter()

    # Test a few texts
    texts = ["This is a safe message.", "Explicit message here."]
    for text in texts:
        if nsfw_filter.is_nsfw(text):
            print(f"NSFW Content detected in: {text}")
        else:
            print(f"Safe content: {text}")
