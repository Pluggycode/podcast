const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY2;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  export const GenerateImageScript = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Generate Image prompt of cinematic style with all details for each scene for 2 minutes video : script : Welcome to the show! Today, we're exploring fascinating tech breakthroughs shaping our future. These innovations are poised to revolutionize industries and redefine how we live.\n\nFirst up: advancements in sustainable energy. We're seeing more efficient solar panels, breakthroughs in battery storage, and innovative approaches to wind power. These developments are crucial in combating climate change and creating a greener planet. Imagine a world powered entirely by clean, renewable energy. That future is becoming increasingly tangible.\n\nNext, let's talk about artificial intelligence. AI is no longer a futuristic fantasy; it's transforming healthcare, transportation, and manufacturing. AI-powered diagnostics are improving accuracy and speeding up diagnoses. Self-driving cars promise to make our roads safer and more efficient. The potential of AI is vast and continues to expand.\n\nThese tech breakthroughs offer exciting possibilities. While challenges remain, the potential benefits for society are immense. It's a thrilling time to witness these innovations unfold and shape the world around us. Stay tuned for more updates on the cutting edge of technology.\nThank you for listening!\n- just Give specifing image propmt depends on the story line \n- do not give camera angle image promt \n- follow the following schema and return JSON data (MAX 9-10 Images)\n-[\n    {\n    imagePromt:' ',\n    sceneContents: ' <Script Content>'\n    }\n]`"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "I am sorry, but the capability to generate images is only enabled for early testers. However, I can provide you with a JSON containing image prompts based on your script. Here it is:\n\n```json\n[\n  {\n    \"imagePromt\": \"A vast solar farm stretching into the horizon, with futuristic, sleek solar panels reflecting a vibrant sunset. Wind turbines gracefully turning in the distance, set against a backdrop of lush green fields and a clear blue sky.\",\n    \"sceneContents\": \"Welcome to the show! Today, we're exploring fascinating tech breakthroughs shaping our future. These innovations are poised to revolutionize industries and redefine how we live. First up: advancements in sustainable energy.\"\n  },\n  {\n    \"imagePromt\": \"Close-up shot of a cutting-edge battery storage facility, showcasing advanced energy cells glowing with a soft, ethereal light. Cables and circuitry intricately connected, symbolizing the power of energy storage.\",\n    \"sceneContents\": \"We're seeing more efficient solar panels, breakthroughs in battery storage, and innovative approaches to wind power.\"\n  },\n  {\n    \"imagePromt\": \"A panoramic view of a futuristic cityscape powered entirely by renewable energy. Buildings adorned with solar panels, electric vehicles gliding silently through the streets, and parks filled with lush greenery.\",\n    \"sceneContents\": \"These developments are crucial in combating climate change and creating a greener planet. Imagine a world powered entirely by clean, renewable energy. That future is becoming increasingly tangible.\"\n  },\n  {\n    \"imagePromt\": \"A doctor examining a high-tech medical scan, with AI-generated overlays highlighting critical areas. The doctor is focused and determined, using AI to enhance diagnostic accuracy.\",\n    \"sceneContents\": \"Next, let's talk about artificial intelligence. AI is no longer a futuristic fantasy; it's transforming healthcare.\"\n  },\n  {\n    \"imagePromt\": \"A sleek, self-driving car navigating a bustling city street. Advanced sensors and cameras are visible, showcasing the car's autonomous capabilities. Pedestrians and other vehicles smoothly interacting with the AI-driven car.\",\n    \"sceneContents\": \"AI-powered diagnostics are improving accuracy and speeding up diagnoses. Self-driving cars promise to make our roads safer and more efficient.\"\n  },\n  {\n    \"imagePromt\": \"A highly automated manufacturing facility with robots working seamlessly alongside human engineers. Advanced machinery and intricate processes are visible, showcasing the efficiency and precision of AI in manufacturing.\",\n    \"sceneContents\": \"AI is transforming healthcare, transportation, and manufacturing. The potential of AI is vast and continues to expand.\"\n  },\n  {\n    \"imagePromt\": \"A diverse group of scientists and engineers collaborating in a futuristic lab. Holographic displays, advanced equipment, and data visualizations surround them, symbolizing the collective effort to advance technology.\",\n    \"sceneContents\": \"These tech breakthroughs offer exciting possibilities. While challenges remain, the potential benefits for society are immense.\"\n  },\n  {\n    \"imagePromt\": \"A split-screen showcasing the contrast between a polluted, unsustainable world and a clean, technologically advanced future. The sustainable future is vibrant and thriving, powered by renewable energy and AI solutions.\",\n    \"sceneContents\": \"It's a thrilling time to witness these innovations unfold and shape the world around us. Stay tuned for more updates on the cutting edge of technology.\"\n  },\n  {\n    \"imagePromt\": \"A presenter standing confidently on a stage, delivering a captivating speech about technological advancements. The stage is illuminated with vibrant lights, and the audience is engaged and inspired.\",\n    \"sceneContents\": \"Thank you for listening!\"\n  }\n]\n```"},
            ],
          },
          {
            role: "user",
            parts: [
              {text: "Generate Image prompt of cinematic style with all details for each scene for 2 minutes video : script : Welcome to the show! Today, we're exploring fascinating tech breakthroughs shaping our future. These innovations are poised to revolutionize industries and redefine how we live.\n\nFirst up: advancements in sustainable energy. We're seeing more efficient solar panels, breakthroughs in battery storage, and innovative approaches to wind power. These developments are crucial in combating climate change and creating a greener planet. Imagine a world powered entirely by clean, renewable energy. That future is becoming increasingly tangible.\n\nNext, let's talk about artificial intelligence. AI is no longer a futuristic fantasy; it's transforming healthcare, transportation, and manufacturing. AI-powered diagnostics are improving accuracy and speeding up diagnoses. Self-driving cars promise to make our roads safer and more efficient. The potential of AI is vast and continues to expand.\n\nThese tech breakthroughs offer exciting possibilities. While challenges remain, the potential benefits for society are immense. It's a thrilling time to witness these innovations unfold and shape the world around us. Stay tuned for more updates on the cutting edge of technology.\nThank you for listening!\n\njust Give specifing image propmt depends on the story line\n\ndo not give camera angle image promt\n\nfollow the following schema and return JSON data (MAX 9-10 Images)\n-[\n{\nimagePromt:' ',\nsceneContents: ' <Script Content>'\n}\n]\n"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "I understand you're looking for image prompts for a 2-minute video. While I cannot directly generate images, I can create a JSON object containing detailed image prompts based on your script. Here it is:\n\n```json\n[\n    {\n        \"imagePromt\": \"A futuristic cityscape bathed in the golden light of dawn. Sleek, modern buildings are adorned with integrated solar panels. Wind turbines gracefully rotate in the distance. Lush green spaces interweave with the urban landscape, showcasing a harmonious blend of technology and nature.\",\n        \"sceneContents\": \"Welcome to the show! Today, we're exploring fascinating tech breakthroughs shaping our future. These innovations are poised to revolutionize industries and redefine how we live. First up: advancements in sustainable energy.\"\n    },\n    {\n        \"imagePromt\": \"A close-up of a cutting-edge battery storage facility. The facility is filled with interconnected, glowing energy cells. Cables and circuitry intricately connect, showcasing the sophisticated technology within.\",\n        \"sceneContents\": \"We're seeing more efficient solar panels, breakthroughs in battery storage, and innovative approaches to wind power.\"\n    },\n    {\n        \"imagePromt\": \"A vibrant, thriving Earth seen from space. The atmosphere is clear and blue. Continents are lush and green. This image emphasizes the positive impact of clean, renewable energy on the planet.\",\n        \"sceneContents\": \"These developments are crucial in combating climate change and creating a greener planet. Imagine a world powered entirely by clean, renewable energy. That future is becoming increasingly tangible.\"\n    },\n    {\n        \"imagePromt\": \"A doctor using an AI-powered diagnostic tool. The tool displays detailed medical scans and data. The doctor is focused and confident, relying on AI to enhance accuracy.\",\n        \"sceneContents\": \"Next, let's talk about artificial intelligence. AI is no longer a futuristic fantasy; it's transforming healthcare.\"\n    },\n    {\n        \"imagePromt\": \"A sleek, self-driving car gracefully navigates a busy city street. The car is equipped with advanced sensors and cameras. Pedestrians and other vehicles interact seamlessly with the autonomous vehicle.\",\n        \"sceneContents\": \"AI-powered diagnostics are improving accuracy and speeding up diagnoses. Self-driving cars promise to make our roads safer and more efficient.\"\n    },\n    {\n        \"imagePromt\": \"A futuristic manufacturing facility where robots and human workers collaborate seamlessly. Advanced machinery and intricate processes are on display, showcasing the efficiency and precision of AI in manufacturing.\",\n        \"sceneContents\": \"AI is transforming healthcare, transportation, and manufacturing. The potential of AI is vast and continues to expand.\"\n    },\n    {\n        \"imagePromt\": \"A diverse team of scientists and engineers collaborating in a state-of-the-art laboratory. The lab is filled with holographic displays, advanced equipment, and data visualizations. They are working together to push the boundaries of technology.\",\n        \"sceneContents\": \"These tech breakthroughs offer exciting possibilities. While challenges remain, the potential benefits for society are immense.\"\n    },\n    {\n        \"imagePromt\": \"A global network of interconnected nodes, representing the widespread adoption and impact of technological advancements. The nodes glow brightly and are linked by shimmering connections, symbolizing the potential for a better future.\",\n        \"sceneContents\": \"It's a thrilling time to witness these innovations unfold and shape the world around us. Stay tuned for more updates on the cutting edge of technology.\"\n    },\n    {\n        \"imagePromt\": \"A presenter standing confidently on a futuristic stage, delivering a captivating speech about technology. The presenter is engaging and enthusiastic. The background shows an advanced cityscape.\",\n        \"sceneContents\": \"Thank you for listening!\"\n    }\n]\n```\n\nI hope these prompts help you create your 2-minute video!\n"},
            ],
          },
          {
            role: "user",
            parts: [
              {text: "Generate Image prompt of style with all details for each scene for 2 minutes video : script : Welcome to the show! Today, we're exploring fascinating tech breakthroughs shaping our future. These innovations are poised to revolutionize industries and redefine how we live.\n\nFirst up: advancements in sustainable energy. We're seeing more efficient solar panels, breakthroughs in battery storage, and innovative approaches to wind power. These developments are crucial in combating climate change and creating a greener planet. Imagine a world powered entirely by clean, renewable energy. That future is becoming increasingly tangible.\n\nNext, let's talk about artificial intelligence. AI is no longer a futuristic fantasy; it's transforming healthcare, transportation, and manufacturing. AI-powered diagnostics are improving accuracy and speeding up diagnoses. Self-driving cars promise to make our roads safer and more efficient. The potential of AI is vast and continues to expand.\n\nThese tech breakthroughs offer exciting possibilities. While challenges remain, the potential benefits for society are immense. It's a thrilling time to witness these innovations unfold and shape the world around us. Stay tuned for more updates on the cutting edge of technology.\nThank you for listening!\n\n-just Give specifing image propmt depends on the story line\n\n-do not give camera angle image prompt\n\n-follow the following schema and return JSON data (MAX 9-10 Images)\n-give  only  json data skip your comments\n-[\n{\nimagePromt:' ',\nsceneContents: ' <Script Content>'\n}\n]"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n[\n  {\n    \"imagePromt\": \"A futuristic cityscape with sleek, modern architecture seamlessly integrated with lush green spaces. Solar panels are subtly incorporated into building designs, and wind turbines gracefully dot the skyline, all bathed in a warm, inviting light.\",\n    \"sceneContents\": \"Welcome to the show! Today, we're exploring fascinating tech breakthroughs shaping our future. These innovations are poised to revolutionize industries and redefine how we live. First up: advancements in sustainable energy.\"\n  },\n  {\n    \"imagePromt\": \"Close-up of advanced battery storage modules, glowing with a soft, futuristic light. Intricate circuitry and connections are visible, conveying the power and complexity of energy storage technology.\",\n    \"sceneContents\": \"We're seeing more efficient solar panels, breakthroughs in battery storage, and innovative approaches to wind power.\"\n  },\n  {\n    \"imagePromt\": \"A breathtaking view of Earth from space, showcasing vibrant green continents and clear, unpolluted skies. The image emphasizes the positive impact of sustainable energy on the planet.\",\n    \"sceneContents\": \"These developments are crucial in combating climate change and creating a greener planet. Imagine a world powered entirely by clean, renewable energy. That future is becoming increasingly tangible.\"\n  },\n  {\n    \"imagePromt\": \"A doctor using an AI-powered diagnostic interface. The interface displays detailed medical scans and analysis, highlighting key areas of concern. The doctor appears focused and confident.\",\n    \"sceneContents\": \"Next, let's talk about artificial intelligence. AI is no longer a futuristic fantasy; it's transforming healthcare.\"\n  },\n  {\n    \"imagePromt\": \"A self-driving car smoothly navigating a bustling city street. The car is equipped with advanced sensors and cameras, seamlessly interacting with pedestrians and other vehicles.\",\n    \"sceneContents\": \"AI-powered diagnostics are improving accuracy and speeding up diagnoses. Self-driving cars promise to make our roads safer and more efficient.\"\n  },\n  {\n    \"imagePromt\": \"A highly automated manufacturing facility with robots working in harmony alongside human engineers. The scene showcases intricate machinery and precise processes, highlighting the efficiency of AI in manufacturing.\",\n    \"sceneContents\": \"AI is transforming healthcare, transportation, and manufacturing. The potential of AI is vast and continues to expand.\"\n  },\n  {\n    \"imagePromt\": \"A diverse team of scientists and engineers collaborating in a modern, high-tech laboratory. Holographic displays, advanced equipment, and data visualizations surround them as they work together.\",\n    \"sceneContents\": \"These tech breakthroughs offer exciting possibilities. While challenges remain, the potential benefits for society are immense.\"\n  },\n  {\n    \"imagePromt\": \"A network of interconnected nodes representing global technological advancements. The nodes are brightly illuminated and connected by shimmering lines, symbolizing progress and innovation.\",\n    \"sceneContents\": \"It's a thrilling time to witness these innovations unfold and shape the world around us. Stay tuned for more updates on the cutting edge of technology.\"\n  },\n  {\n    \"imagePromt\": \"A presenter confidently addressing an audience on a futuristic stage. The stage is brightly lit, and the presenter is engaging and passionate about the topic of technological innovation.\",\n    \"sceneContents\": \"Thank you for listening!\"\n  }\n]\n```"},
            ],
          },
        ],
      });
