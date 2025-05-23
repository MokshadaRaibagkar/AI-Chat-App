import { useActionState, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
 const [question, setQuestion] = useState("");
 const[answer,setAnswer]= useState("");

 const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
 
 async function generateAnswer(){
  setAnswer("loading");
  try{
    const response=await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method:"post",
        data:{
      "contents": [
        {"parts": [{"text":question}]}
      ]}
    })
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }
  catch(error){
  console.error(error);
  setAnswer("Erorr occured while generating response");
}
}
  return (
    <>
   <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
            AI Chat App
          </h1>
        <textarea className="border rounded w-full border-amber-500 mt-5"
        value={question} onChange={(e)=>setQuestion(e.target.value)} cols="30" rows="10"
        placeholder='ask anything to me'></textarea>
        <button
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 min-w-[60px] flex items-center justify-center"
        onClick={generateAnswer}>Generate answer</button>
        <pre>{answer}</pre>
    </div>
   </>
  )
}

export default App
