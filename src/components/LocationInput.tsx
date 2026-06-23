"use client";

import React, { useEffect, useRef, useState } from "react";

// List of 80+ major South East Queensland suburbs (Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Logan, Redland, Ipswich)
const LOCAL_SUBURBS = [
  // Brisbane
  "Annerley", "Ascot", "Ashgrove", "Auchenflower", "Balmoral", "Brisbane City", "Bulimba", "Camp Hill", 
  "Carindale", "Chermside", "Clayfield", "Coorparoo", "Dutton Park", "Fortitude Valley", "Hamilton", 
  "Hawthorne", "Indooroopilly", "Kangaroo Point", "Manly", "Milton", "New Farm", "Nundah", "Paddington", 
  "Sandgate", "South Brisbane", "Spring Hill", "St Lucia", "Sunnybank", "Sunnybank Hills", "Tarragindi", 
  "Teneriffe", "Toowong", "West End", "Woolloongabba", "Wynnum",
  // Gold Coast
  "Ashmore", "Benowa", "Broadbeach", "Broadbeach Waters", "Bundall", "Burleigh Heads", "Burleigh Waters", 
  "Carrara", "Coomera", "Coolangatta", "Currumbin", "Elanora", "Helensvale", "Hope Island", "Labrador", 
  "Main Beach", "Merrimac", "Miami", "Mudgeeraba", "Nerang", "Palm Beach", "Paradise Point", "Robina", 
  "Runaway Bay", "Southport", "Tugun", "Varsity Lakes",
  // Sunshine Coast
  "Alexandra Headland", "Buderim", "Caloundra", "Coolum Beach", "Cotton Tree", "Dicky Beach", "Glass House Mountains", 
  "Golden Beach", "Kawana Waters", "Maleny", "Maroochydore", "Moffat Beach", "Montville", "Mooloolaba", 
  "Mountain Creek", "Nambour", "Noosa Heads", "Noosaville", "Pelican Waters", "Peregian Beach", "Sippy Downs", 
  "Sunshine Beach", "Tewantin",
  // Toowoomba
  "Darling Heights", "East Toowoomba", "Harristown", "Highfields", "Middle Ridge", "Newtown", "Rangeville", "Wilsonton",
  // Logan, Redland, Ipswich
  "Booval", "Brassall", "Browns Plains", "Cleveland", "Capalaba", "Flinders View", "Ipswich", "Loganholme", 
  "Redland Bay", "Springfield", "Springfield Lakes", "Springwood", "Victoria Point", "Wellington Point", "Woodridge"
].sort();

interface LocationInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}

let scriptLoadingPromise: Promise<void> | null = null;
function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps script load failed"));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

interface GooglePrediction {
  description: string;
  place_id: string;
}

interface AutocompleteServiceType {
  getPlacePredictions: (
    request: {
      input: string;
      componentRestrictions?: { country: string | string[] };
      types?: string[];
    },
    callback: (predictions: GooglePrediction[] | null, status: string) => void
  ) => void;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          AutocompleteService?: new () => AutocompleteServiceType;
          PlacesServiceStatus?: {
            OK: string;
          };
        };
      };
    };
  }
}

// Local filtering helper declared outside or before hooks
const filterLocalSuburbs = (query: string, callback: (res: string[]) => void) => {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    callback([]);
    return;
  }
  const filtered = LOCAL_SUBURBS.filter((suburb) =>
    suburb.toLowerCase().includes(cleanQuery)
  )
    .slice(0, 10) // Show up to 10 suggestions
    .map((s) => `${s}, QLD`);
  callback(filtered);
};

export default function LocationInput({
  value,
  onChange,
  placeholder = "Enter suburb or address...",
  required = false,
  id,
  name,
  style,
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [googleError, setGoogleError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteServiceRef = useRef<AutocompleteServiceType | null>(null);

  // Adjust state when value prop changes, without using useEffect
  if (value !== prevValue) {
    setInputValue(value);
    setPrevValue(value);
  }

  // Load Google Maps script if API key is present
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (apiKey) {
      loadGoogleMapsScript(apiKey)
        .then(() => {
          const AutocompleteService = window.google?.maps?.places?.AutocompleteService;
          if (AutocompleteService) {
            setIsGoogleLoaded(true);
            autocompleteServiceRef.current = new AutocompleteService();
          }
        })
        .catch((err) => {
          console.error("Failed to load Google Maps Places Autocomplete:", err);
          setGoogleError(true);
        });
    }
  }, []);

  // Handle outside clicks to close suggestion dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions based on input value
  useEffect(() => {
    if (!inputValue.trim()) {
      // Async state update to prevent linter synchronous effect errors
      const timer = setTimeout(() => {
        setSuggestions([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (isGoogleLoaded && autocompleteServiceRef.current) {
      // Programmatically query Google Places Autocomplete
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: inputValue,
          componentRestrictions: { country: "au" },
          types: ["(regions)"],
        },
        (predictions, status) => {
          const OKStatus = window.google?.maps?.places?.PlacesServiceStatus?.OK;
          if (
            OKStatus &&
            status === OKStatus &&
            predictions
          ) {
            // Transform Google prediction string
            const formatted = predictions.map((p) => p.description.replace(", Australia", ""));
            setSuggestions(formatted);
          } else {
            // Fallback to local filtering on API response issue
            filterLocalSuburbs(inputValue, (res) => {
              setSuggestions(res);
            });
          }
        }
      );
    } else {
      // Use local list fallback
      filterLocalSuburbs(inputValue, (res) => {
        setSuggestions(res);
      });
    }
  }, [inputValue, isGoogleLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);
    setShowDropdown(true);
    setHighlightedIndex(-1);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      } else if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative", ...style }}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid var(--sand-300)",
          borderRadius: "4px",
          padding: "12px 14px",
          fontSize: "0.92rem",
          fontFamily: "Outfit, sans-serif",
          color: "var(--slate-dark)",
          outline: "none",
          background: "white",
          transition: "var(--transition-fast)",
        }}
        className="location-autocomplete-input"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--sand-300)",
            borderRadius: "4px",
            boxShadow: "0 10px 25px rgba(26, 35, 50, 0.08)",
            padding: "6px 0",
            margin: 0,
            listStyle: "none",
            maxHeight: "260px",
            overflowY: "auto",
            animation: "slideDownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="location-suggestions-dropdown"
        >
          {suggestions.map((suggestion, idx) => {
            const isHighlighted = idx === highlightedIndex;
            return (
              <li
                key={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                style={{
                  padding: "10px 16px",
                  fontSize: "0.85rem",
                  fontFamily: "Outfit, sans-serif",
                  color: isHighlighted ? "var(--ocean-700)" : "var(--slate-mid)",
                  background: isHighlighted ? "var(--ocean-50)" : "transparent",
                  cursor: "pointer",
                  fontWeight: isHighlighted ? 600 : 400,
                  transition: "background 0.15s ease, color 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{suggestion}</span>
                <span style={{ fontSize: "0.72rem", color: "var(--sand-500)", opacity: 0.8 }}>
                  {isGoogleLoaded && !googleError ? "Places API" : "Local Database"}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Styled animation & placeholder definitions */}
      <style>{`
        @keyframes slideDownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .location-autocomplete-input:focus {
          border-color: var(--ocean-500) !important;
          box-shadow: 0 0 0 3px rgba(31, 122, 114, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
