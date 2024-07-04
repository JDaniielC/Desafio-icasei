# Web Backend

This is the backend for frontend (BFF).
It is a REST API that provides the data for the frontend.

There is an endpoint:
- `/api/v1/videos` - Search a list of Videos by a query string using the Youtube API.

## How to run locally

0. Fill the .env file with the correct values
```bash
cp .env.example .env
```

1. Install the environment
```bash
python -m venv venv
source venv/bin/activate
```

2. Install the dependencies
```bash
pip install poetry
poetry install
```

3. Run the application
```bash
task run
```

4. Run the tests
```bash
task test
```