from http import HTTPStatus
from api.utils import get_youtube_query
import json

def test_search_videos(client, mock_api):
    """
    Test that the search_videos_route returns a
    list of videos when the query is provided
    """
    with open("tests/assets/youtube-request.json") as file:
        mock_data = json.load(file)
    mock_api.get(get_youtube_query('surfing'), json=mock_data)
    response = client.get("/api/v1/videos?query=surfing")
    assert response.status_code == HTTPStatus.OK
    
    data = response.json()
    assert data == { "videos": [
        {
            "id": "video-id",
            "title": "video-title",
            "channelId": "channel-id",
            "channelIcon": "channel-id",
            "thumbnail": "video-url",
            "channelTitle": "channel-title",
            "description": "video-description"
        }
    ]}

def test_search_videos_no_query(client):
    """
    Test that the search_videos_route returns a
    422 error when the query is not provided 
    """
    response = client.get("/api/v1/videos/")
    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY

def test_search_videos_empty_query(client):
    """
    Test that the search_videos_route returns a
    400 error when the query is empty 
    """
    response = client.get("/api/v1/videos?query=")
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {"detail": "Param is required"}
