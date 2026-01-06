cat << 'EOF' > ~/.zshrc
# --- NVM SETUP ---
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

# --- ANTIDOTE PLUGIN MANAGER ---
source $HOME/.antidote/antidote.zsh
antidote load
EOF

cat << 'EOF' > ~/.zsh_plugins.txt
zsh-users/zsh-autosuggestions
zsh-users/zsh-completions
zsh-users/zsh-syntax-highlighting
dracula/zsh
EOF
