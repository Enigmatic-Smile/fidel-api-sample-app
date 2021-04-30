import React from "react";

const TransactionStatus = ({ status }) => (
  <div>
    {(status === "transaction.auth") && (
      <span className="relative inline-block px-3 py-1 font-semibold text-yellow-500">
        <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
        <span className="relative text-xs">Auth</span>
      </span>
    )}
    {(status === "transaction.clearing") && (
      <span className="relative inline-block px-3 py-1 font-semibold text-green-500">
        <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
        <span className="relative text-xs">Cleared</span>
      </span>
    )}
    {(status === "transaction.refund") && (
      <span className="relative inline-block px-3 py-1 font-semibold text-red-500">
        <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
        <span className="relative text-xs">Refund</span>
      </span>
    )}
  </div>
);

export default TransactionStatus;
