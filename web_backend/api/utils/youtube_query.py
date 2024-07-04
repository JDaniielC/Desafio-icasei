from api.settings import settings

STANDARD_FILTERS = {
    "part": "snippet",
    "maxResults": 25,
    "type": "video",
    "videoEmbeddable": "true",
    "key": settings.API_KEY,
}
BASE_YT_URL = "https://www.googleapis.com/youtube/v3"

def get_youtube_by_query(query: str) -> str:
    """
    Format the youtube query url with the search query

    Args:
        query (str): The search query

    Returns:
        str: The youtube query url
    """
    parameters = STANDARD_FILTERS.copy()
    parameters.update({"q": query})
    full_query = BASE_YT_URL+"/search" + "?" + "&".join(
        [f"{key}={value}" for key, value in parameters.items()]
    )

    return full_query

def get_youtube_by_ids(ids: list[str]) -> str:
    """
    Format the youtube query url with the search query

    Args:
        ids (list[str]): The list of video ids

    Returns:
        str: The youtube query url
    """
    parameters = STANDARD_FILTERS.copy()
    full_query = BASE_YT_URL+"/videos" + "?" + "&".join(
        [f"{key}={value}" for key, value in parameters.items()]
    )
    full_query += "&id=" + ",".join(ids)

    return full_query