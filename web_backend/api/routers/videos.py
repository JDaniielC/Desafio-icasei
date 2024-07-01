from fastapi import APIRouter, HTTPException
from http import HTTPStatus
from api.schemas import VideoResponseSchema, YoutubeResponse, VideoPublic
from api.utils import get_youtube_query
import requests
import json

router = APIRouter(
    prefix="/videos",
    tags=["videos"],
)

@router.get("/", response_model=VideoResponseSchema)
async def search_videos_route(query: str):
    """
    Search for videos on youtube by query and return a formated list of videos

    Args:
        query (str): The search query

    Returns:
        dict: A dictionary with a list of videos

    Raises:
        HTTPException: If the query is not provided
    """
    if not query:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail="Query is required")

    response = requests.get(get_youtube_query(query))
    response = json.loads(response.text)

    response = YoutubeResponse(**response)
    
    videos: list[VideoPublic] = list()
    for item in response.items:
        video = item.snippet
        video_id = item.id.videoId
        title = video.title
        description = video.description
        thumbnail = video.thumbnails.medium.url
        channel_title = video.channelTitle

        video_public = VideoPublic(
            id=video_id,
            title=title,
            channelId=video.channelId,
            channelIcon=video.channelId,
            thumbnail=thumbnail,
            channelTitle=channel_title,
            description=description,
        )

        videos.append(video_public)

    return {
        "videos": videos
    }
