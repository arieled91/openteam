#! /bin/bash
git stash && git checkout release && git merge --no-ff master && git push  && git checkout master && git stash pop