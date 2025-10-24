import React, {useEffect, useRef, forwardRef, useState } from 'react'
import PopupDialogBoxImage from "../../assets/PopupDialogBox/PopupDialogBox.png"
import { IoIosCloseCircleOutline } from "react-icons/io";
import PhoneInputCustom from '../PhoneInputCustom/PhoneInputCustom';
import {useDebounce} from '../../hooks/useDebounce'

const PopupDialogBox = forwardRef(({ trigger, setTrigger, closePopup }, ref) => {

    const [goal, setGoal] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const debouncedEmail = useDebounce(email, 300);
    
    const firstInput = useRef(null);

    useEffect(() => {
    if (!debouncedEmail) {
        setEmailError("");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(debouncedEmail)) 
        setEmailError("Please enter a valid email address.");
    else
        setEmailError("");
    }, [debouncedEmail]);

    useEffect(()=>{
        firstInput.current?.focus();
    },[])

    return(
    <>
        {trigger &&
        <div className='fixed z-[99] inset-0 bg-black/70 flex items-center justify-center' onClick={(e)=>{e.stopPropagation();closePopup();}}>
            <div ref={ref} className="w-3/5 max-w-4xl h-9/10 bg-white shadow-2xl relative overflow-y-hidden flex md:flex-row items-center justify-center">
                <div  className="w-full md:w-1/2  h-full flex flex-col pt-5 px-4 items-center justify-between">
                    <h1 className='font-bold sm:text-2xl md:text-3xl text-4xl text-center '>UNLOCK 20% OFF YOUR FIRST ORDER!</h1>
                    <p className='text-center font-semibold text-lg '>
                        Join the <span className="font-bold">#Core</span><span className='text-red-900 font-bold'>X</span><span className="font-bold">shop!</span> crew for exclusive deals, product launches, and pro fitness tips.
                    </p>
                    <form action="" >

                        <input ref={firstInput} type="text" placeholder='First Name' autoFocus className='w-full border-2 border-gray-400 focus:border-black rounded-md py-3 px-5 text-left mb-2' />

                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className={`w-full border-2 rounded-md py-3 px-5 text-left flex-1 mb-2 outline-none transition-colors duration-200 ${emailError ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-black"}`} />
                        {emailError && (<p className="text-red-500 text-sm mb-2">{emailError}</p>)}

                        <PhoneInputCustom />

                        <select value={goal} onChange={(e) => {setPhone(e.target.value);setGoal(e.target.value)}}  className={`w-full border-2 border-gray-400 focus:border-black rounded-md  py-3 px-5 mb-2 ${goal===""?`text-gray-400`:`text-black`} cursor-pointer`}>
                            <option value="" >What's Your Fitness Goal ?</option>
                            <option value="muscle" >Build Muscle</option>
                            <option value="weight" >Lose Weight</option>
                            <option value="endurance" >Improve Endurance</option>
                            <option value="wellness" >General Wellness</option>
                            <option value="recovery" >Recovery</option>
                        </select>

                        <button type="button" className='w-full text-center text-white bg-black rounded-md py-3 px-5 mb-2 hover:opacity-80 cursor-pointer'>YES! I WANT 20% OFF</button>

                        <button type="button" className='w-full text-center border-2 border-gray-400 rounded-md py-3 px-5 mb-2 hover:bg-gray-200 cursor-pointer' onClick={(e)=>{e.stopPropagation();closePopup();}}>No thanks, I'll pay full price</button>
                    </form>

                    <p className='mb-6 text-xs'>By signing up, you'll receive occasional exclusive offers and fitness tips from CoreX. No spam, unsubscribe anytime. See our Privacy Policy & Terms.</p>
                </div>

                <div className="hidden md:block w-1/2 h-full top-0 -right-7 flex-1 ">
                    <img src={PopupDialogBoxImage} alt="" className="w-full h-full object-cover " / >
                </div>
                <IoIosCloseCircleOutline className='absolute top-2 right-2 text-white size-7 cursor-pointer hover:text-gray-300' onClick={()=>closePopup()} />
            </div>
        </div>
        }
    </>
    )
});

export default PopupDialogBox;