!/usr/bin/bash

cd

git clone git@github.com:google/googletest.git

cd googletest

mkdir build

cd build

cmake ..

ninja

sudo ninja install
