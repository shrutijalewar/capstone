#!/bin/bash

if [ -z "$1" ] ; then
    echo "Enter a database name"
      exit 1
    fi

    mongoimport --jsonArray --drop --db $1 --collection links --file ../../db/links.json
    mongoimport --jsonArray --drop --db $1 --collection recipes --file ../../db/recipes.json
    mongoimport --jsonArray --drop --db $1 --collection users --file ../../db/users.json
