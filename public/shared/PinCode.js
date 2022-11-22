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
    const [selected, setSelected] = useState(0)

    const currentWholeValue = values.join("")
    const hasError = currentWholeValue.length > 0 && currentWholeValue.length < 6

    const selectedStyle = {
        "border-top": "4px solid black"
    }
    
    const errorStyle = {
        "border-top": "2px solid red"
    }

    const errorSelectedStyle = {
        "border-top": "4px solid red"
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-full flex justify-center items-center">
                {
                    values.map((_value, index) => (
                        <input 
                            maxLength={1}
                            ref={refs[index]}
                            value={values[index]}
                            className="w-[35px] h-[35px] md:w-[55px] md:h-[55px] border-none bg-[#40BEE5] text-center my-0 mx-[10px] text-white font-bold text-[20px] lg:text-[30px]"
                            onKeyDown={e => {
                                if(e.keyCode === 8)
                                {
                                    setters[index]("")
                                    if(index > 0)
                                    {
                                        refs[index-1].current.focus()
                                    }
                                    e.preventDefault()
                                }
                            }}
                            onFocus={() =>
                            {
                                setSelected(index)
                            }}
                            onChange={(e) =>
                            {
                                const eventValue = parseInt(e.target.value || "", 10)
                                
                                const value = Number.isNaN(eventValue) ? "" : eventValue

                                setters[index](value)
                                
                                if (value && index < values.length - 1)
                                {
                                    refs[index + 1].current.focus()
                                }

                                const nextValues = [...values]
                                nextValues[index] = value

                                if(nextValues.every(Boolean))
                                {
                                    onChangeCallback(parseInt(nextValues.join(""),10))
                                }
                            }}
                        />
                    ))
                }
            </div>
            <div className="w-full flex justify-center items-center">
                {
                    values.map((_value, index) => (
                        <span style={selectedStyle} className="inline-block w-[35px] md:w-[55px] my-0 mx-[10px] py-0 px-[1px]"></span>
                    ))
                }
            </div>
        </div>
    )
}

export default PinCode


