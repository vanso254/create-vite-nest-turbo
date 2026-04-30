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

## 🛠️ Generated Stack

- **Frontend**: Vite + React + TypeScript
- **Backend**: NestJS + TypeScript
- **Package Manager**: pnpm with workspaces
- **Build System**: Turborepo with remote caching support
- **Git**: Pre-configured `.gitignore`

## 📝 Available Scripts

After creating your project, the following scripts are available in the root:

```bash
# Development - Start all apps concurrently
pnpm dev

# Build all apps
pnpm build

# Lint all apps
pnpm lint

# Type-check all apps
pnpm type-check
```

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
