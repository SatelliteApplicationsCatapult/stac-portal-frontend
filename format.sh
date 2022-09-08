#!/usr/bin/env bash

# Format code with yapf.
yapf -i -r -p -vv app/

# Format docstrings with docformatter.
docformatter -i -r app/
