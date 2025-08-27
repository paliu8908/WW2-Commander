import { useEffect, useState } from 'react';
import { useAppContext } from "@/app/context/GameContext";

async function generateContent(prompt: string, onChunk: (chunk: string) => void) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.body) throw new Error('ReadableStream not supported');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      onChunk(decoder.decode(value));
    }
  }
}

export default function StreamingGenAI() {
  let { gamePrompt } = useAppContext();

  const [prompt, setPrompt] = useState(gamePrompt);
  const [order, setOrder] = useState("")
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("send");
    handleGenerate();
    gamePrompt = ""
  }, [])

  async function handleGenerate() {
    setOutput((prev) => prev.concat(order))

    if(order.length > 0) {
      setPrompt((prev) => prev + "My next order are : ".concat(order) + "what happens next? Keep response short. Be specific on list the number of units moving where, as well as effects of the engagement. Produce only plain text. Instead of describing your orders describe the events from third person.")
    } else {
      setPrompt((prev) => prev + "what happens next? Keep response short. Be specific on list the number of units moving where, as well as effects of the engagement. Produce only plain text. Instead of describing your orders describe the events from third person.")
    }
    // setOutput('');
    setLoading(true);

    //const move = "The next move is ".concat(prompt)

    try {
      const response = await fetch('/api/Generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt  }),
      });

      if (!response.body) {
        throw new Error('Streaming not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          setOutput((prev) => prev + chunk);
          setPrompt((prev) => prev + chunk);
        }
      }
    } catch (error) {
      setOutput('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-center">THE COMMAND CONSOLE</h2>
      <div className="w-full px-12 h-[55%] ">
        <div className="bg-[#f4f4f4] w-full h-full overflow-scroll">
          <p
            className="p-5 whitespace-pre-wrap text-sm "
          >
            {output}
          </p>
        </div>
      </div>
      <div className="w-full h-[45%] px-12 py-4 flex flex-col items-center">
        <h2>Orders</h2>
        <textarea
          rows={4}
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Enter your orders here"
          className="text-sm w-[90%] bg-[#f0e4c2] p-2 "
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          style={{ marginTop: 10, padding: '8px 16px', fontSize: 16 }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
}
