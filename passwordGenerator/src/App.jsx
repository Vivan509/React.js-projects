import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  // we need lenght first
  const [length, setLength] = useState(8)

  // take number
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')



   // Use refHook
   const passwordRef = useRef(null)

    // function to generate the pass

  const passwordGenerator = useCallback(() => {
    //store password 
    let pass = ""
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789' 
    if(charAllowed) str += '!@#$%^&*()_+=' 

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
      
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
   passwordRef.current?.select();
   passwordRef.current?.setSelectionRange(0, 30)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  },[setLength, numberAllowed, charAllowed,  passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>

          <h1 className='text-white text-center text-xl my-3'>Password Generator</h1>

          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type="text" 
                value={password}
                className='outline-none w-full py-1 px-3' placeholder='password'
                readOnly
               ref={passwordRef}
               
              />
              <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 px-3 py-0.5 text-white shrink-0 hover:bg-blue-700 transition-all'>Copy</button>
          </div>

          <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input type="range"
                  min={6}
                  max={25}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e) => {setLength(e.target.value)}}

                />
                <label htmlFor="">Lenght: {length}</label>
              </div>

              <div className='flex items-center gap-x-1'>
                    <input type="checkbox" 
                    defaultChecked={numberAllowed}
                    id='numberInput'
                    onChange ={() => {
                      setNumberAllowed((prev) => !prev)
                    }}
                    
              
                />
                  <label htmlFor="numberInput">Numbers</label>
              </div>

              <div className='flex items-center gap-x-1'>
                  <input type="checkbox" 
                  defaultValue={charAllowed}
                  id='charInput'
                  onChange={() => {
                    setCharAllowed((prev) => !prev)
                  }}
                  />
                  <label htmlFor="charInput">Characters</label>
              </div>
        
          </div>
      </div>
    </>
  )
}

export default App
