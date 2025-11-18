import { NextResponse } from 'next/server';

interface GenerateRequest {
  topic: string;
  style: string;
  duration: string;
}

export async function POST(request: Request) {
  try {
    const { topic, style, duration }: GenerateRequest = await request.json();

    if (!topic || !style || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate comprehensive video content
    const content = generateVideoContent(topic, style, duration);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

function generateVideoContent(topic: string, style: string, duration: string) {
  const durationNum = parseInt(duration.split('-')[0]);
  const wordCount = durationNum * 150; // ~150 words per minute

  // Generate video idea
  const idea = {
    title: generateTitle(topic, style),
    concept: generateConcept(topic, style),
    targetAudience: generateTargetAudience(topic, style),
    estimatedLength: `${duration} minutes`,
    hook: generateHook(topic, style),
  };

  // Generate script
  const script = generateScript(topic, style, wordCount);

  // Generate visual guide
  const visualGuide = generateVisualGuide(topic, style, duration);

  // Generate voiceover guide
  const voiceover = generateVoiceoverGuide(script, style);

  // Generate editing instructions
  const editingInstructions = generateEditingInstructions(style, duration);

  // Generate metadata
  const metadata = generateMetadata(topic, style, idea.title);

  return {
    idea,
    script,
    visualGuide,
    voiceover,
    editingInstructions,
    metadata,
  };
}

function generateTitle(topic: string, style: string): string {
  const templates = {
    educational: [
      `The Science Behind ${topic}`,
      `Understanding ${topic}: A Complete Guide`,
      `${topic} Explained: Everything You Need to Know`,
      `What Everyone Gets Wrong About ${topic}`,
    ],
    entertainment: [
      `${topic}: You Won't Believe What Happens!`,
      `The Truth About ${topic} Will Shock You`,
      `I Tried ${topic} For 30 Days...`,
      `${topic}: The Ultimate Experience`,
    ],
    tutorial: [
      `How to Master ${topic} in 2025`,
      `Complete ${topic} Tutorial for Beginners`,
      `${topic}: Step-by-Step Guide`,
      `Learn ${topic} in ${Math.floor(Math.random() * 10) + 5} Minutes`,
    ],
    vlog: [
      `My Experience with ${topic}`,
      `A Day in the Life: ${topic} Edition`,
      `${topic} Changed My Life`,
      `Trying ${topic} for the First Time`,
    ],
    documentary: [
      `${topic}: An In-Depth Investigation`,
      `The Untold Story of ${topic}`,
      `${topic}: Past, Present, and Future`,
      `Inside the World of ${topic}`,
    ],
    review: [
      `${topic} Review: Is It Worth It?`,
      `Honest ${topic} Review (2025)`,
      `${topic} - The Good, The Bad, and The Ugly`,
      `I Tested ${topic} So You Don't Have To`,
    ],
  };

  const styleTemplates = templates[style as keyof typeof templates] || templates.educational;
  return styleTemplates[Math.floor(Math.random() * styleTemplates.length)];
}

function generateConcept(topic: string, style: string): string {
  const concepts = {
    educational: `An in-depth educational exploration of ${topic}, breaking down complex concepts into digestible segments while maintaining scientific accuracy and viewer engagement.`,
    entertainment: `An entertaining deep dive into ${topic} that combines humor, surprise elements, and engaging storytelling to keep viewers hooked from start to finish.`,
    tutorial: `A comprehensive, step-by-step tutorial on ${topic} designed to take viewers from beginner to confident practitioner through clear demonstrations and practical examples.`,
    vlog: `A personal journey documenting real experiences with ${topic}, sharing authentic reactions, challenges, and insights in a relatable, conversational format.`,
    documentary: `A cinematic documentary examining ${topic} through expert interviews, historical context, and compelling visual storytelling to reveal deeper truths.`,
    review: `An honest, detailed review of ${topic} covering key features, pros and cons, real-world testing, and a final verdict to help viewers make informed decisions.`,
  };

  return concepts[style as keyof typeof concepts] || concepts.educational;
}

function generateTargetAudience(topic: string, style: string): string {
  const audiences = {
    educational: 'Curious learners, students, and knowledge seekers aged 18-45 who value in-depth explanations and scientific accuracy',
    entertainment: 'General audiences aged 16-35 looking for engaging, shareable content that combines information with entertainment',
    tutorial: 'Beginners and intermediate learners actively seeking to develop new skills or solve specific problems',
    vlog: 'Young adults aged 18-35 who enjoy authentic, personal content and relatable experiences',
    documentary: 'Thoughtful viewers aged 25-55 interested in deep dives, investigative content, and compelling narratives',
    review: 'Potential buyers and enthusiasts researching purchases or comparing options, typically aged 20-45',
  };

  return audiences[style as keyof typeof audiences] || audiences.educational;
}

function generateHook(topic: string, style: string): string {
  const hooks = {
    educational: `"Did you know that ${topic} could completely change the way you think about reality? In the next few minutes, I'll show you something that most people never learn."`,
    entertainment: `"I thought I knew everything about ${topic}... until this happened. What you're about to see will blow your mind."`,
    tutorial: `"Stop wasting time with complicated methods. I'm going to show you the fastest way to master ${topic} - and it's easier than you think."`,
    vlog: `"So I decided to try ${topic}, and honestly, I wasn't prepared for what happened next. Let me take you through this journey."`,
    documentary: `"Beneath the surface of ${topic} lies a story that few people know. Today, we're uncovering the truth."`,
    review: `"I spent the last month testing ${topic}, and the results were not what I expected. Here's everything you need to know before you decide."`,
  };

  return hooks[style as keyof typeof hooks] || hooks.educational;
}

function generateScript(topic: string, style: string, wordCount: number) {
  const intro = generateIntro(topic, style);
  const mainContent = generateMainContent(topic, style, wordCount);
  const conclusion = generateConclusion(topic, style);
  const cta = generateCTA(style);

  const fullScript = `${intro}\n\n${mainContent.join('\n\n')}\n\n${conclusion}\n\n${cta}`;

  return {
    intro,
    mainContent,
    conclusion,
    cta,
    fullScript,
  };
}

function generateIntro(topic: string, style: string): string {
  return `[INTRO - 0:00-0:30]

Hey everyone! Today we're diving into something fascinating: ${topic}.

${generateHook(topic, style)}

Whether you're completely new to this or you've been curious about it for a while, this video will give you exactly what you need. We're going to cover everything from the basics to some advanced insights that most people miss.

So let's jump right in!`;
}

function generateMainContent(topic: string, style: string, wordCount: number): string[] {
  const sections = [
    `[SECTION 1: FOUNDATION]

First, let's establish what ${topic} actually is and why it matters.

${topic} represents a fascinating intersection of multiple concepts. At its core, it's about understanding how different elements come together to create something greater than the sum of their parts.

The key thing to understand is that ${topic} isn't just theoretical - it has real, practical applications that affect our daily lives. Research has shown that people who understand ${topic} are better equipped to make informed decisions and navigate complex situations.

Let me break this down with a concrete example: Imagine you're faced with a common scenario where ${topic} comes into play. Most people would approach it one way, but understanding the underlying principles reveals a much more effective path.`,

    `[SECTION 2: DEEP DIVE]

Now that we've covered the basics, let's go deeper into the mechanics of ${topic}.

There are three critical components you need to understand:

First, the structural element. This is the foundation that everything else builds upon. Without a solid grasp of this, the rest won't make sense.

Second, the dynamic element. This is where things get interesting because it shows how ${topic} evolves and adapts in different contexts. It's not static - it's constantly changing based on various factors.

Third, the practical application element. This is where theory meets reality. Understanding how to actually implement ${topic} in real-world situations is what separates surface-level knowledge from true expertise.

Each of these components interacts with the others in complex ways, creating a system that's both elegant and powerful.`,

    `[SECTION 3: PRACTICAL APPLICATION]

So how do you actually use this information?

Let me walk you through a step-by-step process that you can start using immediately.

Step 1: Assessment. You need to evaluate your current situation and identify where ${topic} is relevant. Look for specific indicators that signal an opportunity to apply these principles.

Step 2: Planning. Once you've identified the opportunity, create a strategic approach. Don't rush this - good planning prevents problems later.

Step 3: Implementation. This is where you take action. Start small, test your approach, and be ready to adjust based on the results you're seeing.

Step 4: Evaluation. After implementing, take time to assess what worked and what didn't. This feedback loop is crucial for continuous improvement.

The beautiful thing about this process is that it scales. Whether you're dealing with something small or a major undertaking, these same principles apply.`,

    `[SECTION 4: COMMON MISTAKES]

Before we wrap up, let me share some common mistakes people make with ${topic} - and how to avoid them.

Mistake #1: Moving too fast. I see this all the time. People get excited and skip crucial foundational steps. This always leads to problems down the line. Take your time and build properly.

Mistake #2: Ignoring context. What works in one situation might not work in another. Always consider the specific circumstances you're dealing with.

Mistake #3: Stopping too soon. ${topic} requires consistent effort. The people who see the best results are those who stick with it even when initial progress seems slow.

Mistake #4: Not seeking feedback. Working in isolation limits your growth. Get input from others, test your assumptions, and be willing to adjust your approach.

Avoiding these mistakes will put you ahead of 90% of people trying to work with ${topic}.`,
  ];

  return sections;
}

function generateConclusion(topic: string, style: string): string {
  return `[CONCLUSION]

So there you have it - a complete overview of ${topic}.

Let's recap the key points:

We started by understanding the fundamental principles and why ${topic} matters. Then we explored the deeper mechanics and how different components work together. We covered practical applications you can start using today, and we discussed common mistakes to avoid.

The most important takeaway is this: ${topic} is accessible to anyone willing to learn and apply these principles. You don't need to be an expert to get started - you just need to take that first step.

Remember, the difference between someone who succeeds with ${topic} and someone who doesn't often comes down to consistent application and a willingness to learn from experience.`;
}

function generateCTA(style: string): string {
  const ctas = [
    `If you found this valuable, please hit that like button and subscribe for more content like this. Drop a comment below and let me know what aspect of this topic you'd like me to explore next.

And if you want to dive even deeper, check out the resources I've linked in the description below. They'll help you take your understanding to the next level.

Thanks for watching, and I'll see you in the next video!`,

    `Before you go, make sure you're subscribed so you don't miss future videos. I've got some exciting content coming up that builds on what we discussed today.

Also, if you have questions or want to share your own experiences, the comment section is the place. I read every comment and love hearing from you.

Thanks for being here, and until next time, keep learning and growing!`,
  ];

  return ctas[Math.floor(Math.random() * ctas.length)];
}

function generateVisualGuide(topic: string, style: string, duration: string) {
  return {
    thumbnail: {
      description: `Eye-catching thumbnail featuring bold text overlay, vibrant colors, and engaging visual elements related to ${topic}. Should include a human face showing emotion (surprise, excitement, or curiosity) to increase click-through rate.`,
      textOverlay: `${topic.toUpperCase().slice(0, 30)}${topic.length > 30 ? '...' : ''}`,
      colorScheme: 'High contrast with bright accent colors (orange/yellow) on dark background, or vice versa',
    },
    scenes: generateScenes(topic, style, duration),
  };
}

function generateScenes(topic: string, style: string, duration: string) {
  return [
    {
      timestamp: '0:00-0:05',
      description: 'Attention-grabbing opening shot',
      visualType: 'B-roll with text overlay',
      prompt: `Cinematic establishing shot related to ${topic}, dynamic movement, professional lighting, 4K quality, vibrant colors`,
    },
    {
      timestamp: '0:05-0:30',
      description: 'Host introduction with engaging background',
      visualType: 'Talking head with graphics',
      prompt: `Professional presenter in modern studio setup, engaging expression, clean background, soft lighting, shallow depth of field`,
    },
    {
      timestamp: '0:30-1:00',
      description: 'Visual explanation of core concept',
      visualType: 'Animated graphics and diagrams',
      prompt: `Clean, modern infographic explaining ${topic}, animated elements, professional design, blue and white color scheme, easy to understand`,
    },
    {
      timestamp: '1:00-2:00',
      description: 'Detailed breakdown with visual aids',
      visualType: 'Mixed media (graphics, B-roll, screen recordings)',
      prompt: `Multiple visual elements showing practical examples of ${topic}, split screen layouts, dynamic transitions, professional quality`,
    },
    {
      timestamp: '2:00-3:00',
      description: 'Real-world application demonstration',
      visualType: 'B-roll footage with overlays',
      prompt: `Real-world scenario demonstrating ${topic} in action, natural lighting, documentary style, authentic setting`,
    },
    {
      timestamp: '3:00-4:00',
      description: 'Key insights and tips',
      visualType: 'Graphics with voiceover',
      prompt: `Numbered list animation showing key points about ${topic}, clean design, smooth animations, easy to read text`,
    },
    {
      timestamp: '4:00-5:00',
      description: 'Common mistakes section',
      visualType: 'Split screen comparisons',
      prompt: `Side-by-side comparison showing right vs wrong approaches to ${topic}, clear labeling, red X and green checkmark indicators`,
    },
    {
      timestamp: '5:00-6:00',
      description: 'Conclusion and recap',
      visualType: 'Host on camera with summary graphics',
      prompt: `Presenter with overlay graphics summarizing main points, warm lighting, confident pose, professional setting`,
    },
    {
      timestamp: '6:00-end',
      description: 'Call to action and end screen',
      visualType: 'Animated end screen with subscribe button',
      prompt: `Colorful animated end screen with subscribe button, related video thumbnails, social media icons, modern design, engaging animations`,
    },
  ];
}

function generateVoiceoverGuide(script: any, style: string) {
  const segments = [
    {
      text: 'Opening hook (first 10 seconds)',
      emotion: 'Excited, energetic, attention-grabbing',
      pauseAfter: '0.5s',
    },
    {
      text: 'Introduction and topic setup',
      emotion: 'Friendly, welcoming, conversational',
      pauseAfter: '0.8s',
    },
    {
      text: 'Main content explanation',
      emotion: 'Clear, authoritative, teaching tone',
      pauseAfter: '0.6s between major points',
    },
    {
      text: 'Practical examples and demonstrations',
      emotion: 'Engaging, enthusiastic, encouraging',
      pauseAfter: '0.5s',
    },
    {
      text: 'Common mistakes section',
      emotion: 'Warning tone, serious but supportive',
      pauseAfter: '0.7s',
    },
    {
      text: 'Conclusion and key takeaways',
      emotion: 'Confident, inspiring, motivational',
      pauseAfter: '0.8s',
    },
    {
      text: 'Call to action',
      emotion: 'Friendly, inviting, appreciative',
      pauseAfter: '1.0s',
    },
  ];

  const pacing = style === 'documentary' ? 'Slower, more deliberate pacing with longer pauses' :
                 style === 'entertainment' ? 'Fast-paced, energetic with quick transitions' :
                 'Moderate pacing with strategic pauses for emphasis';

  const tone = {
    educational: 'Clear, authoritative yet approachable, like a knowledgeable friend explaining',
    entertainment: 'Energetic, dynamic, with emotional variation and excitement',
    tutorial: 'Patient, instructional, encouraging with emphasis on clarity',
    vlog: 'Casual, authentic, conversational like talking to a friend',
    documentary: 'Measured, thoughtful, professional with gravitas',
    review: 'Balanced, analytical, honest with enthusiasm for good points',
  }[style] || 'Clear and engaging';

  return {
    pacing,
    tone,
    segments,
  };
}

function generateEditingInstructions(style: string, duration: string) {
  const instructions = {
    educational: {
      pacing: 'Moderate pacing with 3-5 second cuts. Allow concepts to breathe.',
      transitions: ['Simple cuts', 'Subtle dissolves for topic changes', 'Zoom transitions for emphasis'],
      colorGrading: 'Clean, bright look with slightly boosted saturation. Maintain natural skin tones.',
    },
    entertainment: {
      pacing: 'Fast pacing with 1-3 second cuts. Keep energy high throughout.',
      transitions: ['Quick cuts', 'Whip pans', 'Zoom transitions', 'Glitch effects'],
      colorGrading: 'Vibrant, punchy colors with high contrast. Music video aesthetic.',
    },
    tutorial: {
      pacing: 'Deliberate pacing with 4-6 second cuts. Clarity over speed.',
      transitions: ['Simple cuts', 'Wipes for step changes', 'Arrows and callouts'],
      colorGrading: 'Clean, neutral look that doesn\'t distract from content.',
    },
    vlog: {
      pacing: 'Natural pacing with 2-4 second cuts. Match the conversational flow.',
      transitions: ['Jump cuts', 'Simple cuts', 'Occasional smooth transitions'],
      colorGrading: 'Warm, inviting look with soft highlights. Slightly desaturated for authenticity.',
    },
    documentary: {
      pacing: 'Slow, deliberate pacing with 5-8 second cuts. Let moments resonate.',
      transitions: ['Slow dissolves', 'Fade to black', 'J-cuts and L-cuts for interviews'],
      colorGrading: 'Cinematic look with teal and orange color palette. Rich shadows.',
    },
    review: {
      pacing: 'Moderate pacing with 3-4 second cuts. Balance detail with engagement.',
      transitions: ['Simple cuts', 'Wipes between features', 'Split screens for comparisons'],
      colorGrading: 'Accurate, neutral colors for product representation.',
    },
  };

  const styleInstructions = instructions[style as keyof typeof instructions] || instructions.educational;

  return {
    pacing: styleInstructions.pacing,
    transitions: styleInstructions.transitions,
    musicSuggestions: [
      { section: 'Intro (0:00-0:30)', mood: 'Upbeat, attention-grabbing', volume: 'Medium, duck under dialogue' },
      { section: 'Main Content', mood: 'Subtle background, non-intrusive', volume: 'Low, -20dB under voice' },
      { section: 'Key Moments', mood: 'Building tension or excitement', volume: 'Medium during pauses' },
      { section: 'Outro', mood: 'Uplifting, memorable', volume: 'Medium, fade out at end' },
    ],
    effectsAndGraphics: [
      'Lower thirds with name/title (consistent design)',
      'Animated text for key points',
      'Progress bar or chapter markers',
      'Callout boxes for important information',
      'Smooth zoom animations on important visuals',
      'Sound effects for transitions and emphasis',
      'Background blur when text is prominent',
      'Icon animations to illustrate concepts',
    ],
    colorGrading: styleInstructions.colorGrading,
  };
}

function generateMetadata(topic: string, style: string, title: string) {
  const tags = generateTags(topic, style);
  const category = {
    educational: 'Education',
    entertainment: 'Entertainment',
    tutorial: 'Howto & Style',
    vlog: 'People & Blogs',
    documentary: 'Documentary',
    review: 'Science & Technology',
  }[style] || 'Education';

  const description = `🎯 In this video, we explore ${topic} in depth!

${title}

⏱️ TIMESTAMPS:
0:00 - Introduction
0:30 - What is ${topic}?
2:00 - Deep dive into key concepts
4:00 - Practical applications
5:30 - Common mistakes to avoid
7:00 - Conclusion and key takeaways

🔑 KEY POINTS:
• Comprehensive overview of ${topic}
• Practical examples and applications
• Expert insights and tips
• Common mistakes and how to avoid them

📚 RESOURCES:
Links to additional resources, tools, and references mentioned in the video.

💬 Let me know in the comments what you think about ${topic}! What topics should I cover next?

🔔 Don't forget to subscribe and hit the notification bell so you never miss a video!

📱 CONNECT WITH ME:
Instagram: @yourusername
Twitter: @yourusername
Website: yourwebsite.com

#${topic.replace(/\s+/g, '')} ${tags.slice(0, 5).map(t => '#' + t.replace(/\s+/g, '')).join(' ')}

---
Video created with passion for curious minds! 🧠✨`;

  return {
    title,
    description,
    tags,
    category,
    thumbnail_text: title.split(':')[0].slice(0, 50),
    bestPostingTime: getBestPostingTime(style),
    playlist_suggestions: [
      `${topic} Series`,
      `${style.charAt(0).toUpperCase() + style.slice(1)} Content`,
      'Popular Videos',
      'Beginner Guides',
    ],
  };
}

function generateTags(topic: string, style: string): string[] {
  const topicWords = topic.toLowerCase().split(' ').filter(w => w.length > 3);
  const baseTags = [
    topic,
    ...topicWords,
    style,
    '2025',
    'tutorial',
    'guide',
    'how to',
    'explained',
    'complete guide',
    'for beginners',
    'tips',
    'tricks',
    'best practices',
    'learn',
    'educational',
    'informative',
  ];

  // Remove duplicates and return first 30
  return [...new Set(baseTags)].slice(0, 30);
}

function getBestPostingTime(style: string): string {
  const times = {
    educational: 'Weekdays 2-4 PM EST (after school/work)',
    entertainment: 'Weekends 12-3 PM EST (peak leisure time)',
    tutorial: 'Weekdays 6-8 PM EST (evening learning time)',
    vlog: 'Evenings 7-9 PM EST (relaxation time)',
    documentary: 'Weekends 8-10 PM EST (prime viewing time)',
    review: 'Weekdays 12-2 PM EST (lunch break research)',
  };

  return times[style as keyof typeof times] || times.educational;
}
