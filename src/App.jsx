import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberallowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passref = useRef(null);

  const copyToClipboard = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePass = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]=";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePass();
  }, [length, numberAllowed, charAllowed, generatePass]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            ref={passref}
            className="outline-none w-full py-1 px-3"
          />
          <button
            className="outline-none text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 bg-blue-600 active:bg-blue-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              onChange={(e) => {
                setnumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
