import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  userPreferences: [],
  favorites: [],
  loading: false,
  kreatives: [],
  rsvpEvents: [],
  bookmarkedPosts: [],
  repostedPosts: [],
  following: [],
  certificates: [],
  userArtworks: [],
  quizProgress: {}
};

// Action types
export const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SET_LOADING: 'SET_LOADING',
  SET_KREATIVES: 'SET_KREATIVES',
  ADD_RSVP: 'ADD_RSVP',
  REMOVE_RSVP: 'REMOVE_RSVP',
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
  ADD_REPOST: 'ADD_REPOST',
  REMOVE_REPOST: 'REMOVE_REPOST',
  ADD_FOLLOWING: 'ADD_FOLLOWING',
  REMOVE_FOLLOWING: 'REMOVE_FOLLOWING',
  ADD_CERTIFICATE: 'ADD_CERTIFICATE',
  ADD_ARTWORK: 'ADD_ARTWORK',
  REMOVE_ARTWORK: 'REMOVE_ARTWORK',
  SAVE_QUIZ_PROGRESS: 'SAVE_QUIZ_PROGRESS',
  LOGOUT: 'LOGOUT'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case ActionTypes.SET_USER_PREFERENCES:
      return { ...state, userPreferences: action.payload };
    case ActionTypes.ADD_FAVORITE:
      return { 
        ...state, 
        favorites: [...state.favorites, action.payload] 
      };
    case ActionTypes.REMOVE_FAVORITE:
      return { 
        ...state, 
        favorites: state.favorites.filter(fav => fav.id !== action.payload) 
      };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_KREATIVES:
      return { ...state, kreatives: action.payload };
    case ActionTypes.ADD_RSVP:
      return { ...state, rsvpEvents: [...state.rsvpEvents, { ...action.payload, rsvpDate: new Date().toISOString() }] };
    case ActionTypes.REMOVE_RSVP:
      return { ...state, rsvpEvents: state.rsvpEvents.filter(event => event.id !== action.payload) };
    case ActionTypes.ADD_BOOKMARK:
      return { ...state, bookmarkedPosts: [...state.bookmarkedPosts, action.payload] };
    case ActionTypes.REMOVE_BOOKMARK:
      return { ...state, bookmarkedPosts: state.bookmarkedPosts.filter(post => post !== action.payload) };
    case ActionTypes.ADD_REPOST:
      return { ...state, repostedPosts: [...state.repostedPosts, action.payload] };
    case ActionTypes.REMOVE_REPOST:
      return { ...state, repostedPosts: state.repostedPosts.filter(post => post !== action.payload) };
    case ActionTypes.ADD_FOLLOWING:
      return { ...state, following: [...state.following, action.payload] };
    case ActionTypes.REMOVE_FOLLOWING:
      return { ...state, following: state.following.filter(id => id !== action.payload) };
    case ActionTypes.ADD_CERTIFICATE:
      return { ...state, certificates: [...state.certificates, action.payload] };
    case ActionTypes.ADD_ARTWORK:
      return { ...state, userArtworks: [...state.userArtworks, action.payload] };
    case ActionTypes.REMOVE_ARTWORK:
      return { ...state, userArtworks: state.userArtworks.filter(art => art.id !== action.payload) };
    case ActionTypes.SAVE_QUIZ_PROGRESS:
      return { ...state, quizProgress: { ...state.quizProgress, [action.payload.quizId]: action.payload.progress } };
    case ActionTypes.LOGOUT:
      return { 
        ...initialState, 
        kreatives: state.kreatives 
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  // Load initial state from localStorage
  const loadInitialState = () => {
    try {
      const savedState = localStorage.getItem('afrikreateState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        return {
          ...initialState,
          ...parsed,
          loading: false
        };
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(appReducer, initialState, loadInitialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userPreferences: state.userPreferences,
        favorites: state.favorites,
        rsvpEvents: state.rsvpEvents,
        bookmarkedPosts: state.bookmarkedPosts,
        repostedPosts: state.repostedPosts,
        following: state.following,
        certificates: state.certificates,
        userArtworks: state.userArtworks,
        quizProgress: state.quizProgress
      };
      localStorage.setItem('afrikreateState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [state]);

  // Load kreatives data on app start
  useEffect(() => {
    const loadKreatives = async () => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        // Import the JSON data directly since it's in src folder
        const kreativesData = await import('../data/kreatives.json');
        dispatch({ type: ActionTypes.SET_KREATIVES, payload: kreativesData.default });
      } catch (error) {
        console.error('Error loading kreatives:', error);
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    loadKreatives();
  }, []);

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    setAuthenticated: (isAuth) => {
      dispatch({ type: ActionTypes.SET_AUTHENTICATED, payload: isAuth });
      // Save authentication flag for quick access
      localStorage.setItem('afrikreateIsAuthenticated', isAuth.toString());
    },
    setUserPreferences: (preferences) => dispatch({ type: ActionTypes.SET_USER_PREFERENCES, payload: preferences }),
    addFavorite: (kreative) => dispatch({ type: ActionTypes.ADD_FAVORITE, payload: kreative }),
    removeFavorite: (kreativeId) => dispatch({ type: ActionTypes.REMOVE_FAVORITE, payload: kreativeId }),
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    addRSVP: (event) => dispatch({ type: ActionTypes.ADD_RSVP, payload: event }),
    removeRSVP: (eventId) => dispatch({ type: ActionTypes.REMOVE_RSVP, payload: eventId }),
    addBookmark: (postId) => dispatch({ type: ActionTypes.ADD_BOOKMARK, payload: postId }),
    removeBookmark: (postId) => dispatch({ type: ActionTypes.REMOVE_BOOKMARK, payload: postId }),
    addRepost: (postId) => dispatch({ type: ActionTypes.ADD_REPOST, payload: postId }),
    removeRepost: (postId) => dispatch({ type: ActionTypes.REMOVE_REPOST, payload: postId }),
    addFollowing: (kreativeId) => dispatch({ type: ActionTypes.ADD_FOLLOWING, payload: kreativeId }),
    removeFollowing: (kreativeId) => dispatch({ type: ActionTypes.REMOVE_FOLLOWING, payload: kreativeId }),
    addCertificate: (certificate) => dispatch({ type: ActionTypes.ADD_CERTIFICATE, payload: certificate }),
    addArtwork: (artwork) => dispatch({ type: ActionTypes.ADD_ARTWORK, payload: artwork }),
    removeArtwork: (artworkId) => dispatch({ type: ActionTypes.REMOVE_ARTWORK, payload: artworkId }),
    saveQuizProgress: (quizId, progress) => dispatch({ type: ActionTypes.SAVE_QUIZ_PROGRESS, payload: { quizId, progress } }),
    logout: () => {
      dispatch({ type: ActionTypes.LOGOUT });
      // Clear authentication flag
      localStorage.setItem('afrikreateIsAuthenticated', 'false');
      localStorage.removeItem('afrikreateCurrentPage');
    }
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
