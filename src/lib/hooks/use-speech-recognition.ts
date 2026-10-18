"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionInstance = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionWindow = Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type UseSpeechRecognitionOptions = {
    onTranscript: (transcript: string, isFinal: boolean) => void;
    onError?: (message: string) => void;
};

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
    if (typeof window === "undefined") return null;

    const speechWindow = window as SpeechRecognitionWindow;

    return (
        speechWindow.SpeechRecognition ??
        speechWindow.webkitSpeechRecognition ??
        null
    );
}

export function useSpeechRecognition({
    onTranscript,
    onError,
}: UseSpeechRecognitionOptions) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported] = useState(() =>
        Boolean(getSpeechRecognitionConstructor()),
    );

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const onTranscriptRef = useRef(onTranscript);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onTranscriptRef.current = onTranscript;
        onErrorRef.current = onError;
    }, [onTranscript, onError]);

    const stopListening = useCallback(() => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setIsListening(false);
    }, []);

    const startListening = useCallback(() => {
        const SpeechRecognitionCtor = getSpeechRecognitionConstructor();

        if (!SpeechRecognitionCtor) {
            onErrorRef.current?.(
                "Speech recognition is not supported in this browser.",
            );
            return;
        }

        if (recognitionRef.current) {
            stopListening();
            return;
        }

        const recognition = new SpeechRecognitionCtor();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let interim = "";
            let final = "";

            for (
                let index = event.resultIndex;
                index < event.results.length;
                index += 1
            ) {
                const result = event.results[index];
                const transcript = result[0]?.transcript ?? "";

                if (result.isFinal) {
                    final += transcript;
                } else {
                    interim += transcript;
                }
            }

            if (final) {
                onTranscriptRef.current(final, true);
            } else if (interim) {
                onTranscriptRef.current(interim, false);
            }
        };

        recognition.onerror = (event) => {
            if (event.error === "aborted") return;

            const message =
                event.error === "not-allowed"
                    ? "Microphone access was denied. Allow microphone permissions to use voice input."
                    : event.error === "no-speech"
                      ? "No speech detected. Try again."
                      : "Voice input failed. Try again.";

            onErrorRef.current?.(message);
            recognitionRef.current = null;
            setIsListening(false);
        };

        recognition.onend = () => {
            recognitionRef.current = null;
            setIsListening(false);
        };

        try {
            recognition.start();
            recognitionRef.current = recognition;
            setIsListening(true);
        } catch {
            onErrorRef.current?.("Could not start voice input. Try again.");
            recognitionRef.current = null;
            setIsListening(false);
        }
    }, [stopListening]);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    useEffect(() => {
        return () => {
            recognitionRef.current?.abort();
            recognitionRef.current = null;
        };
    }, []);

    return {
        isListening,
        isSupported,
        toggleListening,
        stopListening,
    };
}
