import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export default function PhoneInputCustom() {

    const countries = [
    { name: "United States", code: "+1", flag: "US" },
    { name: "India", code: "+91", flag: "IN" },
    { name: "United Kingdom", code: "+44", flag: "GB" },
    { name: "Canada", code: "+1", flag: "CA" },
];

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [open, setOpen] = useState(false);

    const debouncedPhone = useDebounce(phone, 300);

    useEffect(() => {
        if (!debouncedPhone) {
            setPhoneError("");
            return;
        }
        const digits = debouncedPhone.replace(/\D/g, "");
        if (digits.length !== 10)
            setPhoneError("Phone number must be 10 digits.");
        
        else
            setPhoneError("");
        }, [debouncedPhone]);

    const toggleDropdown = () => setOpen((prev) => !prev);
    const selectCountry = (country) => {
        setSelectedCountry(country);
        setOpen(false);
    };

    return (
        <div className="w-full  ">
            <div className={`flex border-2 ${phoneError? `border-red-500`: `border-gray-400 focus:border-black`}  rounded-md mb-2 overflow-hidden`}>
                <div className="flex items-center px-3 cursor-pointer bg-gray-100 hover:bg-gray-200 select-none" onClick={toggleDropdown}>
                    <span className="mr-2">{selectedCountry.flag}</span>
                    <span>{selectedCountry.code}</span>
                </div>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (Optional)" className={`flex-1  py-3 px-5 outline-none`}
                />
            </div>
            {open && (
                <div className="absolute left-0 top-full mt-1 w-full max-h-48 overflow-y-auto border rounded-md bg-white shadow-lg z-50">
                {countries.map((country) => (
                    <div key={country.code} className="flex items-center px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => selectCountry(country)}>
                        <span className="mr-2">{country.flag}</span>
                        <span>{country.name} ({country.code})</span>
                    </div>
                ))}
                </div>
            )}
            {phoneError && (<p className="text-red-500 text-sm mb-2">{phoneError}</p>)}
        </div>
        
    );
}