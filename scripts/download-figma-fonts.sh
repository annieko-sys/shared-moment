#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
curl --fail --location --silent --show-error 'https://fonts.gstatic.com/s/jua/v18/co3KmW9ljjAjcw.ttf' --output 'public/fonts/jua.ttf'
curl --fail --location --silent --show-error 'https://fonts.gstatic.com/s/yaldevi/v17/cY9afj6VW0NMrDWtDNzCOwlPMq9SLpdxJzvo.ttf' --output 'public/fonts/yaldevi-regular.ttf'
curl --fail --location --silent --show-error 'https://fonts.gstatic.com/s/yaldevi/v17/cY9afj6VW0NMrDWtDNzCOwlPMq9SLpevIDvo.ttf' --output 'public/fonts/yaldevi-semibold.ttf'
