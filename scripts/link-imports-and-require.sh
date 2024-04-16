#!/bin/zsh

# NVM
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh  # This loads NVM
nvm use

# Unlink/link main
npm unlink @rwf-projects/time-formatter
npm link

# js-import
cd ./tests/js-import || exit
npm unlink @rwf-projects/time-formatter
npm link @rwf-projects/time-formatter
cd ../../

# js-require
cd ./tests/js-require || exit
npm unlink @rwf-projects/time-formatter
npm link @rwf-projects/time-formatter
cd ../../

# ts-import
cd ./tests/ts-import || exit
npm unlink @rwf-projects/time-formatter
npm link @rwf-projects/time-formatter
cd ../../
