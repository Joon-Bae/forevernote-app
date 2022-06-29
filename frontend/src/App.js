import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Homepage } from './components/Homepage'
import  NewNoteForm  from './components/NewNoteForm'
import Note from "./components/Note";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route exact path='/notebook/:notebookId/note/new'>
          <NewNoteForm />
      </Route>
      <Route exact path='/note/:id'>
        <Note />
      </Route>
      </Switch>
    </>
  );
}

export default App;
