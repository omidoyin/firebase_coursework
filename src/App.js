
import './App.css';
import useCounter from './components/hooks/useCounter';
import Auth from './components/auth';
import react, { useState, useEffect } from 'react';
import { db, auth, storage} from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
const [movieList, setMovieList]=useState();

// New Movie state
const [newMovieTitle, setNewMovieTitle]=useState("");
const [newReleaseDate, setnewReleaseDate]=useState(0);
const [isNewMovieOscar, setisNewMovieOscar]=useState(false);

// update title state
const [updatedTitle, setUpdatedTitle]=useState("");

// file upload state
const [fileUpload, setFileUpload]=useState("");


const moviesCollectionRef =collection(db, "movies")

const getMovieList= async()=>{
  try{
     const data = await getDocs(moviesCollectionRef);
     const filteredData = data.docs.map((doc)=>({...doc.data(), id:doc.id}))
     console.log(filteredData)
     setMovieList(filteredData)
  }catch(err){
    console.error(err)
  }
  
  }
const deleteMovie = async(id)=>{
  try{
    const movieDoc = doc(db, "movies",id)
    await deleteDoc(movieDoc)
    getMovieList();
  }
  catch(err){
    console.error(err);
  }
}

const updateMovie = async(id)=>{
  try{
    const movieDoc = doc(db, "movies",id)
    await updateDoc(movieDoc, {title:updatedTitle})
    getMovieList();
  }
  catch(err){
    console.error(err);
  }
}

useEffect(()=>{
  
  getMovieList();
},[])

const onSubmitMovie = async()=>{
try{
  await addDoc(moviesCollectionRef, {
    title:newMovieTitle,
    releaseDate:newReleaseDate,
    recievedAnOscar:isNewMovieOscar, 
    userId:auth?.currentUser?.uid,
  
  })
  getMovieList();
}catch(err){
  console.error(err)
}
}

const uploadFile =  async()=>{
  if(!fileUpload) return;
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
  try{
    await uploadBytes(filesFolderRef, fileUpload)

  } catch(err){
    console.error(err);
  }
}

  return (
    <div className="App">
      <Auth/>
      <div>
        <input type="text" placeholder='Movie title...' onChange={(e)=>{setNewMovieTitle(e.target.value)}}/>
        <input type="text" placeholder='Release Date...' onChange={(e)=>{setnewReleaseDate(Number(e.target.value))}}/>
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>{setisNewMovieOscar(e.target.checked)}}/>
        <label>Recieved an oscar</label>
        <button onClick={onSubmitMovie}>  Submit </button>

        {movieList?.map((movie)=>(
          <div>
            <h1 style={{color:(movie.recievedAnOscar)? 'blue' :'green'}}>
              {movie.title}
              </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={()=>{deleteMovie(movie.id)}}> Delete Movie</button>

           <input onChange={(e)=>{setUpdatedTitle(e.target.value)}} placeholder='new title...'/>
           <button onClick={()=>{updateMovie(movie.id)}}>Update</button>



          </div>
        ))}
      </div>
      <div>
        <input type='file' onChange={(e)=>{setFileUpload(e.target.files[0])}}/>
        <button onClick={uploadFile}> upload file</button>
      </div>



    </div>
  );
}

export default App;
