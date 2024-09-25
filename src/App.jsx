import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter]   = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef= useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq"

    if(number) str+="0987654321"
    if(character) str+="!@#$%^&*()"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length)
      pass+=str[char]
      //console.log(pass)
    }

    setPassword(pass)
    

  }, [length,number,character,setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])
  //console.log("hare",password)

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <br/><br/>
      <div className='w-full max-w-md mx-auto rounded-lg bg-gray-800 text-white text-center p-2'>
        Password Generator
        <div className='flex shadow  rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full px-3 py-1 rounded-md text-green-800' placeholder='password' readOnly ref={passwordRef} />
          <button className='rounded-md bg-blue-500 w-20' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(parseInt(e.target.value))}}/>
          <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={number} id="numberInput"
              onChange={() => {
                  setNumber((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={character}
                id="characterInput"
                onChange={() => {
                    setCharacter((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
