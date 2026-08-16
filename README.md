# 🚀 create-vite-nest

[![npm version](https://img.shields.io/npm/v/create-vite-nest.svg)](https://www.npmjs.com/package/create-vite-nest)
[![npm downloads](https://img.shields.io/npm/dm/create-vite-nest.svg)](https://www.npmjs.com/package/create-vite-nest)
[![License](https://img.shields.io/npm/l/create-vite-nest.svg)](https://github.com/Evanof-create/create-vite-nest-turbo/blob/main/LICENSE)
[![Node Version](https://img.shields.io/node/v/create-vite-nest.svg)](https://nodejs.org)

> ⚡ Scaffold a production-ready Turborepo monorepo with Vite + React + NestJS + pnpm in seconds.

## ✨ Features

- ⚡ **Fast & lightweight** - Generates a complete monorepo in seconds
- 🎯 **Clear subcommands & options** - Interactive prompts with sensible defaults
- 🏗️ **Full-stack ready** - Pre-configured Vite + React frontend and NestJS backend
- 📦 **Turborepo powered** - Optimized build pipelines with caching
- 🔗 **Workspace linking** - Seamless pnpm workspace integration
- 🌍 **Cross-platform** - Works on macOS, Linux, and Windows
- 🔄 **Auto-generated configs** - ESLint, TypeScript, and build configurations
- 📦 **Optional shared packages** - Include a types/utilities package out of the box

## 📦 Installation

Requires **Node.js 18+**.

```bash
# npm
npm install -g create-vite-nest

# pnpm
pnpm add -g create-vite-nest

# yarn
yarn global add create-vite-nest

# Or run without installing (npx)
npx create-vite-nest --help
```

## 🚀 Quick Start

### Interactive Mode

Simply run the command and follow the prompts:

```bash
npx create-vite-nest
```

### Command Line Options

```bash
# Create a new project with a specific name
npx create-vite-nest my-awesome-app

# Create with shared package included
npx create-vite-nest my-app --with-shared

# Skip dependency installation
npx create-vite-nest my-app --skip-install

# Skip git initialization
npx create-vite-nest my-app --skip-git
```

## 📋 Usage

```bash
create-vite-nest [project-name] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `[project-name]` | Name of the monorepo project (optional - will prompt if not provided) |

### Options

| Option | Description |
|--------|-------------|
| `--skip-install` | Skip `pnpm install` after scaffolding |
| `--skip-git` | Skip `git init` |
| `--with-shared` | Include a shared `@my-monorepo/types` package |
| `-h, --help` | Display help for command |
| `-V, --version` | Output the version number |

## 📁 Generated Project Structure

```
my-app/
├── apps/
│   ├── web/                 # Vite + React + TypeScript
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api/                 # NestJS + TypeScript
│       ├── src/
│       ├── package.json
│       └── nest-cli.json
├── packages/                # (optional with --with-shared)
│   └── types/               # Shared types package
│       ├── src/
│       └── package.json
├── package.json             # Root package with workspace scripts
├── pnpm-workspace.yaml      # pnpm workspace configuration
├── turbo.json               # Turborepo pipeline config
└── tsconfig.base.json       # Shared TypeScript configuration
```

## 🏗️ Architecture & Process Isolation

### Development Environment

The monorepo is designed to run frontend and backend in **separate processes** to prevent interference:

- **`pnpm dev`**: Uses `concurrently` to run both services in isolated processes within the same terminal
- **`pnpm run dev:backend`**: Runs only the NestJS backend in its own process
- **`pnpm run dev:frontend`**: Runs only the Vite frontend in its own process

Each service runs independently with:
- Backend on `http://localhost:3000` (NestJS)
- Frontend on `http://localhost:5173` (Vite dev server with API proxy)

### Production Environment

For production deployments:

1. **Build Phase**: Both apps are built separately
   - Frontend: Compiled to static files in `apps/web/dist`
   - Backend: Compiled to JavaScript in `apps/api/dist`

2. **Serve Phase**: 
   - Backend serves the frontend static files (configure NestJS to serve from `apps/web/dist`)
   - Or deploy them separately to your hosting platform

### Process Isolation Benefits

- ✅ No port conflicts between services
- ✅ Independent restart capability
- ✅ Separate logging streams
- ✅ Can run in different terminal windows/shells
- ✅ Container-friendly (each service can be containerized separately)

## 📝 Available Scripts

After creating your project, the following scripts are available in the root:

### Development

```bash
# Start both frontend and backend concurrently (in separate processes)
pnpm dev

# Start only the backend (NestJS)
pnpm run dev:backend

# Start only the frontend (Vite + React)
pnpm run dev:frontend

# Start both apps using Turborepo (alternative to pnpm dev)
pnpm run dev:all
```

### Production

```bash
# Build all applications
pnpm build

# Build only the frontend
pnpm run build:frontend

# Build only the backend
pnpm run build:backend

# Start the production backend server (after building)
pnpm start

# Preview the production frontend build
pnpm run preview --filter=@my-monorepo/web
```

### Maintenance

```bash
# Lint all applications
pnpm lint

# Clean build artifacts
pnpm clean
```

### Independent Service Control

For running services in completely separate terminal windows/shells:

**Terminal 1 - Backend:**
```bash
cd apps/api
pnpm dev
# Or for production:
# pnpm build && pnpm start
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
pnpm dev
# Or for production preview:
# pnpm build && pnpm preview
```

This ensures that both services run in isolated processes and cannot interfere with each other.

## 🛠️ Generated Stack

- **Frontend**: Vite + React + TypeScript
- **Backend**: NestJS + TypeScript
- **Package Manager**: pnpm with workspaces
- **Build System**: Turborepo with remote caching support
- **Process Management**: concurrently for isolated development processes
- **Git**: Pre-configured `.gitignore`

## 🔧 Requirements

- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher (will be used automatically)

## 🐛 Troubleshooting

### Common Issues

**Error: pnpm is not installed**
```bash
# Install pnpm globally
npm install -g pnpm
```

**Error: Permission denied**
```bash
# Use npx to avoid global installation
npx create-vite-nest my-app
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) - High-performance build system
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Evanof-create">Evanof-create</a></sub>
</div>
