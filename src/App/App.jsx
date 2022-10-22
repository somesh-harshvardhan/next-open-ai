import axios from 'axios';
import React, { useState } from 'react'
import styles from "./App.module.css"
const App = () => {
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("");
  const [isLoading,setLoading] = useState(false);

  const handleQuestion = async ()=>{
    setLoading(true);
    const result = await (await axios.post("http://localhost:3000/api/open-ai-qa",{
     question : question.replace(/\?/g, '') 
  })).data;
    setAnswer(result.answer);
    setLoading(false);
  }
  return (
    <div className={styles.appContainer}>
      <div className="qaWrapper">
        <div className={styles.questionContainer}>
            <p>Ask anything on your mind ?</p>
             <div className={styles.questionInputContainer}>
              <label htmlFor="">Q : </label>
              <input type="text" value={question} onChange={e=>setQuestion(e.target.value)} placeholder={"What is the day today"}/>
             </div>
        </div>
        <div className={styles.answerContainer}>
              <p>A : {answer}</p>
        </div>
        </div>
      <div className={styles.search}>
        <button onClick={handleQuestion}>{isLoading ? "Loading...." : "Search"}</button>
      </div>
    </div>
  )
}

export default App