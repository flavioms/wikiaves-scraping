# 🐦 WikiAves Scraper — Node.js CSV Exporter

A **WikiAves data scraper** built with **Node.js (CommonJS)**, **Axios**, and **Cheerio**.  
It collects bird observation records from the WikiAves platform and generates a **CSV file** for biologists and researchers to use in data analysis.

The project is organized with a **clean architecture** (Config → Repository → Service → Controller → CLI) to ensure **maintainability**, **testability**, and **clear separation of concerns**.

## ✨ Features

* Fetch bird records from WikiAves JSON endpoints
* Filter data by **state**, **municipality**, or **species**
* Automatic retry and concurrency control
* Modular and configurable via `.env`
* Interactive CLI interface using `enquirer`
* Clean code and best practices

## 🧩 Tech Stack

* Node.js (CommonJS)
* Axios + Axios-Retry
* Cheerio
* p-limit (concurrency control)
* Enquirer (interactive CLI)
* dotenv (environment management)

## ⚙️ Project Structure
```bash
src/
├─ bin/          # CLI entry
├─ config/       # Environment variables and constants
├─ repositories/ # Data loaders (species, municipalities)
├─ services/     # HTTP requests and WikiAves API logic
├─ controllers/  # Business rules and orchestration
├─ parsers/      # HTML parsers
└─ utils/        # Helper functions (concurrency limiter, etc.)
```

## 🚀 Quick Start (Development)
```bash
yarn
cp .env.example .env
yarn start
```

## 📦 Generating Executables with pkg

You can create standalone binaries for Linux, macOS, and Windows using pkg. This allows you to run the scraper without installing Node.js.

```bash
yarn build
yarn pkg
```

After running this command, you will have:

> - wikiaves-linux-x64 → Linux 64-bit
> - wikiaves-macos-x64 → macOS 64-bit
> - wikiaves-win-arm64.exe → Windows ARM64

## 💻 Running the Executables

### Linux
```bash
chmod +x wikiaves-linux-x64
./wikiaves-linux-x64
```

### macOS
```bash
chmod +x wikiaves-macos-x64
./wikiaves-macos-x64
```

> If macOS warns about an unidentified developer, you may need to allow the app in System Preferences → Security & Privacy → Open Anyway.

### Windows
```bash
.\wikiaves-win-arm64.exe
```

> Double-clicking the executable in File Explorer also works.

## ⚙️ Tips

> -  Make sure .env is correctly configured for API tokens or optional settings.
> - If you encounter errors about missing modules, ensure the binary was built after yarn build.
> - For large datasets, the CLI may take a few minutes depending on the filters applied.
