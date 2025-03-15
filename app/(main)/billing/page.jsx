"use client";
import React from "react";
import { userAuthContext } from "../../provider";
import { Button } from "../../../components/ui/button";
import { BadgeDollarSign } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const credits = [
  { Credits: 10, cost: 1 },
  { Credits: 50, cost: 5 },
  { Credits: 100, cost: 9 },
  { Credits: 200, cost: 15 },
  { Credits: 300, cost: 25 },
];

function Page() {
  const { user, setUser } = userAuthContext();
  const updateUserCredits = useMutation(api.users.updateUserCredits);

  const onPaymentSuccess = async (creditAmount) => {
    const newCredits = Number(user?.credits) + Number(creditAmount);
    await updateUserCredits({ uid: user._id, credits: newCredits });

    setUser((prev) => ({
      ...prev,
      credits: newCredits,
    }));

    toast("Credits Added Successfully");
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900 border-purple-500 border shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Credits</h2>
      <div className="max-w-3xl mx-auto">
        {/* Credits Left Card */}
        <div className="border shadow-md border-purple-500 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Total Credits Left</h2>
            <p className="text-gray-400">1 Credit = 1 Video</p>
          </div>
          <h2 className="text-2xl font-bold mt-2 md:mt-0">{user?.credits} Credits</h2>
        </div>

        {/* Info Text */}
        <p className="text-sm text-gray-400 mt-3">
          When your credits reach **$0**, video generation will stop working. Add more credits to continue.
        </p>

        {/* Buy More Credits Section */}
        <h2 className="text-2xl font-bold mt-5">Buy More Credits</h2>
        <div className="space-y-3">
          {credits.map((credit, index) => (
            <div key={index} className="border border-purple-500 rounded-lg p-4 flex justify-between items-center shadow-md">
              {/* Credits Info */}
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="text-purple-500 shadow-md"/>
                <h2 className="text-lg">{credit.Credits} Credits</h2>
              </div>

              {/* Price & PayPal Button */}
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-lg">${credit.cost}</h2>
                <div className="w-full max-w-[180px]">
                  <PayPalButtons
                    style={{ layout: "horizontal", shape: "rect", size: "small" }}
                    className="rounded-lg w-full"
                    onApprove={() => onPaymentSuccess(credit.Credits)}
                    onCancel={() => console.log("Payment Cancelled")}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          { amount: { value: credit.cost, currency_code: "USD" } },
                        ],
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
