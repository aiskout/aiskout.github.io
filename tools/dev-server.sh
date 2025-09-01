#!/usr/bin/env bash
#
# Start Jekyll development server using devcontainer

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Starting Jekyll development server in devcontainer..."
echo "Project directory: $PROJECT_DIR"

docker run --rm -it \
  -p 4000:4000 \
  -p 35729:35729 \
  -v "$PROJECT_DIR:/workspace" \
  -w /workspace \
  mcr.microsoft.com/devcontainers/jekyll:2-bullseye \
  bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --livereload"
