import React from 'react';


const Button = ({children, onClickFunction, className, type  }) => {
    return (
        <button className={className} type ={type} onClick={onClickFunction}>
          {children}
        </button>
    );
};

export default Button;