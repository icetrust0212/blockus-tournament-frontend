import React from 'react';
 type Props = {
  message: string;
};
 const ErrorAlert = ({ message }: Props) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong>Error:</strong> {message}
    </div>
  );
};
 export default ErrorAlert;