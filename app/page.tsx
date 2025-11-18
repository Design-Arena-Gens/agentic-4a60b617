'use client';

import { useState } from 'react';
import { Download, Loader2, Video, FileText, Image, Mic, Edit3, Tag } from 'lucide-react';

interface VideoContent {
  idea: {
    title: string;
    concept: string;
    targetAudience: string;
    estimatedLength: string;
    hook: string;
  };
  script: {
    intro: string;
    mainContent: string[];
    conclusion: string;
    cta: string;
    fullScript: string;
  };
  visualGuide: {
    thumbnail: {
      description: string;
      textOverlay: string;
      colorScheme: string;
    };
    scenes: Array<{
      timestamp: string;
      description: string;
      visualType: string;
      prompt: string;
    }>;
  };
  voiceover: {
    pacing: string;
    tone: string;
    segments: Array<{
      text: string;
      emotion: string;
      pauseAfter: string;
    }>;
  };
  editingInstructions: {
    pacing: string;
    transitions: string[];
    musicSuggestions: Array<{
      section: string;
      mood: string;
      volume: string;
    }>;
    effectsAndGraphics: string[];
    colorGrading: string;
  };
  metadata: {
    title: string;
    description: string;
    tags: string[];
    category: string;
    thumbnail_text: string;
    bestPostingTime: string;
    playlist_suggestions: string[];
  };
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('educational');
  const [duration, setDuration] = useState('5-8');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<VideoContent | null>(null);
  const [error, setError] = useState('');

