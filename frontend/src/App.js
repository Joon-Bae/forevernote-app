import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Homepage } from './components/Homepage';
import { getAllNotes } from "./store/notes";
import  NewNoteForm  from './components/NewNoteForm'
import EditForm from "./components/EditNote/EditForm";
import Note from "./components/Note";
import NewNotebookForm from "./components/NewNotebookForm";
import NoteBook from './components/Notebook'
import SplashPage from "./components/Splashpage/Splashpage";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const state = useSelector(state=> state.session)
  // console.log('state', state)
  const userId = useSelector(state=>state.session.user?.id)
  // console.log(userId, "this is userId")
  const [isLoaded, setIsLoaded] = useState(false);
  const [setUser, setIsUser] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(()=> setIsUser(true))
    if(setUser){
    dispatch(getAllNotes(userId))
    }
    (setIsLoaded(true));
  }, [dispatch, setUser]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        <Route exact path='/home'>
          <Homepage />
        </Route>
        <Route exact path='/notebooks/:notebookId/note/new'>
          <NewNoteForm />
      </Route>
      <Route exact path='/notebooks/new'>
        <NewNotebookForm />
      </Route>
      <Route exact path ='/notebooks/:id'>
        <NoteBook/>
      </Route>
      <Route exact path='/note/:id'>
        <Note />
      </Route>
      <Route exact path='/note/:id/edit'>
        <EditForm />
      </Route>
      <Route exact path='/'>
        <SplashPage/>
      </Route>
        </Switch>
      )}


    </>
  );
}

export default App;
