FROM imbios/bun-node:canary-22.6.0-slim AS base

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Makassar /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata

# ---------------------------------------------------------------------------- #

FROM base AS builder

WORKDIR /app

# Should consider using Bun instead of Yarn to install Turbo and build the project,
# since Yarn here is only used to install dependencies and prune the project

# Install Turbo globally
RUN yarn global add turbo@^2

# Copy all files to the working directory
COPY . .

# Convert Bun workspace to Yarn (skip installing for now)
RUN bunx @turbo/workspaces@latest convert ./ yarn --skip-install

# Install dependencies with Bun and generate Yarn lockfile to be used by Turbo
RUN bun install --yarn

# Move the installed node_modules to a temporary location
RUN mv node_modules /tmp/node_modules

# Prune unnecessary files using Turbo to get the needed files only
RUN turbo prune @ixveria/discord-bot --docker

# ---------------------------------------------------------------------------- #

FROM base AS installer

WORKDIR /app

# Reuse the pruned package.json and lock files
COPY --from=builder /app/out/json/ .

# Move the previously saved node_modules back to the project directory
COPY --from=builder /tmp/node_modules ./node_modules

# Copy the pruned project files to the working directory
COPY --from=builder /app/out/full/ .

# Run the build using Turbo
RUN yarn turbo run build

# ---------------------------------------------------------------------------- #

FROM base AS runner
WORKDIR /app

USER bun

COPY --from=installer --chown=bun:bun /app/apps/discord-bot/dist ./dist

CMD ["bun", "dist/main.js"]