  const generateContent = async () => {
    if (!topic.trim()) {
      setError('Please enter a video topic');
      return;
    }

    setLoading(true);
    setError('');
    setContent(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, style, duration }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadAsJSON = () => {
    if (!content) return;
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-video-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsText = () => {
    if (!content) return;

    let text = `YOUTUBE VIDEO PRODUCTION PACKAGE\n`;
    text += `${'='.repeat(50)}\n\n`;

    text += `VIDEO IDEA\n${'-'.repeat(50)}\n`;
    text += `Title: ${content.idea.title}\n`;
    text += `Concept: ${content.idea.concept}\n`;
    text += `Target Audience: ${content.idea.targetAudience}\n`;
    text += `Estimated Length: ${content.idea.estimatedLength}\n`;
    text += `Hook: ${content.idea.hook}\n\n`;

    text += `FULL SCRIPT\n${'-'.repeat(50)}\n`;
    text += `${content.script.fullScript}\n\n`;

    text += `VISUAL GUIDE\n${'-'.repeat(50)}\n`;
    text += `Thumbnail:\n`;
    text += `  Description: ${content.visualGuide.thumbnail.description}\n`;
    text += `  Text Overlay: ${content.visualGuide.thumbnail.textOverlay}\n`;
    text += `  Color Scheme: ${content.visualGuide.thumbnail.colorScheme}\n\n`;
    text += `Scenes:\n`;
    content.visualGuide.scenes.forEach((scene, i) => {
      text += `  Scene ${i + 1} [${scene.timestamp}]:\n`;
      text += `    Type: ${scene.visualType}\n`;
      text += `    Description: ${scene.description}\n`;
      text += `    Image Prompt: ${scene.prompt}\n\n`;
    });

    text += `VOICEOVER GUIDE\n${'-'.repeat(50)}\n`;
    text += `Pacing: ${content.voiceover.pacing}\n`;
    text += `Tone: ${content.voiceover.tone}\n\n`;
    content.voiceover.segments.forEach((seg, i) => {
      text += `Segment ${i + 1}:\n`;
      text += `  Text: ${seg.text}\n`;
      text += `  Emotion: ${seg.emotion}\n`;
      text += `  Pause After: ${seg.pauseAfter}\n\n`;
    });

    text += `EDITING INSTRUCTIONS\n${'-'.repeat(50)}\n`;
    text += `Pacing: ${content.editingInstructions.pacing}\n`;
    text += `Transitions: ${content.editingInstructions.transitions.join(', ')}\n`;
    text += `Color Grading: ${content.editingInstructions.colorGrading}\n`;
    text += `Effects: ${content.editingInstructions.effectsAndGraphics.join(', ')}\n\n`;
    text += `Music Suggestions:\n`;
    content.editingInstructions.musicSuggestions.forEach(music => {
      text += `  ${music.section}: ${music.mood} (${music.volume})\n`;
    });

    text += `\nMETADATA\n${'-'.repeat(50)}\n`;
    text += `Title: ${content.metadata.title}\n`;
    text += `Description:\n${content.metadata.description}\n\n`;
    text += `Tags: ${content.metadata.tags.join(', ')}\n`;
    text += `Category: ${content.metadata.category}\n`;
    text += `Best Posting Time: ${content.metadata.bestPostingTime}\n`;

    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-video-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Video className="w-12 h-12 text-red-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-900">YouTube Video Generator</h1>
          </div>
          <p className="text-xl text-gray-600">Complete video production package in seconds</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Video Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The science behind lucid dreaming"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  disabled={loading}
                >
                  <option value="educational">Educational</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="vlog">Vlog</option>
                  <option value="documentary">Documentary</option>
                  <option value="review">Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  disabled={loading}
                >
                  <option value="3-5">3-5 minutes</option>
                  <option value="5-8">5-8 minutes</option>
                  <option value="8-12">8-12 minutes</option>
                  <option value="12-15">12-15 minutes</option>
                  <option value="15-20">15-20 minutes</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={generateContent}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" />
                  Generating Complete Video Package...
                </span>
              ) : (
                'Generate Video Content'
              )}
            </button>
          </div>
        </div>

        {content && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Generated Content</h2>
                <div className="flex gap-3">
                  <button
                    onClick={downloadAsText}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download TXT
                  </button>
                  <button
                    onClick={downloadAsJSON}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download JSON
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Idea Section */}
                <section className="border-l-4 border-purple-500 pl-6">
                  <div className="flex items-center mb-4">
                    <Video className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Video Idea</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <span className="font-semibold">Title:</span> {content.idea.title}
                    </div>
                    <div>
                      <span className="font-semibold">Concept:</span> {content.idea.concept}
                    </div>
                    <div>
                      <span className="font-semibold">Target Audience:</span> {content.idea.targetAudience}
                    </div>
                    <div>
                      <span className="font-semibold">Estimated Length:</span> {content.idea.estimatedLength}
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <span className="font-semibold">Hook:</span> {content.idea.hook}
                    </div>
                  </div>
                </section>

                {/* Script Section */}
                <section className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Script</h3>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Intro</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{content.script.intro}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Main Content</h4>
                      {content.script.mainContent.map((section, i) => (
                        <p key={i} className="text-gray-700 mb-3 whitespace-pre-wrap">
                          {section}
                        </p>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Conclusion</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{content.script.conclusion}</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded">
                      <h4 className="font-semibold text-lg mb-2">Call to Action</h4>
                      <p className="text-gray-700">{content.script.cta}</p>
                    </div>
                  </div>
                </section>

                {/* Visual Guide Section */}
                <section className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center mb-4">
                    <Image className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Visual Guide</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">Thumbnail</h4>
                      <div className="space-y-2">
                        <div><span className="font-semibold">Description:</span> {content.visualGuide.thumbnail.description}</div>
                        <div><span className="font-semibold">Text Overlay:</span> {content.visualGuide.thumbnail.textOverlay}</div>
                        <div><span className="font-semibold">Color Scheme:</span> {content.visualGuide.thumbnail.colorScheme}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">Scenes</h4>
                      <div className="space-y-4">
                        {content.visualGuide.scenes.map((scene, i) => (
                          <div key={i} className="border-l-4 border-green-400 pl-4 py-2">
                            <div className="font-semibold text-purple-700 mb-1">
                              Scene {i + 1} [{scene.timestamp}]
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              Type: {scene.visualType}
                            </div>
                            <div className="text-gray-700 mb-2">{scene.description}</div>
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <div className="text-xs font-semibold text-gray-500 mb-1">
                                Image Generation Prompt:
                              </div>
                              <div className="text-sm text-gray-700">{scene.prompt}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Voiceover Section */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <div className="flex items-center mb-4">
                    <Mic className="w-6 h-6 text-yellow-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Voiceover Guide</h3>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg space-y-4">
                    <div>
                      <span className="font-semibold">Pacing:</span> {content.voiceover.pacing}
                    </div>
                    <div>
                      <span className="font-semibold">Tone:</span> {content.voiceover.tone}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Segments</h4>
                      <div className="space-y-3">
                        {content.voiceover.segments.map((seg, i) => (
                          <div key={i} className="bg-white p-4 rounded-lg border border-yellow-200">
                            <div className="text-gray-700 mb-2">{seg.text}</div>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>Emotion: {seg.emotion}</span>
                              <span>Pause: {seg.pauseAfter}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Editing Instructions Section */}
                <section className="border-l-4 border-red-500 pl-6">
                  <div className="flex items-center mb-4">
                    <Edit3 className="w-6 h-6 text-red-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Editing Instructions</h3>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg space-y-4">
                    <div>
                      <span className="font-semibold">Pacing:</span> {content.editingInstructions.pacing}
                    </div>
                    <div>
                      <span className="font-semibold">Transitions:</span> {content.editingInstructions.transitions.join(', ')}
                    </div>
                    <div>
                      <span className="font-semibold">Color Grading:</span> {content.editingInstructions.colorGrading}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Effects & Graphics</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {content.editingInstructions.effectsAndGraphics.map((effect, i) => (
                          <li key={i} className="text-gray-700">{effect}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Music Suggestions</h4>
                      <div className="space-y-2">
                        {content.editingInstructions.musicSuggestions.map((music, i) => (
                          <div key={i} className="bg-white p-3 rounded">
                            <span className="font-semibold">{music.section}:</span> {music.mood} ({music.volume})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Metadata Section */}
                <section className="border-l-4 border-indigo-500 pl-6">
                  <div className="flex items-center mb-4">
                    <Tag className="w-6 h-6 text-indigo-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Metadata</h3>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
                    <div>
                      <span className="font-semibold">Title:</span> {content.metadata.title}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-gray-700 whitespace-pre-wrap bg-white p-4 rounded">
                        {content.metadata.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {content.metadata.tags.map((tag, i) => (
                          <span key={i} className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {content.metadata.category}
                    </div>
                    <div>
                      <span className="font-semibold">Best Posting Time:</span> {content.metadata.bestPostingTime}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Playlist Suggestions</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {content.metadata.playlist_suggestions.map((playlist, i) => (
                          <li key={i} className="text-gray-700">{playlist}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
