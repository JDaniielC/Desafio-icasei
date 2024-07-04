from pydantic import BaseModel

class VideoPublic(BaseModel):
    id: str
    title: str
    channelId: str
    thumbnail: str
    channelTitle: str
    description: str

class VideoResponseSchema(BaseModel):
    videos: list[VideoPublic]

class VideoIdentification(BaseModel):
    kind: str
    videoId: str

class VideoThumbnail(BaseModel):
    url: str

class SnippetThumbnails(BaseModel):
    medium: VideoThumbnail

class VideoSnippet(BaseModel):
    channelId: str
    title: str
    description: str
    thumbnails: SnippetThumbnails
    channelTitle: str

class YoutubeResource(BaseModel):
    kind: str
    etag: str
    id: VideoIdentification | str
    snippet: VideoSnippet

class SearchPageInfo(BaseModel):
    totalResults: int
    resultsPerPage: int

class YoutubeResponse(BaseModel):
    pageInfo: SearchPageInfo
    nextPageToken: str = None
    items: list[YoutubeResource]