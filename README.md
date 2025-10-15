# 🐦 WikiAves Scraper — Node.js CSV Exporter

A **WikiAves data scraper** built with **Node.js (ES Modules)**, **Axios**, and **Cheerio**.  
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

* Node.js (ESM)
* Axios + Axios-Retry
* Cheerio
* p-limit (concurrency control)
* Enquirer (interactive CLI)
* dotenv (environment management)

## ⚙️ Project Structure
```bash
src/
├─ bin/ # CLI entry
├─ config/ # Environment variables and constants
├─ repositories/ # Data loaders (species, municipalities)
├─ services/ # HTTP requests and WikiAves API logic
├─ controllers/ # Business rules and orchestration
├─ parsers/ # HTML parsers
└─ utils/ # Helper functions (concurrency limiter, etc.)
```


## 🚀 Quick Start

```bash
yarn
cp .env.example .env
yarn start
