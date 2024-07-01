from api.settings import settings

def get_youtube_query(query: str) -> str:
    """
    Format the youtube query url with the search query

    Args:
        query (str): The search query

    Returns:
        str: The youtube query url
    """
    YT_URL = "https://www.googleapis.com/youtube/v3/search"
    parameters = {
        "key": settings.API_KEY,
        "part": "snippet",
        "maxResults": 25,
        "q": query,
        "type": "video",
        "videoEmbeddable": "true",
    }
    full_query = YT_URL + "?" + "&".join(
        [f"{key}={value}" for key, value in parameters.items()]
    )

    return full_query
