import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from tqdm import tqdm
from transformer import TransformerModel, generate_square_subsequent_mask

# Define a simple text dataset for training
class TextDataset(Dataset):
    def __init__(self, tokenized_text, seq_length):
        self.tokenized_text = tokenized_text
        self.seq_length = seq_length

    def __len__(self):
        return len(self.tokenized_text) - self.seq_length

    def __getitem__(self, idx):
        return (
            self.tokenized_text[idx:idx + self.seq_length],
            self.tokenized_text[idx + 1:idx + 1 + self.seq_length]
        )

# Function to train the transformer model
def train_transformer(
    model, train_loader, optimizer, criterion, device, num_epochs=10, log_interval=100
):
    model.train()
    for epoch in range(1, num_epochs + 1):
        total_loss = 0
        for batch_idx, (src, tgt) in enumerate(tqdm(train_loader)):
            src, tgt = src.to(device), tgt.to(device)
            optimizer.zero_grad()

            # Create mask for src and tgt sequences
            src_mask = generate_square_subsequent_mask(src.size(1)).to(device)

            # Forward pass
            output = model(src, src_mask)
            loss = criterion(output.view(-1, output.size(-1)), tgt.view(-1))

            # Backpropagation
            loss.backward()
            optimizer.step()

            total_loss += loss.item()

            if batch_idx % log_interval == 0:
                print(f'Epoch [{epoch}/{num_epochs}], Step [{batch_idx}/{len(train_loader)}], Loss: {loss.item()}')

        print(f'Epoch {epoch} Loss: {total_loss / len(train_loader)}')

# Function to save the trained model
def save_model(model, path):
    torch.save(model.state_dict(), path)
    print(f'Model saved to {path}')

if __name__ == "__main__":
    # Hyperparameters
    vocab_size = 10000  # Modify according to your tokenizer
    d_model = 512
    num_heads = 8
    num_layers = 6
    dropout = 0.1
    seq_length = 50  # Length of sequence in each training batch
    batch_size = 32
    num_epochs = 10
    lr = 0.0001
    model_save_path = "transformer_model.pth"

    # Load your tokenized dataset (you need to tokenize your dataset beforehand)
    tokenized_text = torch.randint(0, vocab_size, (100000,))  # Replace with real tokenized text data

    # Prepare the dataset and dataloader
    dataset = TextDataset(tokenized_text, seq_length)
    train_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Create the model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = TransformerModel(vocab_size, d_model, num_heads, num_layers, dropout).to(device)

    # Loss and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)

    # Train the model
    train_transformer(model, train_loader, optimizer, criterion, device, num_epochs)

    # Save the model
    save_model(model, model_save_path)
