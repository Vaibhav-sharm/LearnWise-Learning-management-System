"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Script from 'next/script';
import React, { useState } from 'react';
import { toast } from 'sonner';

function Membership() {

    const [subscriptionId, setSubscriptionId] = useState(null);
    const {user} = useUser();

    /** 
     * To create Subscription Id
    * @param {*} planId
    */
    const createSubscription = async(planId)=>{
        axios.post("/api/create-subscription",JSON.stringify({
            plan_id:planId
        })).then(resp=>{
            console.log(resp.data);
            setSubscriptionId(resp.data.id)
            makePayment();
        })
    }

    const makePayment = ()=>{
        const options={
            key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
            subscription_id: subscriptionId,
            name: "Learnwise",
            description: "Learnwise Membership",
            handler:async(resp)=>{
                console.log(resp);
                if(resp){
                    addNewMember(resp?.razorpay_payment_id)
                }
            },
            theme:{
                color:'#7D41E1'
            }
        }
        const rzp= new window.Razorpay(options);
        rzp.open();
    }

    const addNewMember=(paymentId)=>{
        GlobalApi.addNewMember(user.primaryEmailAddress.emailAddress, paymentId).then(resp=>{
            console.log(resp);
            if(resp){
                toast('Payment Successfull!!')
            }
        },(error)=>{
            toast('Some Error Happened')
        })
    }
    return (
        
        <div className='container px-5 py-24 mx-auto flex flex-wrap gap-5 justify-center'>   
        <>
        <Script id='razorpay-checkout-js' src='https://checkout.razorpay.com/v1/checkout.js'></Script>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md hover:shadow-purple-400 cursor-pointer">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Monthly</h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-3xl font-semibold">₹</span>
                    <span className="text-5xl font-extrabold tracking-tight">599</span>
                    <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                    <li className="flex items-center">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Access to All Courses</span>
                    </li>
                    <li className="flex">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Free Source Code</span>
                    </li>
                    <li className="flex">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Free App Membership</span>
                    </li>
                    <li className="flex">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">24×7 phone & email support</span>
                    </li>
                </ul>
                <button type="button" className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                    onClick={()=>createSubscription('plan_O7ai7GEBBoH0Nl')}
                >Choose plan</button>
            </div>

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md hover:shadow-purple-400 cursor-pointer">
                {/* Your Yearly Card Content */}
                <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Yearly Plan</h5>
                <div class="flex items-baseline text-gray-900 dark:text-white">
                    <span class="text-3xl font-semibold">₹</span>
                    <span class="text-5xl font-extrabold tracking-tight">3999</span>
                    <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/year</span>
                </div>
                <ul role="list" class="space-y-5 my-7">
                <li className="flex items-center">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Access to All Courses</span>
                    </li>
                    <li className="flex">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Free Source Code</span>
                    </li>
                    <li className="flex">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Free App Membership</span>
                    </li>
                    <li className="flex">
                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">24×7 phone & email support</span>
                    </li>
                </ul>
                <button type="button" class="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" 
                onClick={()=>createSubscription('plan_O7bfRj6kgRv5Rz')}
                >Choose plan</button>
            </div>
        </>
        </div>
    );
}

export default Membership;