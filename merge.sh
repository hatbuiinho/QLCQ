#!/bin/bash
currentBranch=$(git branch --show-current)
git checkout $1
git pull
git checkout "$currentBranch"
git merge $1 && echo "merge successfully"
