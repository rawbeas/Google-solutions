import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your Google API credentials
  const API_KEY = "AIzaSyCNe32GhfWl4bzWzFntl_X-D4LED9DjiY4";
  const CLIENT_ID =
    "319694621565-hm7tn9qu4ho0iop8i2n2sk3qdssl8ree.apps.googleusercontent.com";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        gapi.load("client:auth2", initClient);
      };
      document.body.appendChild(script);
    };

    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign-in state changes
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };

    const updateSigninStatus = (isSignedIn) => {
      if (isSignedIn) {
        listUpcomingEvents();
      } else {
        setIsLoading(false);
      }
    };

    const listUpcomingEvents = () => {
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        })
        .then((response) => {
          const events = response.result.items;
          setEvents(events);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };

    loadGoogleAPI();
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const handleAddEvent = () => {
    // Implementation for adding events
    // This would typically open a form modal
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex items-center justify-center">
        <div className="text-gray-600">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error loading calendar</div>
        <button
          onClick={handleSignIn}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isSignedIn = gapi.auth2?.getAuthInstance()?.isSignedIn.get();

  if (!isSignedIn) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium text-gray-800 mb-6">
          Google Calendar
        </h3>
        <p className="text-gray-600 mb-6">Sign in to access your calendar</p>
        <button
          onClick={handleSignIn}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-gray-800">Google Calendar</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleAddEvent}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Add Event
          </button>
          <button
            onClick={handleSignOut}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-gray-500 text-center py-10">
            No upcoming events
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded p-3 hover:bg-gray-50"
              >
                <div className="font-medium">{event.summary}</div>
                <div className="text-sm text-gray-600">
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendar;
