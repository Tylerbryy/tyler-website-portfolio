"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";

// TypeScript interfaces for video data
interface Video {
  id: {
    videoId: string;
    kind: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

interface PageState {
  videos: Video[];
  nextPageToken: string | null;
  prevPageToken: string | null;
}

const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [pageStates, setPageStates] = useState<PageState[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const youtubeChannelId = "UCccMxe7chM_jA_qhLBTQErQ";
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const fetchVideos = async (pageToken: string | null = null, useCache: boolean = true) => {
    setLoading(true);

    if (useCache) {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        const now = new Date().getTime();

        if (now - timestamp < CACHE_DURATION && data.pageStates && data.pageStates.length > 0) {
          const initialState = data.pageStates[0];
          setPageStates(data.pageStates);
          setVideos(initialState.videos);
          setNextPageToken(initialState.nextPageToken);
          setCurrentPage(0);
          setLoading(false);
          return;
        }
      }
    }

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=20&pageToken=${pageToken || ''}`);
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      
      const data = await response.json();
      if (!data.items) throw new Error("No items found in the response");

      const videoIds = data.items.map((item: Video) => item.id.videoId).join(',');
      const videoStatisticsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=statistics`);
      const videoStatisticsData = await videoStatisticsResponse.json();

      const videosWithStatistics = data.items.map((item: Video, index: number) => ({
        ...item,
        statistics: videoStatisticsData.items[index].statistics,
      }));

      const newPageState: PageState = {
        videos: videosWithStatistics,
        nextPageToken: data.nextPageToken || null,
        prevPageToken: pageToken,
      };

      const updatedPageStates = [...pageStates, newPageState];
      setPageStates(updatedPageStates);
      setVideos(videosWithStatistics);
      setNextPageToken(data.nextPageToken || null);
      setCurrentPage(updatedPageStates.length - 1);
      setError(null);

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: new Date().getTime(),
        data: { pageStates: updatedPageStates },
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const sortedVideos = useMemo(() => {
    return videos
      .filter(video => !video.snippet.description.includes("noshow"))
      .filter(video => 
        searchQuery === '' || 
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        video.snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(video => selectedCategory === '' || video.snippet.description.toLowerCase().includes(selectedCategory.toLowerCase()))
      .sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime());
  }, [videos, searchQuery, selectedCategory]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      const prevPageIndex = currentPage - 1;
      const prevPageState = pageStates[prevPageIndex];
      setVideos(prevPageState.videos);
      setNextPageToken(prevPageState.nextPageToken);
      setCurrentPage(prevPageIndex);
    }
  }, [currentPage, pageStates]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pageStates.length - 1) {
      const nextPageIndex = currentPage + 1;
      const nextPageState = pageStates[nextPageIndex];
      setVideos(nextPageState.videos);
      setNextPageToken(nextPageState.nextPageToken);
      setCurrentPage(nextPageIndex);
    } else if (nextPageToken) {
      fetchVideos(nextPageToken, false);
    }
  }, [currentPage, nextPageToken, pageStates]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);
  const handleCategoryFilter = (category: string) => setSelectedCategory(category);

  if (error) {
    return <div className="mx-auto max-w-5xl text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
        <h1 className="mx-auto text-center font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
          <Balancer>Videos</Balancer>
        </h1>
        <span className="block text-center text-lg leading-8 text-slate-600 dark:text-slate-400">
          <Balancer>A collection of videos of my projects!</Balancer>
        </span>
      </div>
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="my-4">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="my-4">
          <span className="mr-2">Filter by category:</span>
          <Button variant={selectedCategory === '' ? 'default' : 'outline'} onClick={() => handleCategoryFilter('')}>
            All
          </Button>
          <Button variant={selectedCategory === 'medicalcodingautomation' ? 'default' : 'outline'} onClick={() => handleCategoryFilter('medicalcodingautomation')}>
            Medical Coding Automation
          </Button>
          <Button variant={selectedCategory === 'jarvisproject' ? 'default' : 'outline'} onClick={() => handleCategoryFilter('jarvisproject')}>
            Project Jarvis
          </Button>
          <Button variant={selectedCategory === 'robotdog' ? 'default' : 'outline'} onClick={() => handleCategoryFilter('robotdog')}>
            Tensor(Robot Dog)
          </Button>
        </div>
        {sortedVideos.map((video) => (
          <div key={video.id.videoId} className="my-4">
            <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
              <div className="relative">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h2 className="text-xl font-semibold">{video.snippet.title || 'No Title'}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{video.snippet.description || 'No Description'}</p>
                </div>
                <div>
                  <img src={video.snippet.thumbnails.default.url} alt="Video Thumbnail" className="w-24 h-24 rounded-md" />
                </div>
              </div>
              <div className="mt-2">
                <span className="mr-4">Views: {video.statistics.viewCount}</span>
                <span className="mr-4">Likes: {video.statistics.likeCount}</span>
                <span>Comments: {video.statistics.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center my-4">
          <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 0 || loading}>
            {loading ? 'Loading...' : 'Previous'}
          </Button>
          <span className="text-sm text-slate-600 dark:text-slate-400">Page {currentPage + 1}</span>
          <Button variant="outline" onClick={handleNextPage} disabled={!nextPageToken || loading}>
            {loading ? 'Loading...' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
