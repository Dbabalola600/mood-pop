// pages/index.tsx
import { useState, useRef } from 'react';
import pako from 'pako'; // Import the pako library

const IndexPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBase64, setAudioBase64] = useState<string | null>(null); // Initialize with null
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        audioChunksRef.current = [];
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

            // Convert Blob to base64
            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = reader.result?.toString();
                if (base64Data) {
                    const compressedData = pako.deflate(base64Data); // Compress the base64 data
                    console.log('Compressed data:', compressedData);
                    console.log(base64Data);
                }
            };
            reader.readAsDataURL(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl mb-4">Voice Recorder</h1>
                <button
                    className={`px-4 py-2 bg-blue-500 text-white rounded ${isRecording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    onClick={handleStartRecording}
                    disabled={isRecording}
                >
                    Start Recording
                </button>
                <button
                    className={`px-4 py-2 bg-black text-white rounded ${!isRecording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                    onClick={handleStopRecording}
                    disabled={!isRecording}
                >
                    Stop Recording
                </button>
                {audioBase64 && (
                    <audio controls className="mt-4">
                        <source src={audioBase64} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>
    );
};

export default IndexPage;
