'use client'
import { UploadCloud} from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

 const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
 ];


const ApplicationForm = ({data}:{data:any}) => {


  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token,setToken] = useState<string | null>(localStorage.getItem("token"));
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    location: "",
    college: "",
    degree: "",
    fieldOfStudy: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    currentlyStudying: false,
    resume: null as File | null,
  }); 
    

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
        const { name, value, type, checked, files } = e.target as HTMLInputElement;

        if (type === "checkbox") {
        setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === "file" && files) {
        setFormData((prev) => ({ ...prev, resume: files[0] }));
        setFileName(files[0].name);
        // setFileName("");
        } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        }
     };

   const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // Create FormData object for file + text data
        const submission = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) submission.append(key, value as any);
        });

        console.log("Submitting Application:", Object.fromEntries(submission));
        setLoading(true);
        setError(null);
        setSuccess(null);

       try {
        const res = await fetch(`http://localhost:5000/api/v1/internship/apply/${data?._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: submission,
        });

        if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit application");
        }

        const result = await res.json();
        setSuccess("Applied successfully!");
        console.log("Server response:", result);

        // Reset form
        setFormData({
        fullName: "",
        mobile: "",
        email: "",
        location: "",
        college: "",
        degree: "",
        fieldOfStudy: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        currentlyStudying: false,
        resume: null,
        });
        setFileName("");

       } catch (err) {
         setError(err?.message  || "Something went wrong");
      }finally{
         setLoading(false) 
      }
    
   };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    if (error) {
      toast.error(error)
      const timer = setTimeout(() => {
        setError(null); // clear error after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); 
    }
    if(success){
        toast.success(success)
        router.push("/internship")
    }
  }, [error,success]);



  return (
    <div className='pb-24'>
       <form action="" onSubmit={handleSubmit}>
            
            <div>
                 <h1 className='text-[#0A0A0A] text-xl font-bold mb-4'>Apply to {data?.name}</h1>
                 <div className='flex flex-col space-y-8 items-start justify-center w-full lg:w-1/2'>
                       
                       <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Full Name<span className="text-red-500">*</span> </label>
                           <input type="text" name='fullName' value={formData.fullName} onChange={handleChange} placeholder='Enter Your Full Name' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                       <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Mobile Number<span className="text-red-500">*</span> </label>
                           <input type="number" name='mobile' value={formData.mobile} onChange={handleChange} placeholder='+91 9876543210' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                       <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Email Address<span className="text-red-500">*</span> </label>
                           <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='abc@gmail.com' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                       <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Location<span className="text-red-500">*</span> </label>
                           <input type="text" name='location' value={formData.location} onChange={handleChange} placeholder='Enter Your Location' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                       <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Resume<span className="text-red-500">*</span> </label>
                           <a rel="stylesheet" href="" download />
                           <p className='text-sm mb-2'>Upload updated resume</p>

                           {/* File Preview (if a file is selected) */}
                            {fileName && (
                                <div className="flex justify-between items-center h-12 rounded-lg shadow-sm bg-transparent border border-teal-700 text-sm relative overflow-hidden">
                                    {/* Left side: Green box + File name */}
                                    <div className="flex items-center gap-3 pl-3">
                                        <span className="absolute -left-3 top-0 h-full w-16 flex items-center justify-center rounded-l-lg bg-[#005451] shadow-md text-white font-semibold">PDF</span>
                                        <span className="ml-12  text-gray-800 font-medium">{fileName}</span>
                                    </div>

                                    {/* Right side: Small status dot */}
                                    <span className="w-5 h-5 rounded-full bg-[#005451] mr-3 flex items-center justify-center"> <span className='w-2 h-2 bg-white rounded-full'></span> </span>
                                </div>
                            )}

                           <div className='pt-2'>
                                {/* Hidden File Input */}
                              
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={handleChange}
                                />

                                {/* Styled Button */}
                                <label
                                    htmlFor="fileUpload"
                                    className="inline-flex items-center gap-2 px-4 py-3 text-black bg-[#F97C04] text-base font-[450] rounded-lg cursor-pointer hover:bg-[#e97203] transition-colors"
                                >
                                    Upload  <UploadCloud className="w-5 h-5" />
                                </label>
                            </div> 
                       </div>

                       <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>College <span className="text-red-500">*</span> </label>
                           <input type="text" name='college' value={formData.college} onChange={handleChange} placeholder='Enter Your Location' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                        <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Degree <span className="text-red-500">*</span> </label>
                           <input type="text" name='degree' value={formData.degree} onChange={handleChange} placeholder='Enter Your Location' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                        <div className='flex flex-col space-y-2 w-full'>
                           <label htmlFor="" className='text-[#0A0A0A] text-base font-[450]'>Major /Field of study<span className="text-red-500">*</span></label>
                           <input type="text" name='fieldOfStudy' value={formData.fieldOfStudy} onChange={handleChange} placeholder='Enter Your Location' className='border w-full border-orange-300 p-4 bg-transparent rounded-lg outline-none' />
                       </div>
                          <div className="flex flex-col space-y-4 w-full">
                            <label className="text-[#0A0A0A] text-base font-[450]">
                                Dates Attended <span className="text-red-500">*</span>
                            </label>

                        {/* Start Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <label className="block text-sm font-[300] text-[#0A0A0A] py-2">Start Month</label>
                                <select
                                    value={formData.startMonth}
                                    onChange={handleChange}
                                    name='startMonth'
                                    className="w-full border border-orange-300 rounded-lg p-3 bg-transparent text-gray-700 outline-none focus:border-orange-400"
                                >
                                    <option value="">Select Month</option>
                                    {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                            <label className="block text-sm font-[300] text-[#0A0A0A] py-2">Start Year</label>
                            <input
                                type="number"
                                name='startYear'
                                value={formData.startYear}
                                onChange={handleChange}
                                placeholder="e.g. 2020"
                                className="border w-full border-orange-300 p-3 bg-transparent rounded-lg outline-none
                                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <label className="block text-sm font-[300] text-[#0A0A0A] py-2">End Month</label>
                              <select
                                    value={formData.endMonth}
                                    name="endMonth"
                                    disabled={formData.currentlyStudying}
                                    onChange={handleChange}
                                    className={`w-full border ${formData.currentlyStudying ? "border-gray-300":"border-orange-300"}  rounded-lg p-3 bg-transparent text-gray-700 outline-none focus:border-orange-400`}
                                >
                                    <option value="">Select Month</option>
                                    {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                            <label className="block text-sm font-[300] text-[#0A0A0A] py-2">End Year</label>
                            <input
                                type="number"
                                name="endYear"
                                value={formData.endYear}
                                onChange={handleChange}
                                placeholder="e.g. 2024"
                                className={`border w-full ${formData.currentlyStudying ? "border-gray-300":"border-orange-300"} p-3 bg-transparent rounded-lg outline-none
                                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                disabled={formData.currentlyStudying}
                            />
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="currentlyStudying"
                                name="currentlyStudying"
                                checked={formData.currentlyStudying}
                                onChange={handleChange}
                                className="
                                    w-4 h-4 
                                    appearance-none
                                    border border-orange-500 rounded 
                                    cursor-pointer
                                    checked:bg-orange-600 checked:border-orange-600
                                    relative
                                    checked:before:content-['✓']
                                    checked:before:absolute
                                    checked:before:text-white
                                    checked:before:font-bold
                                    checked:before:left-[2px]
                                    checked:before:top-[-1px]
                                    text-xs
                                "
                            />
                            <label htmlFor="currently" className="text-sm font-[300] text-[#0A0A0A]">
                            I am currently studying here
                            </label>
                        </div>
                    </div>
                    <div className='flex w-full items-center justify-end space-x-6 '>
                      <button className='text-black font-medium text-base'>Cancel</button>
                      <button type="submit" disabled={loading} className="text-teal-900 font-bold text-base border border-teal-800 px-6 py-2 rounded-md  hover:bg-teal-900 hover:text-white transition-colors duration-300 ease-in-out">Apply</button>

                   </div>
                 </div>

            </div>          

       </form>
    </div>
  )
}

export default ApplicationForm
