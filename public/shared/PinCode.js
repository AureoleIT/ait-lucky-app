import { useState, useRef } from "react"

function useDigitInput(initialValue = "") {
    const [value, setter] = useState(initialValue);
    const ref = useRef(null);
  
    return [value, setter, ref];
  }
  

function useDigitInputs(length, digits = []) {
    const values = [];
    const setters = [];
    const refs = [];
  
    new Array(length).fill(1).forEach(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setter, ref] = useDigitInput(digits[values.length]);
      values.push(value);
      setters.push(setter);
      refs.push(ref);
    });
  
    return [values, setters, refs];
  }

function PinCode ({ value: sourceWholeValue, onChange: onChangeCallback, length }) {
    
    const partialDigits = sourceWholeValue.toString().split("")
    const degits = partialDigits.length === length ? partialDigits : []
    const [values, setters, refs] = useDigitInputs(length, degits)

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-full flex justify-center items-center drop-shadow-lg">
                {
                    values.map((_value, index) => (
                        <input 
                            key={index}
                            disabled
                            maxLength={1}
                            ref={refs[index]}
                            value={values[index]}
                            className="w-[35px] h-[35px] md:w-[55px] md:h-[55px] border-none bg-[#40BEE5] text-center my-0 mx-[10px] text-white font-bold text-[20px] lg:text-[30px]"
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default PinCode


