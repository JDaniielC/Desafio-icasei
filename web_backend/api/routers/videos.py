from fastapi import APIRouter, HTTPException, Request
from http import HTTPStatus
from api.schemas import VideoResponseSchema, YoutubeResponse, VideoPublic
from api.utils import (get_youtube_by_query,
                       get_youtube_by_ids,
                       format_youtube_response)
import requests
import json

router = APIRouter(
    prefix="/videos",
    tags=["videos"],
)

@router.get("/", response_model=VideoResponseSchema)
async def search_videos_route(request: Request):
    """
    Search for videos on youtube by query and return a formated list of videos

    Args:
        query (str): The search query
        filters (dict): The filters to apply to the search

    Returns:
        dict: A dictionary with a list of videos

    Raises:
        HTTPException: If the query is not provided
    """

    query_params = dict(request.query_params)
    query = query_params.get("query", None)
    filters = query_params.get("filters", None)

    if not (query or filters):
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail="Param is required")

    if (filters):
        ids = json.loads(filters)
        url = get_youtube_by_ids(ids)
    else:
        url = get_youtube_by_query(query)
    response = requests.get(url)
    response = json.loads(response.text)

    response = YoutubeResponse(**response)
    
    videos: list[VideoPublic] = format_youtube_response(response)

    return {
        "videos": videos
    }
