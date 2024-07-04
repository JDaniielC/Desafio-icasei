FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install poetry

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi

EXPOSE 8000
CMD poetry run uvicorn --host 0.0.0.0 api.main:app