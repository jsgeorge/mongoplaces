import React, { useReducer, createContext } from "react";

export const PlaceContext = createContext();

const initialState = {
  places: [],
  place: {},
  author: {},
  message: {}, // {type: 'success|fail', title:info|error' content:'error'}
};

function reducer(state, action) {
  //console.log(action.type);
  switch (action.type) {
    case "FETCH_PLACES": {
      return {
        ...state,
        places: action.payload,
        place: {},
        message: {},
      };
    }
    case "FETCH_PLACE": {
      return {
        ...state,
        place: action.payload,
        message: {},
      };
    }
    case "CREATE_PLACE": {
      return {
        ...state,
        places: [...state.places, action.payload],
        message: {
          type: "success",
          title: "Success",
          content: "New place created",
        },
      };
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        message: action.payoad,
      };
    }

    case "LIKE_PLACE": {
      const place = action.payload;
      return {
        ...state,
        places: state.places.map((item) =>
          item._id === place._id ? place : item
        ),
        message: {
          type: "succes",
          title: "Like succesfull",
          content: "place is liked by you",
        },
      };
    }

    case "DISLIKE_PLACE": {
      const place = action.payload;
      return {
        ...state,
        places: state.places.map((item) =>
          item._id === place._id ? place : item
        ),
        message: {
          type: "succes",
          title: "Like succesfull",
          content: "place is liked by you",
        },
      };
    }

    case "FETCH_AUTHOR": {
      return {
        ...state,
        author: action.payload,
      };
    }
    case "FLASH_MESSAGE": {
      return {
        ...state,
        message: action.payoad,
      };
    }

    default:
      throw new Error();
  }
}

export const PlaceContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <PlaceContext.Provider value={[state, dispatch]}>
      {children}
    </PlaceContext.Provider>
  );
};
