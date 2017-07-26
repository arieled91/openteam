#! /bin/bash
git stash && git checkout release && git merge --no-ff master && git checkout master && git push  && git stash pop