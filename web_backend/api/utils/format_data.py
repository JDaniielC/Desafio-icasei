from api.schemas import VideoPublic    

def format_youtube_response(response: dict) -> list[VideoPublic]:
    """
    Format the youtube response to a list of VideoPublic objects

    Args:
        response (dict): The youtube response
      
    Returns:
        list[VideoPublic]: A list of VideoPublic objects
    """

    videos: list[VideoPublic] = list()
    for item in response.items:
        video = item.snippet
        if isinstance(item.id, str):
            video_id = item.id
        else:
            video_id = item.id.videoId
        title = video.title
        description = video.description
        thumbnail = video.thumbnails.medium.url
        channel_title = video.channelTitle

        video_public = VideoPublic(
            id=video_id,
            title=title,
            channelId=video.channelId,
            thumbnail=thumbnail,
            channelTitle=channel_title,
            description=description,
        )

        videos.append(video_public)

    return videos