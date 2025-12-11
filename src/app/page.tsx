'use client';

import { useState, useEffect } from 'react';
import { AIModel, SingleModelResponse, MultiModelResponse } from '@/types';
import { ModelSelector } from '@/components/ModelSelector';
import { PromptInput } from '@/components/PromptInput';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { ExecutionMode } from '@/components/ExecutionMode';

type Mode = 'single' | 'multi';

export default function Home() {
  const [mode, setMode] = useState<Mode>('single');
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SingleModelResponse | MultiModelResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch('/api/models');
        const data = await res.json();
        setModels(data.models || []);
      } catch (err) {
        console.error('Failed to fetch models:', err);
        setError('Failed to load available models');
      }
    };

    fetchModels();
  }, []);

  const handleExecute = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (selectedModels.length === 0) {
      setError('Please select at least one model');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let apiResponse;

      if (mode === 'single') {
        const requestBody = {
          model: selectedModels[0],
          prompt: prompt.trim(),
          image_url: imageUrl.trim() || undefined,
          audio_url: audioUrl.trim() || undefined,
        };

        apiResponse = await fetch('/api/models/single', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      } else {
        const requestBody = {
          models: selectedModels,
          prompt: prompt.trim(),
          image_url: imageUrl.trim() || undefined,
          audio_url: audioUrl.trim() || undefined,
        };

        apiResponse = await fetch('/api/models/multi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      }

      const result = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(result.error?.message || 'API request failed');
      }

      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during execution');
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = (modelIds: string[]) => {
    setSelectedModels(modelIds);
    setResponse(null);
    setError(null);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setSelectedModels([]);
    setResponse(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Model Aggregator
          </h1>
          <p className="text-lg text-gray-600">
            Execute prompts across multiple AI models simultaneously or individually
          </p>
        </div>

        {/* Execution Mode Selector */}
        <div className="mb-6">
          <ExecutionMode mode={mode} onModeChange={handleModeChange} />
        </div>

        {/* Model Selector */}
        <div className="mb-6">
          <ModelSelector
            models={models}
            selectedModels={selectedModels}
            onSelectionChange={handleModelChange}
            mode={mode}
          />
        </div>

        {/* Prompt Input */}
        <div className="mb-6">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            imageUrl={imageUrl}
            onImageUrlChange={setImageUrl}
            audioUrl={audioUrl}
            onAudioUrlChange={setAudioUrl}
            selectedModels={selectedModels}
            models={models}
          />
        </div>

        {/* Execute Button */}
        <div className="mb-6 text-center">
          <button
            onClick={handleExecute}
            disabled={loading || selectedModels.length === 0 || !prompt.trim()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Executing...
              </>
            ) : (
              `Execute ${mode === 'single' ? 'Single Model' : 'Multi-Model'}`
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <ResponseDisplay response={response} mode={mode} />
        )}
      </div>
    </div>
  );
}
