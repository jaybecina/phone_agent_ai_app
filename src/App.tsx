import { useEffect, useState } from "react";
import "./App.css";
import { RetellWebClient } from "retell-client-js-sdk";
import BookingForm from "./components/BookingForm";

const agentId = process.env.REACT_APP_RETELL_AGENT_ID;

interface RegisterCallResponse {
  access_token: string;
}

const retellWebClient = new RetellWebClient();

const App = () => {
  const [isCalling, setIsCalling] = useState(false);

  // Initialize the SDK
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
    });

    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      setIsCalling(false);
    });

    // When agent starts talking for the utterance
    // useful for animation
    retellWebClient.on("agent_start_talking", () => {
      console.log("agent_start_talking");
    });

    // When agent is done talking for the utterance
    // useful for animation
    retellWebClient.on("agent_stop_talking", () => {
      console.log("agent_stop_talking");
    });

    // Real time pcm audio bytes being played back, in format of Float32Array
    // only available when emitRawAudioSamples is true
    retellWebClient.on("audio", (audio) => {
      // console.log(audio);
    });

    // Update message such as transcript
    // You can get transcrit with update.transcript
    // Please note that transcript only contains last 5 sentences to avoid the payload being too large
    retellWebClient.on("update", (update) => {
      // console.log(update);
    });

    retellWebClient.on("metadata", (metadata) => {
      // console.log(metadata);
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      // Stop the call
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
    } else {
      const registerCallResponse = await registerCall(agentId);
      if (registerCallResponse.access_token) {
        retellWebClient
          .startCall({
            accessToken: registerCallResponse.access_token,
          })
          .catch(console.error);
        setIsCalling(true); // Update button to "Stop" when conversation starts
      }
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      // Update the URL to match the new backend endpoint you created
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/create-web-call`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agent_id: agentId, // Pass the agentId as agent_id
            // You can optionally add metadata and retell_llm_dynamic_variables here if needed
            // metadata: { your_key: "your_value" },
            // retell_llm_dynamic_variables: { variable_key: "variable_value" }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: RegisterCallResponse = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  return (
    <div className="App">
      <div className="min-h-screen bg-white">
        <header className="py-12 px-6">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            The Color Bar Salon Phone Agent
          </h1>
          <button
            onClick={toggleConversation}
            className="mt-6 mx-auto w-full md:w-96 block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
          >
            {isCalling ? "End Call" : "Start Call"}
          </button>
        </header>
        <main className="container md:mx-auto md:px-4 py-12">
          <BookingForm />
        </main>
      </div>
    </div>
  );
};

export default App;
