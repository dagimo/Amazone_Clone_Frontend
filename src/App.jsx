import React, { useContext, useEffect } from 'react'
import Routing from "./Router";
import { DataContext } from './Components/DataProvider/DataProvider';
import { auth } from './Utility/firebase';
import {Type} from './Utility/action.type'

function App() {
  const [{user}, dispatch] = useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        dispatch({
          type:Type.SET_USER,
        })

      }else{
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

  }, []);
  return (
    <div>
        <Routing/>
    </div>
  );
  
          }

export default App;
