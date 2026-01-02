import os

home = os.path.expanduser('~')

zshrc_content = '''# --- NVM SETUP ---
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# --- ANTIDOTE PLUGIN MANAGER ---
source $HOME/.antidote/antidote.zsh
antidote load
'''

plugins_content = '''zsh-users/zsh-autosuggestions
zsh-users/zsh-completions
zsh-users/zsh-syntax-highlighting
dracula/zsh
'''

def write_file(path, content):
    with open(path, 'w', newline='\n') as f:
        f.write(content)
    print(f"Successfully wrote {path}")

write_file(os.path.join(home, '.zshrc'), zshrc_content)
write_file(os.path.join(home, '.zsh_plugins.txt'), plugins_content)

print("\n--- Setup Complete ---")
print("Run 'exit' and restart WSL for the changes to take effect.")
