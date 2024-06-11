"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";

// TypeScript interfaces for video data
interface Video {
  id: {
    videoId: string;
    kind: string; // Add kind to identify the type of video
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
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
  const youtubeChannelId = "UCccMxe7chM_jA_qhLBTQErQ";

  const fetchVideos = async (pageToken: string | null = null, useCache: boolean = true) => {
    setLoading(true);

    if (useCache) {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        const now = new Date().getTime();

        if (now - timestamp < CACHE_DURATION && data.pageStates && data.pageStates.length > 0) {
          setPageStates(data.pageStates);
          const initialState = data.pageStates[0];
          setVideos(initialState.videos);
          setNextPageToken(initialState.nextPageToken);
          setCurrentPage(0);
          setLoading(false);
          return;
        }
      }
    }

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAgBotThZud-p_FI3LAyFj62QsWXD50Glk&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=20&pageToken=${pageToken || ''}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (!data.items) {
        throw new Error("No items found in the response");
      }

      const newPageState: PageState = {
        videos: data.items,
        nextPageToken: data.nextPageToken || null,
        prevPageToken: pageToken,
      };

      const updatedPageStates = [...pageStates, newPageState];
      setPageStates(updatedPageStates);
      setVideos(data.items);
      setNextPageToken(data.nextPageToken || null);
      setCurrentPage(updatedPageStates.length - 1);
      setError(null);

      // Store data in cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: new Date().getTime(),
        data: { pageStates: updatedPageStates },
      }));

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const sortedVideos = useMemo(() => {
    if (!videos || videos.length === 0) return [];
    return videos
      .filter(video => !video.snippet.description.includes("#noshow"))
      .sort((a, b) => {
        // Sort videos by date in descending order
        return new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime();
      });
  }, [videos]);

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
        {sortedVideos.map((video) => (
          <div key={video.id.videoId} className="my-4">
            <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h2 className="text-xl font-semibold">{video.snippet.title || 'No Title'}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{video.snippet.description || 'No Description'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center my-4">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 0 || loading}
          >
            {loading ? 'Loading...' : 'Previous'}
          </Button>
          <span className="text-sm text-slate-600 dark:text-slate-400">Page {currentPage + 1}</span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={!nextPageToken || loading}
          >
            {loading ? 'Loading...' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
