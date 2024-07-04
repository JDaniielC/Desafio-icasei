from api.settings import settings
import pytest
from fastapi.testclient import TestClient
import requests_mock
from api.main import app

@pytest.fixture()
def client():
    """
    Create a test client for the FastAPI app 
    """
    with TestClient(app) as client:
        yield client

@pytest.fixture
def mock_api():
    """
    Create a mock for the youtube api
    """
    settings.API_KEY = 'test_key'
    with requests_mock.Mocker() as m:
        yield m
