import React, { useState, useEffect } from 'react'

const Todo = () => {
  const [list, setList] = useState([])
  const[isClicked,setClicked] = useState(false);
  const [ipVal, setipVal] = useState('');
  const[isFiltered, setFiltered] = useState(false);
  const[filterData,setfilterdata] = useState([]);
  const[task,setTask] = useState({});
  const[posts,setPosts] = useState(false)

  useEffect(async()=>{
    const result = await fetch('http://localhost:5000/showPost',{
        method:'GET',
    })
    let output = await result.json();
    // console.log(output);

    setList(()=>([
      ...output
    ]))
    setClicked(!isClicked)

    console.log(list);
  },[])

  const handleInput=(e)=>{
    setipVal(e.target.value);
  }

  const handleSearch=()=>{
    setFiltered(true);
    const filteredVal = list.filter((item,index)=>{
      if(ipVal == item.id || ipVal == item.title){
        // console.log(item);
        return item
      }
    })
    console.log(filteredVal);
    setfilterdata(()=>([...filteredVal]))
  }
  const handleTitleChange=(e)=>{
    setTask(()=>({
      title:e.target.value
    }))
  }
  const handleAddPost=async()=>{
    const result = await fetch('http://localhost:5000/addTitle',{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(task)
    })
    console.log(await result.json());
  }
  const handleGetPost=()=>{
    window.location.reload()
  }

return (
  <div>
      <button onClick={handleGetPost}>Get Posts</button><br/>
      <input id='title' placeholder='enter task title' onChange={handleTitleChange}/> <br/>
      <button onClick={handleAddPost}>Add post</button>

      {isClicked?
      <>
      <br/>
      <br/>
      <input onInput={handleInput} type='text' placeholder='enter title or id' />
      <button onClick={handleSearch}>Search</button>
      {!isFiltered?
      list.map((item,index)=>{
      return (
        <div key={index}>
          <h2>ID: {item.id}</h2>
          <h3>Title: {item.title}</h3>
          <h3>Completed : {item.completed?'Yes':'No'}</h3>
          <hr/>
        </div>
      )
      })
    :
    filterData.map((item,index)=>{
      return (
        <div key={index}>
          <h2>ID: {item.id}</h2>
          <h3>Title: {item.title}</h3>
          <h3>Completed : {item.completed?'Yes':'No'}</h3>
          <hr/>
        </div>
      )
    })}
      </>
      :
      null
    }
  </div>
)
}
export default Todo
